import {
	VALIDITY_ERROR_KEYS,
	VALIDITY_ERROR_MESSAGE,
	EMAIL_REGEX,
} from "@/config/constants"

export const handleInvalidField = (
	e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>,
	updateMessage: (value: string | null) => void,
) => {
	e.preventDefault()
	const { validity, type, value } = e?.target as HTMLInputElement

	if (validity?.valid) {
		return null
	}

	const errorKey = VALIDITY_ERROR_KEYS.find((key) => validity[key])

	if (!errorKey) {
		return null
	}

	if (type && value && type === "email" && !EMAIL_REGEX.test(value)) {
		updateMessage(VALIDITY_ERROR_MESSAGE.typeMismatch)
		return
	}

	updateMessage(VALIDITY_ERROR_MESSAGE[errorKey])
}
