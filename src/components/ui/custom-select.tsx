"use client"
import { Select as SelectMui, Typography, MenuItem } from "@mui/material"
import styles from "@/styles/ui/custom-select.module.css"
import { IconChevronDown } from '@tabler/icons-react'
import { useAppTheme } from '@/contexts/app-theme'
import { useState } from 'react'

export interface IOption {
  value: string
  label: string | React.ReactNode
}
interface Props {
  placeholder?: string
  value?: string
  name?: string
  optional?: boolean
  data?: IOption[]
  customError?: string | null
  onChange?: (value: IOption | null) => void
  label?: string,
  defaultValue?: IOption,
  size?: "small" | "medium" | "large",
  valueMaxWidth?: string,
}

export function CustomSelect(props: Props) {
  const { colors } = useAppTheme()

  const {
    placeholder = "Seleccionar",
    data = [],
    optional = false,
    customError = null,
    name,
    value: fieldValue = null,
    onChange,
    label,
    defaultValue,
    size = "large",
    valueMaxWidth
  } = props

  const getHeightBySize = () => {
    switch (size) {
      case "small":
        return 32
      case "medium":
        return 40
      case "large":
      default:
        return 48
    }
  }

  const [error, setError] = useState<string | null>(customError)
  const [value, setValue] = useState<string | null>(fieldValue)

  const handleOnInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError("Debe seleccionar una opción.")
  }

  return (
    <div
      className={styles.container}
      title={placeholder}
      data-error={error}
      style={{
        marginBottom: error ? "30px" : 0,
      }}
    >
      {
        label &&
        <Typography gutterBottom sx={{
          fontSize: "14px",
          marginBottom: "8px",
        }}>
          {label}
        </Typography>
      }
      <SelectMui
        fullWidth
        displayEmpty
        defaultValue={defaultValue}
        value={value || ""}
        name={name}
        required={!optional}
        IconComponent={(props) => <IconChevronDown {...props} color={colors.text}
          style={{
            textAlign: "center",
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--neutral-black-2)"
          }} />}
        onInvalid={handleOnInvalid}
        error={Boolean(error)}
        renderValue={(value: any) => {
          if (!value) {
            return (
              <Typography sx={{
                color: colors.text,
                fontSize: size === "small" ? "14px" : "16px",
              }}>
                {placeholder}
              </Typography>
            )
          }
          const option = data.find((option) => option.value === value) || null
          if (!option) {
            return null
          }
          return (
            typeof option.label === 'string' ? (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "clip",
                  textOverflow: "ellipsis",
                  color: colors.text,
                  maxWidth: valueMaxWidth,
                  fontSize: size === "small" ? "12px" : "16px",
                }}
              >
                {option.label}
              </Typography>
            ) : option.label
          )
        }}
        onChange={(e) => {
          const value = e.target.value as string
          const option = data.find((option) => option.value === value) || null
          if (error && option) {
            setError(null)
          }
          setValue(value)
          onChange?.(option)
        }}
        sx={{
          fontSize: size === "small" ? "14px" : "16px",
          height: getHeightBySize(),
          borderRadius: "6px",
          background: colors.border + "70",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${colors.border} !important`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "& .MuiSelect-select": {
            padding: size === "small" ? "4px 16px 4px 16px" : "8px 16px 8px 16px",
          },
        }}

        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            style: {
              marginTop: "4px",
              borderRadius: "12px",
              padding: "0px 8px",
              border: `1px solid ${colors.border}`,
              boxShadow: "2px 10px 14px 0px #00000005",
              backgroundColor: colors.bg,
            },
            sx: {
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1a1a1a",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: "4px",
                "&:hover": {
                },
              },
              "&::-webkit-scrollbar-thumb:active": {
              },
              scrollbarWidth: "thin",
            },
          },
        }}
      >
        {data.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: size === "small" ? "14px" : "16px",
              color: colors.text,
              fontWeight: 400,
              ":hover": {
                backgroundColor: colors.primary + "80",
                color: "#FFF",

              },
              "&.Mui-focused": {
                backgroundColor: colors.primary + "80",
                color: "#FFF",

              },
              "&:focus": {
                color: "#FFF",

                backgroundColor: colors.primary + "80",
              },
              "&.Mui-selected": {
                backgroundColor: colors.primary + "80",
                color: "#FFF",
              },
              "&.Mui-selected:hover": {
                backgroundColor: colors.primary + "80",
                color: "#FFF",

              },
              "&.Mui-selected:focus": {
                backgroundColor: colors.primary + "80",
                color: "#FFF",

              },
              borderRadius: "6px",
              "&:last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            {option.label}
          </MenuItem>

        ))}
      </SelectMui>
    </div>
  )
}