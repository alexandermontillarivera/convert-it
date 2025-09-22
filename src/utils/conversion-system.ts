import { ConversionSystem } from "@/enums/conversion-system"

export const CONVERSION_SYSTEM_KEY = "conversion-system-excludes"

export const getConversionSystemExclude = async (): Promise<
	ConversionSystem[]
> => {
	const { cookies } = await import("next/headers")
	const cookieStore = await cookies()

	try {
		const conversionSystem = cookieStore.get(CONVERSION_SYSTEM_KEY)?.value
		const parse = conversionSystem ? JSON.parse(conversionSystem) : []
		return Array.isArray(parse) ? parse : []
	} catch {
		return []
	}
}

const isValidBinary = (input: string): boolean => /^[01]+$/.test(input.trim())
const isValidOctal = (input: string): boolean => /^0?[0-7]+$/.test(input.trim())
const isValidHexadecimal = (input: string): boolean =>
	/^(0x|0X)?[0-9A-Fa-f]+$/.test(input.trim())
const isValidDecimal = (input: string): boolean =>
	/^[0-9]+$/.test(input.trim()) && !isNaN(parseInt(input.trim()))

const extractHexNumber = (input: string): string =>
	input.trim().replace(/^(0x|0X)/, "")
const extractOctalNumber = (input: string): string =>
	input.trim().replace(/^0+/, "") || "0"

export const CALCULATOR: Record<ConversionSystem, (input: string) => string> = {
	BINARY_TO_DECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidBinary(t)) throw new Error("Entrada binaria inválida")
		try {
			return `${parseInt(t, 2)}₁₀`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	BINARY_TO_HEXADECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidBinary(t)) throw new Error("Entrada binaria inválida")
		try {
			const d = parseInt(t, 2)
			return `0x${d.toString(16).toUpperCase()}₁₆`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	BINARY_TO_OCTAL: (input) => {
		const t = input.trim()
		if (!t || !isValidBinary(t)) throw new Error("Entrada binaria inválida")
		try {
			const d = parseInt(t, 2)
			return `0${d.toString(8)}₈`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	DECIMAL_TO_BINARY: (input) => {
		const t = input.trim()
		if (!t || !isValidDecimal(t)) throw new Error("Entrada decimal inválida")
		try {
			const d = parseInt(t, 10)
			if (d < 0) throw new Error("No se admiten números negativos")
			return `${d.toString(2)}₂`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	DECIMAL_TO_HEXADECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidDecimal(t)) throw new Error("Entrada decimal inválida")
		try {
			const d = parseInt(t, 10)
			if (d < 0) throw new Error("No se admiten números negativos")
			return `0x${d.toString(16).toUpperCase()}₁₆`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	DECIMAL_TO_OCTAL: (input) => {
		const t = input.trim()
		if (!t || !isValidDecimal(t)) throw new Error("Entrada decimal inválida")
		try {
			const d = parseInt(t, 10)
			if (d < 0) throw new Error("No se admiten números negativos")
			return `0${d.toString(8)}₈`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	HEXADECIMAL_TO_BINARY: (input) => {
		const t = input.trim()
		if (!t || !isValidHexadecimal(t))
			throw new Error("Entrada hexadecimal inválida")
		try {
			const d = parseInt(extractHexNumber(t), 16)
			return `${d.toString(2)}₂`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	HEXADECIMAL_TO_DECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidHexadecimal(t))
			throw new Error("Entrada hexadecimal inválida")
		try {
			const d = parseInt(extractHexNumber(t), 16)
			return `${d}₁₀`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	HEXADECIMAL_TO_OCTAL: (input) => {
		const t = input.trim()
		if (!t || !isValidHexadecimal(t))
			throw new Error("Entrada hexadecimal inválida")
		try {
			const d = parseInt(extractHexNumber(t), 16)
			return `0${d.toString(8)}₈`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	OCTAL_TO_BINARY: (input) => {
		const t = input.trim()
		if (!t || !isValidOctal(t)) throw new Error("Entrada octal inválida")
		try {
			const d = parseInt(extractOctalNumber(t), 8)
			return `${d.toString(2)}₂`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	OCTAL_TO_DECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidOctal(t)) throw new Error("Entrada octal inválida")
		try {
			const d = parseInt(extractOctalNumber(t), 8)
			return `${d}₁₀`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},

	OCTAL_TO_HEXADECIMAL: (input) => {
		const t = input.trim()
		if (!t || !isValidOctal(t)) throw new Error("Entrada octal inválida")
		try {
			const d = parseInt(extractOctalNumber(t), 8)
			return `0x${d.toString(16).toUpperCase()}₁₆`
		} catch {
			throw new Error("No se pudo convertir")
		}
	},
}
