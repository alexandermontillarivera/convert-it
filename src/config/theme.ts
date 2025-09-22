import { APP_COLORS } from "@/config/colors"
import { createTheme } from "@mui/material"
import { poppins } from "@/config/fonts"

export const MATERIAL_THEME_CONFIG = createTheme({
	palette: {
		primary: {
			main: APP_COLORS.PRIMARY,
		},
	},
	typography: {
		fontFamily: poppins.style.fontFamily,
		button: {
			textTransform: "none",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 998,
			lg: 1280,
			xl: 1920,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: () => ({
					fontWeight: 600,
					fontSize: "14px",
					textTransform: "none",
					borderRadius: "12px",
					padding: "12px 24px",
					border: "none",
					boxShadow: "none",
					"&.MuiButton-outlined": {
						border: "2px solid #0091DF",
					},
				}),
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					marginLeft: "0px",
					color: "#e74d53 !important",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					borderRadius: "16px",

					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							border: "none",
							borderRadius: "6px",
						},
						"&.Mui-focused fieldset": {
							borderRadius: "6px",
						},
						"&:hover fieldset": {
							borderRadius: "6px",
						},
						"&.Mui-disabled": {
							"& fieldset": {
								border: "none",
								opacity: 0.2,
							},
						},

						"&::placeholder": {
							color: "#ffffff80",
							opacity: 1,
						},
					},
				},
			},
		},
	},
})
