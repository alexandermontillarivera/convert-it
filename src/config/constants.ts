export const FORM_ACTION_TIMEOUT = 3000
export const REDIRECT_TIMEOUT = 3000

export const VALIDITY_ERROR_MESSAGE: Record<keyof ValidityState, string> = {
	badInput: "El valor ingresado no es válido",
	customError: "El valor ingresado no es válido",
	patternMismatch: "El valor ingresado no es válido",
	rangeOverflow: "El valor ingresado es demasiado grande",
	rangeUnderflow: "El valor ingresado es demasiado pequeño",
	stepMismatch: "El valor ingresado no es válido",
	tooLong: "El valor ingresado es demasiado largo",
	tooShort: "El valor ingresado es demasiado corto",
	typeMismatch: "El valor ingresado no es válido",
	valid: "",
	valueMissing: "Este campo es requerido",
}

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const VALIDITY_ERROR_KEYS = Object.keys(
	VALIDITY_ERROR_MESSAGE,
) as (keyof ValidityState)[]

export const SCIENTIFIC_NOTATION_ELEMENTS = ["e", "E", "+", "-"]
export const REGEX_CONTAINS_SCIENCE_NOTATION = /e|E|\+|-/
