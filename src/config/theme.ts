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
	},
})
