import React, { useEffect, useState } from "react";

export default function CurrencyCalculator() {
	const [usdAmount, setUsdAmount] = useState<number | string>(1000);
	const [rateMXN, setRateMXN] = useState<number | string>("17.8117");
	const [rateCOP, setRateCOP] = useState<number | string>("3800");
	const [rateCLP, setRateCLP] = useState<number | string>("920");

	useEffect(() => {
		fetch("https://api.exchangerate-api.com/v4/latest/USD")
			.then((res) => res.json())
			.then((data) => {
				if (data?.rates) {
					setRateMXN(data.rates.MXN.toFixed(4));
					setRateCOP(data.rates.COP.toFixed(2));
					setRateCLP(data.rates.CLP.toFixed(2));
				}
			})
			.catch(() => {});
	}, []);

	const formatC = (val: number, c: string) =>
		new Intl.NumberFormat("es-MX", { style: "currency", currency: c }).format(
			val,
		);
	const currentUsd = typeof usdAmount === "number" ? usdAmount : 0;

	return (
		<div
			style={{
				fontFamily: "Inter, system-ui, sans-serif",
				fontSize: "12px",
				background: "#f8fafc",
				padding: "10px",
				borderRadius: "6px",
				border: "1px solid #e2e8f0",
				marginTop: "10px",
			}}
		>
			{/* Input USD - Max 14px */}
			<div
				style={{
					marginBottom: "10px",
					background: "#fff",
					border: "1px solid #cbd5e1",
					borderRadius: "4px",
					padding: "4px 8px",
					display: "flex",
					alignItems: "center",
				}}
			>
				<span
					style={{
						color: "#475569",
						fontWeight: 600,
						marginRight: "4px",
						fontSize: "13px",
					}}
				>
					USD $
				</span>
				<input
					type="number"
					value={usdAmount}
					onChange={(e) =>
						setUsdAmount(e.target.value === "" ? "" : Number(e.target.value))
					}
					style={{
						border: "none",
						outline: "none",
						width: "100%",
						fontSize: "14px",
						fontWeight: 700,
						color: "var(--navy-slate)",
						background: "transparent",
					}}
				/>
			</div>

			<div style={{ display: "grid", gap: "8px" }}>
				{/* MXN */}
				<div
					style={{
						background: "#fff",
						padding: "6px 8px",
						borderRadius: "4px",
						border: "1px solid #e2e8f0",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<div
							style={{
								fontWeight: 600,
								color: "var(--navy-slate)",
								fontSize: "12px",
							}}
						>
							🇲🇽 Peso MXN
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
								marginTop: "2px",
							}}
						>
							<span style={{ fontSize: "10px", color: "#64748b" }}>
								TC Oficial:
							</span>
							<input
								type="number"
								step="0.0001"
								value={rateMXN}
								onChange={(e) => setRateMXN(e.target.value)}
								style={{
									width: "45px",
									padding: "1px 2px",
									border: "1px solid #cbd5e1",
									borderRadius: "3px",
									color: "#2563eb",
									fontWeight: 600,
									fontSize: "11px",
									outline: "none",
								}}
								title="Editar Tipo de Cambio"
							/>
						</div>
					</div>
					<span
						style={{
							fontSize: "14px",
							fontWeight: 700,
							color: "var(--check-green)",
						}}
					>
						{formatC(currentUsd * Number(rateMXN), "MXN")}
					</span>
				</div>

				{/* COP */}
				<div
					style={{
						background: "#fff",
						padding: "6px 8px",
						borderRadius: "4px",
						border: "1px solid #e2e8f0",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<div
							style={{
								fontWeight: 600,
								color: "var(--navy-slate)",
								fontSize: "12px",
							}}
						>
							🇨🇴 Plata COP
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
								marginTop: "2px",
							}}
						>
							<span style={{ fontSize: "10px", color: "#64748b" }}>
								TC Oficial:
							</span>
							<input
								type="number"
								step="0.01"
								value={rateCOP}
								onChange={(e) => setRateCOP(e.target.value)}
								style={{
									width: "45px",
									padding: "1px 2px",
									border: "1px solid #cbd5e1",
									borderRadius: "3px",
									color: "#2563eb",
									fontWeight: 600,
									fontSize: "11px",
									outline: "none",
								}}
							/>
						</div>
					</div>
					<span
						style={{
							fontSize: "14px",
							fontWeight: 700,
							color: "var(--navy-slate)",
						}}
					>
						{formatC(currentUsd * Number(rateCOP), "COP")}
					</span>
				</div>

				{/* CLP */}
				<div
					style={{
						background: "#fff",
						padding: "6px 8px",
						borderRadius: "4px",
						border: "1px solid #e2e8f0",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<div
							style={{
								fontWeight: 600,
								color: "var(--navy-slate)",
								fontSize: "12px",
							}}
						>
							🇨🇱 Peso CLP
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
								marginTop: "2px",
							}}
						>
							<span style={{ fontSize: "10px", color: "#64748b" }}>
								TC Oficial:
							</span>
							<input
								type="number"
								step="0.01"
								value={rateCLP}
								onChange={(e) => setRateCLP(e.target.value)}
								style={{
									width: "45px",
									padding: "1px 2px",
									border: "1px solid #cbd5e1",
									borderRadius: "3px",
									color: "#2563eb",
									fontWeight: 600,
									fontSize: "11px",
									outline: "none",
								}}
							/>
						</div>
					</div>
					<span
						style={{
							fontSize: "14px",
							fontWeight: 700,
							color: "var(--navy-slate)",
						}}
					>
						{formatC(currentUsd * Number(rateCLP), "CLP")}
					</span>
				</div>
			</div>

			{/* Footer Links - Ultra compactos */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "8px",
					padding: "0 4px",
				}}
			>
				<a
					href="https://www.banxico.org.mx/tipcamb/main.do?page=tip&idioma=sp"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: "#64748b",
						textDecoration: "none",
						fontSize: "10px",
						fontWeight: 600,
					}}
				>
					Auditar Banxico ↗
				</a>
				<a
					href="https://suameca.banrep.gov.co/estadisticas-economicas/informacionSerie/1/tasa_cambio_peso_colombiano_trm_dolar_usd"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: "#64748b",
						textDecoration: "none",
						fontSize: "10px",
						fontWeight: 600,
					}}
				>
					Auditar Banrep ↗
				</a>
			</div>
		</div>
	);
}
