"use client"

import { MATERIAL_THEME_CONFIG } from '@/config/theme'
import { ThemeProvider } from '@mui/material'

interface Props {
  children: React.ReactNode
}

export function MaterialUIProvider(props: Props) {
  const {
    children
  } = props

  return (
    <ThemeProvider
      theme={MATERIAL_THEME_CONFIG}
    >
      {children}
    </ThemeProvider>
  )
}
