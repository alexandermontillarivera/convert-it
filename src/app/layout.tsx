import { AppConversionSystemProvider } from '@/contexts/app-conversion-system'
import { getConversionSystemExclude } from '@/utils/conversion-system'
import { MaterialUIProvider } from '@/providers/material-ui'
import { AppThemeProvider } from '@/contexts/app-theme'
import { generateCssVars } from '@/config/colors'
import { getThemeMode } from '@/utils/theme'
import { poppins } from '@/config/fonts'
import "@/styles/app/globals.css"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "ConvertIt",
  description: "Una herramienta para convertir sistemas de medidas informáticas.",
  icons: "/logo.png",
}

const cssVariables = generateCssVars()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const [theme, excludeSystems] = await Promise.all([
    getThemeMode(),
    getConversionSystemExclude()
  ])

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
        <link rel="icon" href="/logo.png" />
      </head>
      <body suppressHydrationWarning className={`${poppins.className} ${theme}`}>
        <MaterialUIProvider>
          <AppConversionSystemProvider
            initialExcludeSystems={excludeSystems}
          >
            <AppThemeProvider
              initialMode={theme}
            >
              {children}
            </AppThemeProvider>
          </AppConversionSystemProvider>
        </MaterialUIProvider>
      </body>
    </html>
  )
}
