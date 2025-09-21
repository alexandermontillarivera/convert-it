export type ThemeMode = "light" | "dark"

const THEME_MODE_KEY = "theme-mode"

export const getThemeMode = async () => {
	const { cookies } = await import("next/headers")
	const cookieStore = await cookies()
	const themeMode = cookieStore.get(THEME_MODE_KEY)?.value as ThemeMode
	return themeMode || "light"
}
