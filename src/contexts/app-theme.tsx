"use client"

import { createContext, useContext, useState } from 'react'
import { APP_COLORS } from '@/config/colors'
import { ThemeMode } from '@/utils/theme'

interface ThemeContextTypeColors {
  bg: string
  altBg: string
  text: string
  border: string
  selectionBg: string
  primary: string
}

interface ThemeContextType {
  theme: ThemeMode
  colors: ThemeContextTypeColors
  setTheme: (mode: ThemeMode) => void
}

const initialThemeContext: ThemeContextType = {
  theme: 'light',
  setTheme: () => { },
  colors: {
    bg: '',
    altBg: '',
    text: '',
    border: '',
    selectionBg: '',
    primary: APP_COLORS.PRIMARY,
  },

}

const AppThemeContext = createContext<ThemeContextType>(initialThemeContext)

interface Props {
  children: React.ReactNode
  initialMode: ThemeMode
}

export function AppThemeProvider({ children, initialMode }: Props) {
  const [mode, setMode] = useState<ThemeMode>(initialMode)

  return (
    <AppThemeContext.Provider
      value={{
        setTheme: setMode,
        theme: mode,
        colors: mode === 'light' ? {
          bg: APP_COLORS.LIGHT_BG,
          altBg: APP_COLORS.LIGHT_ALT_BG,
          text: APP_COLORS.LIGHT_TEXT,
          border: APP_COLORS.LIGHT_BORDER,
          primary: APP_COLORS.PRIMARY,
          selectionBg: APP_COLORS.LIGHT_SELECTION_BG,
        } : {
          bg: APP_COLORS.DARK_BG,
          altBg: APP_COLORS.DARK_ALT_BG,
          text: APP_COLORS.DARK_TEXT,
          border: APP_COLORS.DARK_BORDER,
          primary: APP_COLORS.PRIMARY,
          selectionBg: APP_COLORS.DARK_SELECTION_BG,
        }
      }}>
      {children}
    </AppThemeContext.Provider>
  )
}


export const useAppTheme = () => {
  const context = useContext(AppThemeContext)
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider')
  }
  return context
}
