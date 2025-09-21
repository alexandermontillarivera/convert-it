import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

type CookieData = {
	name: string
	value: string
	days?: number
}

export async function POST(request: NextRequest) {
	try {
		const cookieData = await request.json()
		const cookieStore = await cookies()
		const cookiesArray: CookieData[] = Array.isArray(cookieData)
			? cookieData
			: [cookieData]
		for (const cookie of cookiesArray) {
			if (!cookie.name || cookie.value === undefined) {
				return NextResponse.json(
					{ error: "The cookie must have a name and a value" },
					{ status: 400 },
				)
			}
		}
		for (const cookie of cookiesArray) {
			const { name, value, days } = cookie
			const cookieOptions: {
				name: string
				value: string
				expires?: Date
				httpOnly: boolean
				secure: boolean
				sameSite: "strict" | "lax" | "none"
			} = {
				name,
				value: String(value),
				sameSite: "strict",
				secure: true,
				httpOnly: true,
			}
			if (days !== undefined) {
				const expirationDate = new Date()
				expirationDate.setDate(expirationDate.getDate() + days)
				cookieOptions.expires = expirationDate
			}
			cookieStore.set(cookieOptions)
		}
		return NextResponse.json({
			success: true,
			message: "Cookies set successfully",
		})
	} catch (error) {
		console.error("Error setting cookies:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		)
	}
}
