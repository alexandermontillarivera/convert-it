"use client"
import { IconCheck, IconMoon, IconSettings, IconSun, IconX } from '@tabler/icons-react'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { useAppConversionSystem } from '@/contexts/app-conversion-system'
import { CONVERSION_SYSTEM_LIST } from '@/enums/conversion-system'
import { CONVERSION_SYSTEM_KEY } from '@/utils/conversion-system'
import { setApplicationCookies } from '@/utils/cookies'
import { useAppTheme } from '@/contexts/app-theme'
import { THEME_MODE_KEY } from '@/utils/theme'
import { useState, useEffect } from 'react'
import { ThemeMode } from '@/utils/theme'
import { Chip } from '@mui/material'
import { Drawer } from 'vaul'
import { SETTINGS_EVENT_KEY } from '@/config/constants'

export function SettingsButton() {
  const { excludeSystems, setExcludeSystems } = useAppConversionSystem()
  const { colors, theme, setTheme } = useAppTheme()

  const [isOpen, setIsOpen] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>(theme)
  const [systems, setSystems] = useState(() => {
    return CONVERSION_SYSTEM_LIST.map((system) => ({
      ...system,
      excluded: excludeSystems.includes(system.value)
    }))
  })

  useEffect(() => {
    if (isOpen) {
      setThemeMode(theme)
      setSystems(
        CONVERSION_SYSTEM_LIST.map((system) => ({
          ...system,
          excluded: excludeSystems.includes(system.value)
        }))
      )
    }
  }, [isOpen, theme, excludeSystems])

  const handleSaveSettings = async () => {
    if (themeMode !== theme) {
      document.body.classList.remove(theme === 'light' ? 'light' : 'dark')
      document.body.classList.add(themeMode === 'light' ? 'light' : 'dark')
      setTheme(themeMode)
    }

    const newExcludedSystems = systems
      .filter((system) => system.excluded)
      .map((system) => system.value)

    setExcludeSystems(newExcludedSystems)

    try {
      await setApplicationCookies([
        {
          name: THEME_MODE_KEY,
          value: themeMode,
          days: 4000
        },
        {
          name: CONVERSION_SYSTEM_KEY,
          value: JSON.stringify(newExcludedSystems),
          days: 4000
        }
      ])
    } catch {

    }

    document.dispatchEvent(new Event(SETTINGS_EVENT_KEY))

    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger
          onClick={handleOpen}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <IconButton component="div">
            <IconSettings className='hoverOpacityEffect' color={colors.text} />
          </IconButton>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Title />
          <Drawer.Description />
          <Drawer.Overlay className="drawer-overlay" />
          <Drawer.Content
            className="drawer-content"
            style={{
              backgroundColor: colors.bg,
              display: 'flex',
              flexDirection: 'column',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              marginTop: '6rem',
              height: '80%',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              outline: 'none'
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                margin: '0 auto',
                width: '3rem',
                height: '0.375rem',
                flexShrink: 0,
                borderRadius: '9999px',
                backgroundColor: '#d1d5db',
                marginTop: '1rem',
                marginBottom: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            />

            <Box
              sx={{
                backgroundColor: colors.bg,
                flex: 1,
                overflowY: 'auto',
                paddingBottom: '2rem'
              }}
            >
              <Box
                sx={{
                  maxWidth: "800px",
                  width: "100%",
                  margin: "0px auto",
                  padding: "0 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "flex-start",
                    paddingTop: "3rem",
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <Typography
                      variant='h2'
                      fontSize={32}
                      fontWeight="bold"
                    >
                      Configuración
                    </Typography>

                    <Typography>
                      Personaliza tu experiencia ajustando las opciones a tu gusto.
                    </Typography>
                  </Box>

                  <Drawer.Close
                    onClick={handleClose}
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <IconButton component="div">
                      <IconX color={colors.text} />
                    </IconButton>
                  </Drawer.Close>
                </Box>

                <SettingsSection
                  title='Apariencia'
                  description='Elige entre el modo claro y oscuro para una experiencia visual óptima.'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row'
                      }
                    }}
                  >
                    <Button
                      sx={{
                        width: "100%",
                        maxWidth: {
                          xs: "100%",
                          sm: "50%"
                        },
                        border: `1px solid ${colors.border}`,
                        height: '150px',
                        borderRadius: '10px',
                        color: colors.text,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: themeMode === 'light' ? colors.selectionBg : colors.bg,
                      }}
                      onClick={() => setThemeMode('light')}
                    >
                      <IconSun color={colors.text} size={48} />
                      <Typography fontSize={18} sx={{ marginTop: '1rem' }}>
                        Claro
                      </Typography>
                    </Button>
                    <Button
                      sx={{
                        width: "100%",
                        maxWidth: {
                          xs: "100%",
                          sm: "50%"
                        },
                        border: `1px solid ${colors.border}`,
                        height: '150px',
                        borderRadius: '10px',
                        color: colors.text,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: themeMode === 'dark' ? colors.selectionBg : 'transparent',
                      }}
                      onClick={() => setThemeMode('dark')}
                    >
                      <IconMoon color={colors.text} size={48} />
                      <Typography fontSize={18} sx={{ marginTop: '1rem' }}>
                        Oscuro
                      </Typography>
                    </Button>
                  </Box>
                </SettingsSection>

                <SettingsSection
                  title='Sistemas de conversión'
                  description='Selecciona los sistemas de conversión que deseas utilizar en la aplicación.'
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    {systems.map((system) => (
                      <Tooltip
                        key={system.value}
                        title={system.excluded ? 'Incluir sistema' : 'Excluir sistema'}
                      >
                        <Chip
                          className='hoverOpacityEffect'
                          label={system.label}
                          variant={system.excluded ? 'outlined' : 'filled'}
                          color={system.excluded ? 'default' : 'primary'}
                          icon={system.excluded ? <IconX size={16} color={colors.text} /> : <IconCheck size={16} color={colors.text} />}
                          onClick={() => {
                            setSystems((prevSystems) =>
                              prevSystems.map((s) =>
                                s.value === system.value ? { ...s, excluded: !s.excluded } : s
                              )
                            )
                          }}
                          sx={{
                            cursor: 'pointer',
                            userSelect: 'none',
                            borderRadius: '8px',
                            fontWeight: 500,
                            fontSize: '14px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            ...(system.excluded
                              ? {
                                borderColor: colors.border,
                                color: colors.text,
                                backgroundColor: colors.bg,
                                '&:hover': {
                                  backgroundColor: colors.selectionBg,
                                  borderColor: colors.border,
                                },
                              }
                              : {
                                backgroundColor: colors.selectionBg,
                                color: colors.text,
                                '&:hover': {
                                  backgroundColor: colors.selectionBg,
                                  borderColor: colors.selectionBg,
                                },
                              }),
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </SettingsSection>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    width: '100%',
                    borderTop: `1px solid ${colors.border} `
                  }}
                >
                  <Button
                    onClick={handleSaveSettings}
                    variant='contained'
                    sx={{
                      width: "100%",
                      maxWidth: {
                        xs: "100%",
                        sm: "200px"
                      }
                    }}
                  >
                    Guardar cambios
                  </Button>
                </Box>
              </Box>
            </Box>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

interface SectionProps {
  children: React.ReactNode
  title: string
  description: string
}

function SettingsSection({ children, title, description }: SectionProps) {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '1rem',
      }}
    >
      <Box>
        <Typography
          variant='h3'
          fontSize={24}
          fontWeight="bold"
          sx={{
            marginBottom: '1rem',
            marginTop: '2rem'
          }}
        >
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {children}
      </Box>
    </Box >
  )
}