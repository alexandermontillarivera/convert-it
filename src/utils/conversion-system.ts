import { ConversionSystem } from "@/enums/conversion-system"

const CONVERSION_SYSTEM_KEY = "conversion-system-excludes"

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

const isValidBinary = (input: string): boolean => {
	return /^[01]+$/.test(input.trim())
}

const isValidOctal = (input: string): boolean => {
	const trimmed = input.trim()
	return /^0?[0-7]+$/.test(trimmed)
}

const isValidHexadecimal = (input: string): boolean => {
	const trimmed = input.trim()
	return /^(0x|0X)?[0-9A-Fa-f]+$/.test(trimmed)
}

const extractHexNumber = (input: string): string => {
	const trimmed = input.trim()
	return trimmed.replace(/^(0x|0X)/, "")
}

const extractOctalNumber = (input: string): string => {
	const trimmed = input.trim()
	return trimmed.replace(/^0+/, "") || "0"
}

const isValidDecimal = (input: string): boolean => {
	return /^[0-9]+$/.test(input.trim()) && !isNaN(parseInt(input.trim()))
}

export const CALCULATOR: Record<ConversionSystem, (input: string) => string> = {
	BINARY_TO_DECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidBinary(trimmed)) {
			return "Error: Entrada binaria inválida"
		}

		try {
			const decimal = parseInt(trimmed, 2)
			return `${decimal}₁₀`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	BINARY_TO_HEXADECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidBinary(trimmed)) {
			return "Error: Entrada binaria inválida"
		}

		try {
			const decimal = parseInt(trimmed, 2)
			return `0x${decimal.toString(16).toUpperCase()}₁₆`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	BINARY_TO_OCTAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidBinary(trimmed)) {
			return "Error: Entrada binaria inválida"
		}

		try {
			const decimal = parseInt(trimmed, 2)
			return `0${decimal.toString(8)}₈`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	DECIMAL_TO_BINARY: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidDecimal(trimmed)) {
			return "Error: Entrada decimal inválida"
		}

		try {
			const decimal = parseInt(trimmed, 10)
			if (decimal < 0) {
				return "Error: No se admiten números negativos"
			}
			return `${decimal.toString(2)}₂`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	DECIMAL_TO_HEXADECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidDecimal(trimmed)) {
			return "Error: Entrada decimal inválida"
		}

		try {
			const decimal = parseInt(trimmed, 10)
			if (decimal < 0) {
				return "Error: No se admiten números negativos"
			}
			return `0x${decimal.toString(16).toUpperCase()}₁₆`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	DECIMAL_TO_OCTAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidDecimal(trimmed)) {
			return "Error: Entrada decimal inválida"
		}

		try {
			const decimal = parseInt(trimmed, 10)
			if (decimal < 0) {
				return "Error: No se admiten números negativos"
			}
			return `0${decimal.toString(8)}₈`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	HEXADECIMAL_TO_BINARY: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidHexadecimal(trimmed)) {
			return "Error: Entrada hexadecimal inválida"
		}

		try {
			const hexNumber = extractHexNumber(trimmed)
			const decimal = parseInt(hexNumber, 16)
			return `${decimal.toString(2)}₂`
		} catch {
			return "Error: No se pudo convertir"
		}
	},
	HEXADECIMAL_TO_DECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidHexadecimal(trimmed)) {
			return "Error: Entrada hexadecimal inválida"
		}

		try {
			const hexNumber = extractHexNumber(trimmed)
			const decimal = parseInt(hexNumber, 16)
			return `${decimal}₁₀`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	HEXADECIMAL_TO_OCTAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidHexadecimal(trimmed)) {
			return "Error: Entrada hexadecimal inválida"
		}

		try {
			const hexNumber = extractHexNumber(trimmed)
			const decimal = parseInt(hexNumber, 16)
			return `0${decimal.toString(8)}₈`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	OCTAL_TO_BINARY: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidOctal(trimmed)) {
			return "Error: Entrada octal inválida"
		}

		try {
			const octalNumber = extractOctalNumber(trimmed)
			const decimal = parseInt(octalNumber, 8)
			return `${decimal.toString(2)}₂`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	OCTAL_TO_DECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidOctal(trimmed)) {
			return "Error: Entrada octal inválida"
		}

		try {
			const octalNumber = extractOctalNumber(trimmed)
			const decimal = parseInt(octalNumber, 8)
			return `${decimal}₁₀`
		} catch {
			return "Error: No se pudo convertir"
		}
	},

	OCTAL_TO_HEXADECIMAL: (input: string): string => {
		const trimmed = input.trim()
		if (!trimmed || !isValidOctal(trimmed)) {
			return "Error: Entrada octal inválida"
		}

		try {
			const octalNumber = extractOctalNumber(trimmed)
			const decimal = parseInt(octalNumber, 8)
			return `0x${decimal.toString(16).toUpperCase()}₁₆`
		} catch {
			return "Error: No se pudo convertir"
		}
	},
}
