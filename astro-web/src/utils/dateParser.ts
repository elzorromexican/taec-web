export const monthMap: Record<string, number> = {
	enero: 1,
	febrero: 2,
	marzo: 3,
	abril: 4,
	mayo: 5,
	junio: 6,
	julio: 7,
	agosto: 8,
	septiembre: 9,
	octubre: 10,
	noviembre: 11,
	diciembre: 12,
};

export function parseDate(dateStr: string | undefined): number {
	if (!dateStr) return 0;
	const match = dateStr.match(/(\d+)\s+(?:de\s+)?([a-z]+)[,\s]+(\d+)/i);
	if (match) {
		const day = parseInt(match[1], 10);
		const month = monthMap[match[2].toLowerCase()] || 1;
		const year = parseInt(match[3], 10);
		return new Date(year, month - 1, day).getTime();
	}
	return 0;
}
