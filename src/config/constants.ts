import { ConversionSystemBase } from "@/enums/conversion-system"

export const REGEX_CONVERSION_SYSTEM: Record<ConversionSystemBase, RegExp> = {
	[ConversionSystemBase.BINARY]: /^[0-1]+$/,
	[ConversionSystemBase.DECIMAL]: /^\d+$/,
	[ConversionSystemBase.OCTAL]: /^[0-7]+$/,
	[ConversionSystemBase.HEXADECIMAL]: /^[0-9A-Fa-f]+$/,
}
