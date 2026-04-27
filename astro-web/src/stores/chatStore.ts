import { persistentAtom, setPersistentEngine } from "@nanostores/persistent";
import { atom } from "nanostores";

if (typeof window !== "undefined") {
	setPersistentEngine(window.sessionStorage, {
		addEventListener(key, handler) {
			window.addEventListener("storage", handler as any);
		},
		removeEventListener(key, handler) {
			window.removeEventListener("storage", handler as any);
		},
	});
}

interface UserData {
	name: string;
	email: string;
	phone: string;
	location: string;
	countryCode: string;
}

interface Message {
	id?: string;
	role: "user" | "agent" | "error";
	text: string;
	promo?: any;
	isStreaming?: boolean;
	intent?: string;
	targetId?: string;
	sourceMessageId?: string;
	compositeKey?: string;
	hasChildren?: boolean;
}

// Persisten en sessionStorage — sobreviven navegación, mueren al cerrar tab/ventana
export const sessionIdStore = persistentAtom<string>("tito:sessionId", "", {
	encode: JSON.stringify,
	decode: JSON.parse,
});

export const isOpenStore = persistentAtom<boolean>("tito:isOpen", false, {
	encode: JSON.stringify,
	decode: JSON.parse,
});

export const hasStartedStore = persistentAtom<boolean>(
	"tito:hasStarted",
	false,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

export const userDataStore = persistentAtom<UserData>(
	"tito:userData",
	{
		name: "",
		email: "",
		phone: "",
		location: "Ubicación Desconocida",
		countryCode: "",
	},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

// Efímeros movidos a persistentAtom para persistir entre páginas (Issue 89)
export const messagesStore = persistentAtom<Message[]>("tito:messages", [], {
	encode: JSON.stringify,
	decode: JSON.parse,
});
export const isExpandedStore = atom<boolean>(true);
export const lastGreetedCategoryStore = atom<string>("");
export const hasUnreadMessagesStore = atom<boolean>(false);
export const transcriptSentStore = atom<boolean>(false);

export interface ExpandNodeConfig {
	sourceMessageId: string;
	targetId: string;
	expandDepth: number;
	hasChildren: boolean;
	hasExpandedOnce: boolean;
}

export type ChatMode = "normal" | "handoff_pending" | "handoff_closed";

export const ctaExpandRegistryStore = persistentAtom<
	Record<string, ExpandNodeConfig>
>(
	"tito:expandRegistry",
	{},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

export const getExpandedNodeKey = (sourceMessageId: string, targetId: string) =>
	`${sourceMessageId}_${targetId}`;

export const finalizeExpansionState = (
	compositeKey: string,
	hasChildren: boolean,
) => {
	const current = ctaExpandRegistryStore.get();
	if (current[compositeKey]) {
		ctaExpandRegistryStore.set({
			...current,
			[compositeKey]: {
				...current[compositeKey],
				hasExpandedOnce: true,
				hasChildren,
			},
		});
	}
};

export const chatModeStore = persistentAtom<ChatMode>(
	"tito:chatMode",
	"normal",
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

export const v3_2RolloutStore = persistentAtom<boolean>(
	"tito:v3_2Rollout",
	false,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

export const initializeRollout = () => {
	if (
		typeof window !== "undefined" &&
		!sessionStorage.getItem("tito:v3_2Rollout")
	) {
		const isDesktop = window.innerWidth > 768;
		const isSelected = Math.random() < 0.1; // 10% sesiones desktop
		// Para testeo forzado local podríamos agregar algo, por ahora respetamos el plan base
		v3_2RolloutStore.set(isDesktop && isSelected);
	}
};
