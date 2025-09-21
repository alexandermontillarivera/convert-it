"use client"

import { ConversionSystem } from '@/enums/conversion-system'
import { createContext, useContext, useState } from 'react'

interface ConversionSystemContextType {
  excludeSystems: ConversionSystem[]
  setExcludeSystems: (systems: ConversionSystem[]) => void
}

const initialConversionSystemContext: ConversionSystemContextType = {
  excludeSystems: [],
  setExcludeSystems: () => { },
}

export const AppConversionSystemContext = createContext<ConversionSystemContextType>(initialConversionSystemContext)

interface Props {
  children: React.ReactNode
  initialExcludeSystems: ConversionSystem[]
}

export function AppConversionSystemProvider({ children, initialExcludeSystems }: Props) {
  const [excludeSystems, setExcludeSystems] = useState<ConversionSystem[]>(initialExcludeSystems)

  return (
    <AppConversionSystemContext.Provider
      value={{
        excludeSystems,
        setExcludeSystems
      }}
    >
      {children}
    </AppConversionSystemContext.Provider>
  )
}


export const useAppConversionSystem = () => {
  const context = useContext(AppConversionSystemContext)

  if (!context) {
    throw new Error('useAppConversionSystem must be used within an AppConversionSystemProvider')
  }

  return context
}