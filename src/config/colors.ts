export enum APP_COLORS {
	PRIMARY = "#1173D4",
	DARK_BG = "#101922",
	DARK_ALT_BG = "#111825",
	DARK_TEXT = "#E1E1E1",
	DARK_BORDER = "#1F2937",
	DARK_SELECTION_BG = "#101D2B",
	LIGHT_BG = "#FFFFFF",
	LIGHT_ALT_BG = "#f5f5f58f",
	LIGHT_TEXT = "#1A1A1A",
	LIGHT_BORDER = "#E5E7EB",
	LIGHT_SELECTION_BG = "#99999940",
}

export const generateCssVars = (): string => {
	const vars = Object.entries(APP_COLORS)
		.map(([key, value]) => {
			const cssVar = `--${key.replace(/_/g, "-").toLowerCase()}`
			return `${cssVar}: ${value};`
		})
		.join("\n  ")

	return `:root {\n  ${vars}\n}`
}
