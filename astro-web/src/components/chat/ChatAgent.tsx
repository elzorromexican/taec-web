import { useStore } from "@nanostores/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { navigate } from "astro:transitions/client";
import { chatCategoryRules } from "../../data/chatContextRules";
import { safeRenderMarkdown } from "../../lib/tito/sanitizer";
import { gibberishGuard, trackTitoEvent } from "../../lib/tito/titoAnalytics";
import {
	chatModeStore,
	ctaExpandRegistryStore,
	finalizeExpansionState,
	hasStartedStore,
	hasUnreadMessagesStore,
	initializeRollout,
	isExpandedStore,
	isOpenStore,
	lastGreetedCategoryStore,
	messagesStore,
	sessionIdStore,
	transcriptSentStore,
	userDataStore,
	v3_2RolloutStore,
} from "../../stores/chatStore";
import ChatWindow from "./ChatWindow";

export default function ChatAgent({
	isApp = false,
	userName = "",
}: {
	isApp?: boolean;
	userName?: string;
}) {
	const [isHydrated, setIsHydrated] = useState(false);
	useEffect(() => {
		setIsHydrated(true);
		initializeRollout();
		// Anti zombie spinner post-refresh
		const msgs = messagesStore.get();
		if (msgs.some((m: any) => m.isStreaming)) {
			messagesStore.set(
				msgs.map((m: any) =>
					m.isStreaming
						? {
								...m,
								isStreaming: false,
								text: m.text || "Conexión interrumpida por recarga de página.",
							}
						: m,
				),
			);
		}
	}, []);

	const isOpen = useStore(isOpenStore);
	const isExpanded = useStore(isExpandedStore);
	const hasStarted = useStore(hasStartedStore);
	const userData = useStore(userDataStore);
	const messages = useStore(messagesStore);
	const lastCategory = useStore(lastGreetedCategoryStore);
	const hasUnread = useStore(hasUnreadMessagesStore);
	const chatMode = useStore(chatModeStore);
	const isV3_2 = useStore(v3_2RolloutStore);

	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSendingEmail, setIsSendingEmail] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [activePromo, setActivePromo] = useState<any>(null);

	const endRef = useRef<HTMLDivElement | null>(null);
	const inputChatRef = useRef<HTMLTextAreaElement | null>(null);
	const inputNameRef = useRef<HTMLInputElement | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const prevIsOpen = useRef(isOpen);

	// Cargar Geopromos silenciosamente al inicio
	useEffect(() => {
		fetch(`/api/get-promo?path=${encodeURIComponent(window.location.pathname)}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.promo) setActivePromo(data.promo);
			})
			.catch(() => {});
	}, []);

	// Auto-scroll garantizado hacia el último mensaje usando la API nativa
	useEffect(() => {
		if (isOpen && endRef.current) {
			// Timeout corto para permitir que el motor de React/Markdown termine de pintar el DOM y calcular la altura de los textos
			setTimeout(() => {
				try {
					endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
				} catch (e) {
					/* fallback ignorado */
				}
			}, 150);
		}
		prevIsOpen.current = isOpen;
	}, [messages, isLoading, isOpen]);

	// Geolocalización y dependencias a terceros (GeoJS) ELIMINADAS.
	// Ahora la Geo se maneja privada y silenciosamente en el Serverless Edge de Netlify vía `x-nf-country`.

	// Aseguramos que el correo se envíe SIEMPRE cuando se cierre la pestaña
	const stateRef = useRef({ messages, userData, isSendingEmail });
	useEffect(() => {
		stateRef.current = { messages, userData, isSendingEmail };
	}, [messages, userData, isSendingEmail]);

	// Si estamos en la Intranet (isApp), hacemos bypass del onboarding
	useEffect(() => {
		if (isApp && userName && !hasStarted && messages.length === 0) {
			userDataStore.set({ ...userDataStore.get(), name: userName });
			hasStartedStore.set(true);
			messagesStore.set([
				{
					role: "agent",
					text: `Hola ${userName}, ¿en qué te puedo ayudar?`,
					promo: activePromo,
				},
			]);
		}
	}, [isApp, userName, activePromo]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			// Enviar siempre que haya más de un mensaje (el saludo inicial de la IA + la primera interacción del usuario)
			if (
				!isSendingEmail &&
				!transcriptSentStore.get() &&
				messages.length > 1
			) {
				transcriptSentStore.set(true);
				const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
				const localTime = new Date().toLocaleString("es-MX", { timeZone });
				fetch("/api/send-transcript", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userData,
						messages,
						metadata: {
							time: localTime,
							timeZone,
							url: window.location.href,
						},
					}),
					keepalive: true,
				}).catch(() => {});
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			if (abortControllerRef.current) abortControllerRef.current.abort();
		};
	}, []);

	// Timer de Inactividad de 15 minutos (900,000 ms) para asegurar el envío de leads abandonados
	const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(() => {
		if (
			messages.length > 1 &&
			hasStarted &&
			!transcriptSentStore.get() &&
			!isSendingEmail
		) {
			if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

			inactivityTimerRef.current = setTimeout(
				() => {
					if (!transcriptSentStore.get()) {
						console.log(
							"[TitoBits] 15 minutos de inactividad detectados. Disparando email de respaldo automágicamente...",
						);
						transcriptSentStore.set(true);
						// Necesitamos usar la ref del estado actual para no atrapar hooks desactualizados en el closure del timeout
						const currentState = stateRef.current;
						const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
						const localTime = new Date().toLocaleString("es-MX", { timeZone });
						fetch("/api/send-transcript", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								userData: currentState.userData,
								messages: currentState.messages,
								metadata: {
									time: localTime,
									timeZone,
									url: window.location.href,
									reason: "15m_timeout_inactivity",
								},
							}),
							keepalive: true,
						}).catch(() => {});
					}
				},
				15 * 60 * 1000,
			); // 15 minutos
		}

		return () => {
			if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
		};
	}, [messages, hasStarted, isSendingEmail]);

	// Auto-focus en el formulario al abrir
	useEffect(() => {
		if (isOpen && !hasStarted && window.innerWidth > 768) {
			setTimeout(() => inputNameRef.current?.focus(), 150);
		}
	}, [isOpen, hasStarted]);

	// Auto-focus en el chat cuando ya inició
	useEffect(() => {
		if (isOpen && hasStarted && window.innerWidth > 768) {
			setTimeout(() => inputChatRef.current?.focus(), 150);
		}
	}, [isOpen, hasStarted]);

	// Manejo de Inyección desde el Diagnóstico de Aprendizaje
	useEffect(() => {
		const handleDiagnosticContext = (e: any) => {
			const { email, diagnosticResult, prompt } = e.detail;

			// Configuramos la identidad
			const aliasName = email.split("@")[0];
			userDataStore.set({ ...userDataStore.get(), email, name: aliasName });

			// Forzamos la apertura e inicio del chat
			hasStartedStore.set(true);
			isOpenStore.set(true);
			hasUnreadMessagesStore.set(false);

			// Inyectamos el contexto vía sendMessage para que el LLM genere el saludo con rol Challenger.
			// Así evitamos hardcodear el saludo y romper la metodología.
			const userMessage = `[SYSTEM_HIDDEN_CONTEXT]\n${prompt}\n[/SYSTEM_HIDDEN_CONTEXT]\n\n¡Hola Tito! Acabo de terminar mi diagnóstico. Por favor analiza mis resultados y dime qué opinas.`;

			// Delay minúsculo para permitir que React cambie hasStarted a true antes del send
			setTimeout(() => {
				sendMessage(undefined, userMessage);
			}, 50);
		};

		window.addEventListener("OpenTitoDiagnostic", handleDiagnosticContext);
		return () =>
			window.removeEventListener("OpenTitoDiagnostic", handleDiagnosticContext);
	}, []);

	const toggleChat = () => {
		const isCurrentlyOpen = isOpenStore.get();
		if (
			isCurrentlyOpen &&
			hasStarted &&
			!isSendingEmail &&
			messages.length > 1 &&
			!transcriptSentStore.get()
		) {
			transcriptSentStore.set(true);
			sendSilentEmail();
		}
		isOpenStore.set(!isCurrentlyOpen);

		// Si la acción fue abrir el chat, limpiamos los unread
		if (!isCurrentlyOpen && hasUnreadMessagesStore.get()) {
			hasUnreadMessagesStore.set(false);
		}
	};

	const startChat = (e: React.FormEvent) => {
		e.preventDefault();
		if (!userData.name) return;

		if (!sessionIdStore.get()) {
			sessionIdStore.set(
				"sess-" +
					Math.random().toString(36).substring(2, 10) +
					Date.now().toString(36),
			);
		}

		hasStartedStore.set(true);

		if (messages.length > 0) return;

		const path = window.location.pathname.toLowerCase();
		let currentCategory = "general";

		// Motor de mapeo de RUTAS vs REGLAS (del archivo TS global)
		for (const [key, rule] of Object.entries(chatCategoryRules)) {
			if (key !== "general" && rule.paths.some((p) => path.includes(p))) {
				currentCategory = key;
				break;
			}
		}

		const typeSafeKey = currentCategory as keyof typeof chatCategoryRules;
		const initialGreeting = chatCategoryRules[
			typeSafeKey
		].initialGreeting.replace("{name}", userData.name);

		lastGreetedCategoryStore.set(currentCategory);
		messagesStore.set([
			{ role: "agent", text: initialGreeting, promo: activePromo },
		]);
	};

	// Context Hopping: Inyección proactiva de mensajes al SPA Navigation
	useEffect(() => {
		const handleContextHop = () => {
			if (!hasStartedStore.get()) return;
			const currentMessages = messagesStore.get();
			if (currentMessages.length === 0) return;

			const path = window.location.pathname.toLowerCase();
			let currentCategory = "general";

			for (const [key, rule] of Object.entries(chatCategoryRules)) {
				if (key !== "general" && rule.paths.some((p) => path.includes(p))) {
					currentCategory = key;
					break;
				}
			}

			const typeSafeKey = currentCategory as keyof typeof chatCategoryRules;
			const newGreeting = chatCategoryRules[typeSafeKey].contextHop;

			if (
				currentCategory !== "general" &&
				currentCategory !== lastGreetedCategoryStore.get()
			) {
				const lastMsg = currentMessages[currentMessages.length - 1];

				let promoToInject = null;
				if (activePromo) {
					const promosShown = messagesStore.get().filter((m) => m.promo).length;
					const isProductMatch =
						activePromo.urlTrigger && path.includes(activePromo.urlTrigger);
					if (isProductMatch || promosShown < 2) {
						promoToInject = activePromo;
					}
				}

				if (
					lastMsg &&
					lastMsg.role === "agent" &&
					lastMsg.text.includes("📌 *Contexto Actualizado*")
				) {
					const withoutLast = currentMessages.slice(0, -1);
					// Si el mensaje anterior ya tenía una promo incrustada, la heredamos para que no desaparezca visualmente "debajo"
					messagesStore.set([
						...withoutLast,
						{
							role: "agent",
							text: newGreeting,
							promo: promoToInject || lastMsg.promo,
						},
					]);
				} else {
					messagesStore.set([
						...currentMessages,
						{ role: "agent", text: newGreeting, promo: promoToInject },
					]);
				}

				lastGreetedCategoryStore.set(currentCategory);

				if (!isOpenStore.get()) {
					hasUnreadMessagesStore.set(true);
				}
			} else if (
				currentCategory === "general" &&
				lastGreetedCategoryStore.get() !== "general"
			) {
				lastGreetedCategoryStore.set("general");
			}
		};

		// Ejecutar al montar y delegar a Astro Events para SPA View Transitions
		handleContextHop();

		// Si cambia de ruta y estábamos streameando, cancelar
		const abortStream = () => {
			if (abortControllerRef.current) abortControllerRef.current.abort();
		};

		document.addEventListener("astro:page-load", handleContextHop);
		document.addEventListener("astro:page-load", abortStream);
		return () => {
			document.removeEventListener("astro:page-load", handleContextHop);
			document.removeEventListener("astro:page-load", abortStream);
		};
	}, []); // El event listener hace que funcione dinámicamente sin amarrar dependencias pesadas.

	const updateMessage = (
		id: string,
		text: string,
		isStreaming: boolean,
		newRole?: "agent" | "error" | "user",
		extraMeta?: any,
	) => {
		const msgs = messagesStore.get();
		const idx = msgs.findIndex((m: any) => m.id === id);
		if (idx !== -1) {
			const updated = [...msgs];
			// @ts-expect-error
			updated[idx] = { ...updated[idx], text, isStreaming, ...extraMeta };
			if (newRole) {
				updated[idx].role = newRole as any;
			}
			messagesStore.set(updated);
		}
	};

	const sendExpandMessage = async (
		msgId: string,
		targetId: string,
		lastAgentText: string,
	) => {
		if (isLoading) return;
		trackTitoEvent("tito_expand_clicked", { sourceMessageId: msgId, targetId });

		const triggerMessage = `[TITO_EXPAND]\n\nÚltima respuesta de Tito:\n${lastAgentText.substring(0, 500)}`;
		messagesStore.set([
			...messagesStore.get(),
			{ role: "user", text: "+ info" },
		]);

		const currentMessages = messagesStore.get();
		const safeLLMHistory = currentMessages
			.filter(
				(m: any) =>
					!m.text.includes("[SYSTEM_HIDDEN_CONTEXT]") &&
					!m.text.includes("[TITO_EXPAND]"),
			)
			.slice(-10)
			.map((m: any) => ({ role: m.role, text: m.text }));

		setIsLoading(true);
		abortControllerRef.current = new AbortController();

		let fullText = "";
		try {
			const res = await fetch("/api/agente-ia", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				signal: abortControllerRef.current.signal,
				body: JSON.stringify({
					intent: "node_expansion",
					sourceMessageId: msgId,
					targetId: targetId,
					history: safeLLMHistory,
					userMessage: triggerMessage,
					email: userData.email,
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					currentPath: window.location.pathname,
					session_id: sessionIdStore.get(),
					pageContext: {
						title: document.title?.substring(0, 150) ?? "",
						description:
							document
								.querySelector('meta[name="description"]')
								?.getAttribute("content")
								?.substring(0, 200) ?? "",
						h1:
							document
								.querySelector("h1")
								?.textContent?.trim()
								.substring(0, 150) ?? "",
					},
				}),
			});

			if (!res.ok || !res.body) throw new Error("Error en expand");

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			messagesStore.set([
				...messagesStore.get(),
				{ role: "agent", text: "", isStreaming: true },
			]);

			let chunkData = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					trackTitoEvent("tito_expand_completed", {
						sourceMessageId: msgId,
						targetId,
					});
					break;
				}
				chunkData += decoder.decode(value, { stream: true });
				const parts = chunkData.split(/\r?\n\r?\n/);
				chunkData = parts.pop() || "";

				for (const part of parts) {
					if (part.trim().startsWith("event:")) {
						const lines = part.split("\n");
						const eventLine = lines.find((l) => l.startsWith("event:"));
						const dataLine = lines.find((l) => l.startsWith("data:"));

						if (eventLine && dataLine) {
							const eventName = eventLine.replace("event:", "").trim();
							const jsonData = dataLine.replace("data:", "").trim();
							try {
								const parsed = JSON.parse(jsonData);
								if (eventName === "ui_metadata") {
									if (parsed.compositeKey) {
										finalizeExpansionState(
											parsed.compositeKey,
											parsed.hasChildren,
										);
									}
								} else if (eventName === "token") {
									if (parsed.text) {
										fullText += parsed.text;
										const msgs = messagesStore.get();
										const updated = [...msgs];
										updated[updated.length - 1] = {
											role: "agent",
											text: safeRenderMarkdown(fullText),
											isStreaming: true,
										};
										messagesStore.set(updated);
									}
								}
							} catch {}
						}
					}
				}
			}

			// Cleanup streaming flag
			const finalMsgs = messagesStore.get();
			finalMsgs[finalMsgs.length - 1].isStreaming = false;
			messagesStore.set([...finalMsgs]);
		} catch (err: any) {
			if (err.name !== "AbortError") {
				messagesStore.set([
					...messagesStore.get(),
					{ role: "error", text: "No pude expandir la respuesta." },
				]);
			} else {
				// Cancelación silenciosa
				const msgs = messagesStore.get();
				if (fullText) {
					const updated = [...msgs];
					updated[updated.length - 1] = {
						role: "agent",
						text: safeRenderMarkdown(fullText),
						isStreaming: false,
					};
					messagesStore.set(updated);
				} else {
					messagesStore.set(msgs.filter((m: any) => m.text !== ""));
				}
				trackTitoEvent("tito_expand_aborted", {
					sourceMessageId: msgId,
					targetId,
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	const sendMessage = async (e?: React.FormEvent, overrideText?: string) => {
		if (e) e.preventDefault();
		const userMsg = overrideText || input.trim();
		if (!userMsg || isLoading) return;

		if (!overrideText) setInput("");

		if (userMsg.toUpperCase().includes("MODO DIAGNOSTICO")) {
			navigate("/diagnostico");
			return;
		}

		const gibberishCheck = gibberishGuard(userMsg);
		if (gibberishCheck.isGibberish) {
			trackTitoEvent("tito_gibberish_rejected", {
				reason: gibberishCheck.reason,
			});
			messagesStore.set([
				...messagesStore.get(),
				{ role: "user", text: userMsg },
				{
					role: "error",
					text: "Por favor, utiliza palabras completas para poder entenderte mejor.",
				},
			]);
			return;
		}

		setIsLoading(true);

		const msgId = "msg-" + Math.random().toString(36).substring(2, 10);

		// Congelamos Snapshot para evitar Race Conditions y enviar el array limpio al backend (P0)
		const snapshot = [
			...messagesStore.get(),
			{ role: "user" as const, text: userMsg },
		];

		// Insertamos Placeholder para el streaming visual
		messagesStore.set([
			...snapshot,
			{ role: "agent" as any, text: "", isStreaming: true, id: msgId },
		]);

		// AI Pollution Prevention: Excluimos mensajes insertados por el sistema (UI_Context)
		const ruleTexts = Object.values(chatCategoryRules).map((r) => r.contextHop);
		const safeLLMHistory = snapshot.filter(
			(m: any) =>
				m.role !== "error" &&
				!ruleTexts.includes(m.text) &&
				!m.text.includes("[SYSTEM_HIDDEN_CONTEXT]") &&
				!m.text.includes("📍 *Explorando la sección de"),
		);

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		abortControllerRef.current = new AbortController();

		let accumulatedText = "";

		try {
			const res = await fetch("/api/agente-ia", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				signal: abortControllerRef.current.signal,
				body: JSON.stringify({
					userMessage: userMsg,
					history: safeLLMHistory,
					email: userData.email,
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					currentPath: window.location.pathname,
					session_id: sessionIdStore.get(),
					pageContext: {
						title: document.title?.substring(0, 150) ?? "",
						description:
							document
								.querySelector('meta[name="description"]')
								?.getAttribute("content")
								?.substring(0, 200) ?? "",
						h1:
							document
								.querySelector("h1")
								?.textContent?.trim()
								.substring(0, 150) ?? "",
					},
				}),
			});

			setIsLoading(false); // Apagamos el indicador general, ya tenemos conexión

			const isJsonResponse = res.headers
				.get("content-type")
				?.includes("application/json");

			if (!res.ok) {
				let errorTxt =
					"¡Ups! Múltiples circuitos saturados. Intenta de nuevo por favor.";
				if (isJsonResponse) {
					try {
						const errData = await res.json();
						if (errData.error) errorTxt = errData.error;
						if (errData.error === "invalid_target") {
							trackTitoEvent("tito_invalid_target_rejected", { msgId });
						}
					} catch (e) {}
				}
				updateMessage(msgId, errorTxt, false, "error");
				return;
			}

			if (isJsonResponse) {
				const jsonData = await res.json();
				updateMessage(
					msgId,
					safeRenderMarkdown(jsonData.reply) || "Handoff procesado.",
					false,
					"agent",
				);
				if (jsonData.handoff_tipo && !jsonData.awaiting_contact) {
					chatModeStore.set("handoff_closed");
					trackTitoEvent("tito_handoff_started", {
						tipo: jsonData.handoff_tipo,
					});
				} else if (jsonData.handoff_tipo && jsonData.awaiting_contact) {
					chatModeStore.set("handoff_pending");
				}
				return;
			}

			// Streaming Reader
			const reader = res.body?.getReader();
			if (!reader) throw new Error("No reader available");
			const decoder = new TextDecoder("utf-8");

			let chunkData = "";

			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					updateMessage(msgId, accumulatedText, false);
					break;
				}

				chunkData += decoder.decode(value, { stream: true });
				const parts = chunkData.split(/\r?\n\r?\n/);
				chunkData = parts.pop() || "";

				for (const part of parts) {
					if (part.trim().startsWith("event:")) {
						const lines = part.split("\n");
						const eventLine = lines.find((l) => l.startsWith("event:"));
						const dataLine = lines.find((l) => l.startsWith("data:"));

						if (eventLine && dataLine) {
							const eventName = eventLine.replace("event:", "").trim();
							const jsonData = dataLine.replace("data:", "").trim();
							try {
								const parsed = JSON.parse(jsonData);
								if (eventName === "context_ready") {
									// No actualizamos texto por context_ready, es background.
								} else if (eventName === "ui_metadata") {
									const safeCompositeKey =
										parsed.compositeKey || `${msgId}_${parsed.targetId}`;
									const reg = ctaExpandRegistryStore.get();
									ctaExpandRegistryStore.set({
										...reg,
										[safeCompositeKey]: {
											sourceMessageId: msgId,
											targetId: parsed.targetId,
											expandDepth: 0,
											hasChildren: parsed.hasChildren || false,
											hasExpandedOnce: false,
										},
									});

									updateMessage(
										msgId,
										safeRenderMarkdown(accumulatedText),
										true,
										"agent",
										{
											targetId: parsed.targetId,
											compositeKey: safeCompositeKey,
											hasChildren: parsed.hasChildren,
										},
									);
								} else if (eventName === "token") {
									if (parsed.text) {
										accumulatedText += parsed.text;
										updateMessage(
											msgId,
											safeRenderMarkdown(accumulatedText),
											true,
											"agent",
										);
									}
								} else if (eventName === "error") {
									console.error(
										"[SSE Error] Parsed text:",
										parsed.text,
										"Raw jsonData:",
										jsonData,
									);
									updateMessage(
										msgId,
										safeRenderMarkdown(parsed.text) ||
											"No pude completarlo, un humano seguirá el caso.",
										false,
										"error",
									);
									return;
								} else if (eventName === "done") {
									updateMessage(
										msgId,
										safeRenderMarkdown(accumulatedText),
										false,
										"agent",
									);
									return;
								}
							} catch (e) {}
						}
					}
				}
			}
		} catch (error: any) {
			setIsLoading(false);
			if (error.name === "AbortError") {
				// Cancelación silenciosa (Escenario 2)
				if (accumulatedText) {
					updateMessage(msgId, accumulatedText, false, "agent");
				} else {
					// Remueve el placeholder si ni siquiera empezó a escribir
					const msgs = messagesStore.get().filter((m: any) => m.id !== msgId);
					messagesStore.set(msgs);
				}
			} else {
				updateMessage(
					msgId,
					"No pude completar la respuesta con suficiente conexión. Revisa tu red e intenta de nuevo.",
					false,
					"error",
				);
			}
		} finally {
			setIsLoading(false);
			abortControllerRef.current = null;
			if (window.innerWidth > 768) {
				setTimeout(() => inputChatRef.current?.focus(), 50);
			}
		}
	};

	const copyToClipboard = () => {
		const visibleMessages = messages.filter(
			(m) => !m.text.includes("[SYSTEM_HIDDEN_CONTEXT]"),
		);
		const text = visibleMessages
			.map((m) => `${m.role === "user" ? "Tú" : "Tito Bits"}: ${m.text}`)
			.join("\n\n");
		navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 3500);
	};

	const resetChat = () => {
		if (window.confirm("¿Reiniciar la conversación para un nuevo tema?")) {
			trackTitoEvent("tito_new_chat_reset", {});
			if (abortControllerRef.current) abortControllerRef.current.abort();
			if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
			setIsLoading(false);
			messagesStore.set([]);
			hasStartedStore.set(false);
			transcriptSentStore.set(false);
			ctaExpandRegistryStore.set({});
			lastGreetedCategoryStore.set("");
			hasUnreadMessagesStore.set(false);
			chatModeStore.set("normal");
			userDataStore.set({
				...userDataStore.get(),
				name: "",
				email: "",
				phone: "",
			});
		}
	};

	const handleCorrectEmail = () => {
		chatModeStore.set("normal");
		// Adding a message so user can type mail
		messagesStore.set([
			...messagesStore.get(),
			{ role: "agent", text: "Por favor, dime cuál es tu correo correcto." },
		]);
	};

	const sendSilentEmail = async () => {
		setIsSendingEmail(true);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localTime = new Date().toLocaleString("es-MX", { timeZone });

		try {
			await fetch("/api/send-transcript", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userData,
					messages: messages.filter(
						(m) => !m.text.includes("[SYSTEM_HIDDEN_CONTEXT]"),
					),
					metadata: {
						time: localTime,
						timeZone,
						url: window.location.href,
					},
				}),
				keepalive: true,
			});
		} catch (error) {
			console.warn("Silently failed storing transcript");
		} finally {
			setIsSendingEmail(false);
		}
	};

	if (!isHydrated) return null; // Previene hydration mismatch en Astro SSR

	return (
		<ChatWindow
			isOpen={isOpen}
			isExpanded={isExpanded}
			hasStarted={hasStarted}
			hasUnread={hasUnread}
			userData={userData}
			messages={messages}
			isLoading={isLoading}
			isSendingEmail={isSendingEmail}
			isCopied={isCopied}
			input={input}
			endRef={endRef}
			inputChatRef={inputChatRef}
			inputNameRef={inputNameRef}
			toggleChat={toggleChat}
			minimizeChat={() => isOpenStore.set(false)}
			closeChat={() => {
				if (
					hasStarted &&
					!isSendingEmail &&
					messages.length > 1 &&
					!transcriptSentStore.get()
				) {
					transcriptSentStore.set(true);
					sendSilentEmail();
				}
				isOpenStore.set(false);
				hasStartedStore.set(false);
				userDataStore.set({
					name: "",
					email: "",
					phone: "",
					location: "Ubicación Desconocida",
					countryCode: "",
				});
				messagesStore.set([]);
				transcriptSentStore.set(false);
				lastGreetedCategoryStore.set("");
				hasUnreadMessagesStore.set(false);
				isExpandedStore.set(false);
			}}
			toggleExpand={() => isExpandedStore.set(!isExpandedStore.get())}
			resetChat={resetChat}
			startChat={startChat}
			sendMessage={sendMessage}
			sendExpandMessage={sendExpandMessage}
			copyToClipboard={copyToClipboard}
			setInput={setInput}
			setUserDataName={(name: string) =>
				userDataStore.set({ ...userData, name })
			}
			chatMode={chatMode}
			handleCorrectEmail={handleCorrectEmail}
			isRolloutActive={isV3_2}
		/>
	);
}
