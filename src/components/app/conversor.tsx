"use client"

import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { CALCULATOR, BINARY_OPERATIONS } from '@/utils/conversion-system'
import { useAppConversionSystem } from '@/contexts/app-conversion-system'
import { CONVERSION_SYSTEM_LIST } from '@/enums/conversion-system'
import { CustomSelect } from '@/components/ui/custom-select'
import { SubmitForm } from '@/components/logic/submit-form'
import { CustomInput } from '@/components/ui/custom-input'
import { SETTINGS_EVENT_KEY } from '@/config/constants'
import { useAppTheme } from '@/contexts/app-theme'
import { IconCopy } from '@tabler/icons-react'
import { useSubmit } from '@/hooks/use-form'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function Conversor() {
  const [tab, setTab] = useState(0)

  const { colors } = useAppTheme()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box
      sx={{
        maxWidth: "680px",
        width: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "30px 20px 20px 20px",
        backgroundColor: colors.altBg,
        border: `1px solid ${colors.border}`
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              borderBottom: `1px solid ${colors.border}`
            }}
          >
            <Tab label="Conversiones" {...a11yProps(0)} sx={{ color: colors.text }} />
            <Tab label="Suma y Resta de Binarios" {...a11yProps(1)} sx={{ color: colors.text }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          <ConversionForm />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <CalculatorForm />
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: "20px 0px" }}>{children}</Box>}
    </div>
  )
}


function ConversionForm() {
  const { excludeSystems } = useAppConversionSystem()
  const [result, setResult] = useState<string>("")
  const [system, setSystem] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const { colors } = useAppTheme()

  const options = CONVERSION_SYSTEM_LIST.filter((system) => !excludeSystems.includes(system.value))

  const handleSubmit = useSubmit(({ resolve, data, reject }) => {

    try {
      const result = CALCULATOR[data.conversionType as keyof typeof CALCULATOR](data.value)

      setResult(result)

    } catch (error) {
      reject((error as Error).message || "Error al convertir el valor.")
    }

    resolve({
      notDisabledFields: true,
      message: "",
      notMessage: true,
    })
  })


  useEffect(() => {

    const handleChangeConfig = () => {
      setResult("")
      setValue("")
      setSystem("")
    }

    document.addEventListener(SETTINGS_EVENT_KEY, handleChangeConfig)

    return () => {
      document.removeEventListener(SETTINGS_EVENT_KEY, handleChangeConfig)
    }
  }, [])

  return (
    <SubmitForm
      actionTimeout={0}
      submit={handleSubmit}
      manageLoading={false}
    >
      <CustomSelect
        label='Tipo de conversión'
        data={options}
        name='conversionType'
        value={system}
        onChange={(option) => {
          setResult("")
          setValue("")
          setSystem(option ? option.value : "")
        }}
      />

      <CustomInput
        label="Valor a convertir"
        type="text"
        placeholder='Ingrese el valor'
        name='value'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />


      <Button
        type='submit'
        variant='contained'
        fullWidth
      >
        Convertir
      </Button>


      <Box
        sx={{
          width: "100%",
          position: "relative"
        }}
      >
        <CustomInput
          label="Resultado"
          type="text"
          value={result}
          placeholder='Resultado...'
          readonly
        />

        <Box
          sx={{
            position: "absolute",
            height: "30px",
            width: "30px",
            right: "10px",
            top: "50%",
            background: colors.border + "70",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
        >
          <IconButton
            disabled={!result}
            style={{
              opacity: result ? 1 : 0.5
            }}
            onClick={() => {
              navigator.clipboard.writeText(result).then(() => {
                toast.success("Resultado copiado al portapapeles")
              }).catch(() => {
                toast.error("Error al copiar el resultado")
              })
            }}
          >
            <IconCopy color={colors.text} size={20} />
          </IconButton>
        </Box>
      </Box>

    </SubmitForm>
  )
}

function CalculatorForm() {
  const [result, setResult] = useState<string>("")
  const [value1, setValue1] = useState<string>("")
  const [value2, setValue2] = useState<string>("")
  const [operation, setOperation] = useState<'ADD' | 'SUBTRACT'>('ADD')
  const { colors } = useAppTheme()

  const handleSubmit = useSubmit(({ resolve, data, reject }) => {
    try {
      const result = BINARY_OPERATIONS[operation](data.value1, data.value2)
      setResult(result)
    } catch (error) {
      reject((error as Error).message || "Error al calcular")
    }

    resolve({
      notDisabledFields: true,
      message: "",
      notMessage: true,
    })
  })

  const handleOperationClick = (op: 'ADD' | 'SUBTRACT') => {
    setOperation(op)
    setResult("")
  }

  useEffect(() => {
    const handleChangeConfig = () => {
      setResult("")
      setValue1("")
      setValue2("")
      setOperation('ADD')
    }

    document.addEventListener(SETTINGS_EVENT_KEY, handleChangeConfig)

    return () => {
      document.removeEventListener(SETTINGS_EVENT_KEY, handleChangeConfig)
    }
  }, [])

  return (
    <SubmitForm
      actionTimeout={0}
      submit={handleSubmit}
      manageLoading={false}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            width: '100%',
          }}
          textAlign="left"
          fontSize={14}
        >
          Selecciona la operación que deseas realizar:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
            type="button"
            variant={operation === 'ADD' ? "contained" : "outlined"}
            fullWidth
            onClick={() => handleOperationClick('ADD')}
            sx={{
              border: `1px solid ${colors.border} !important`,
              color: operation === 'ADD' ? colors.primary : colors.text,
              backgroundColor: operation === 'ADD' ? colors.primary + '10' : 'transparent'
            }}
          >
            Suma
          </Button>
          <Button
            type="button"
            variant={operation === 'SUBTRACT' ? "contained" : "outlined"}
            fullWidth
            onClick={() => handleOperationClick('SUBTRACT')}
            sx={{
              border: `1px solid ${colors.border} !important`,
              color: operation === 'SUBTRACT' ? colors.primary : colors.text,
              backgroundColor: operation === 'SUBTRACT' ? colors.primary + '10' : 'transparent'
            }}
          >
            Resta
          </Button>
        </Box>
      </Box>

      <CustomInput
        label="Primer número binario"
        type="text"
        placeholder='Ej: 1010'
        name='value1'
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      />

      <CustomInput
        label="Segundo número binario"
        type="text"
        placeholder='Ej: 1100'
        name='value2'
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />

      <Button
        type='submit'
        variant='contained'
        fullWidth
      >
        Calcular
      </Button>

      <Box
        sx={{
          width: "100%",
          position: "relative"
        }}
      >
        <CustomInput
          label="Resultado"
          type="text"
          value={result}
          placeholder='Resultado...'
          readonly
        />

        <Box
          sx={{
            position: "absolute",
            height: "30px",
            width: "30px",
            right: "10px",
            top: "50%",
            background: colors.border + "70",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
        >
          <IconButton
            disabled={!result}
            style={{
              opacity: result ? 1 : 0.5
            }}
            onClick={() => {
              navigator.clipboard.writeText(result).then(() => {
                toast.success("Resultado copiado al portapapeles")
              }).catch(() => {
                toast.error("Error al copiar el resultado")
              })
            }}
          >
            <IconCopy color={colors.text} size={20} />
          </IconButton>
        </Box>
      </Box>

    </SubmitForm>
  )
}

