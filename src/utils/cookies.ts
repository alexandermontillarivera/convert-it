export type CookieData = {
	name: string
	value: string
	days?: number
}

export async function setApplicationCookies(
	cookies: CookieData | CookieData[],
): Promise<{ success: boolean; message?: string; error?: string }> {
	try {
		const response = await fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cookies),
		})
		const result = await response.json()
		if (!response.ok) {
			throw new Error(result.error || "Error set cookies request")
		}
		return result
	} catch (error) {
		console.error("Error setting cookies:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}
