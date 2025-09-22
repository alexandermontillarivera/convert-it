"use client"

import { SCIENTIFIC_NOTATION_ELEMENTS, REGEX_CONTAINS_SCIENCE_NOTATION } from '@/config/constants'
import { EyeOff, Eye } from "@untitled-ui/icons-react"
import { handleInvalidField } from '@/utils/fields'
import { useMask, format } from '@react-input/mask'
import { useAppTheme } from '@/contexts/app-theme'
import { forwardRef, JSX, useState } from "react"
import { IconApp } from '@/contracts/icon'
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from "@mui/material"

interface PropsMask {
  template: string
  replace: Record<string, RegExp>
}

type Props = TextFieldProps & {
  startIcon?: IconApp
  endIcon?: IconApp
  iconSize?: number
  height?: string | number
  mask?: Partial<PropsMask>
  background?: string
  readonly?: boolean
  endElement?: () => JSX.Element
}

export const CustomInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { colors } = useAppTheme()

  const {
    label,
    type,
    required = true,
    startIcon: StartIcon = () => null,
    endIcon: EndIcon = () => null,
    onInput: externalOnInput,
    onChange: externalOnChange,
    onKeyDown: externalOnKeyDown,
    iconSize = 24,
    fullWidth = true,
    helperText,
    height = '48px',
    multiline,
    defaultValue,
    mask,
    readonly = false,
    background,
    endElement: EndElement,
    ...textFieldProps
  } = props

  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = mask ? useMask({ mask: mask.template, replacement: mask.replace }) : ref

  const togglePasswordVisibility = () => {
    if (readonly) return
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return
    externalOnChange?.(e)
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (readonly) {
      if ('preventDefault' in e) (e as any).preventDefault?.()
      return
    }

    externalOnInput?.(e)
    if (error) setError(null)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (readonly) { e.preventDefault(); return }

    const { type } = e.target as HTMLInputElement
    if (type === 'number' && REGEX_CONTAINS_SCIENCE_NOTATION.test(e.clipboardData.getData('text'))) {
      e.preventDefault()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    externalOnKeyDown?.(e)

    if (readonly) {
      const allowedKeys = new Set([
        'Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
      ])
      const isModifier = e.ctrlKey || e.metaKey || e.altKey
      const isNavigation = allowedKeys.has(e.key)
      if (!isNavigation && !isModifier) {
        e.preventDefault()
      }
      return
    }

    const { type } = e.target as HTMLInputElement
    if (type === 'number' && SCIENTIFIC_NOTATION_ELEMENTS.includes(e.key)) {
      e.preventDefault()
    }
  }

  const inputHeight = multiline ? 128 : (height || undefined)

  const mergedInputProps = {
    ...(textFieldProps.inputProps ?? {}),
    min: type === 'number' ? 0 : (textFieldProps.inputProps as any)?.min,
    style: {
      ...(textFieldProps.inputProps as any)?.style,
      ...(multiline ? { height: 128 - 32 } : null),
    },
    readOnly: readonly,
    'aria-readonly': readonly,
  }

  return (
    <Box sx={{ maxWidth: fullWidth ? "100%" : "500px", width: "100%" }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: colors.text,
            marginBottom: "8px",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        inputRef={inputRef}
        required={required}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        multiline={multiline}
        InputProps={{
          startAdornment: StartIcon ? (
            <InputAdornment position="start">
              <StartIcon color={colors.text} width={iconSize} height={iconSize} />
            </InputAdornment>
          ) : null,
          endAdornment: type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                disabled={readonly}
                tabIndex={readonly ? -1 : 0}
              >
                {showPassword
                  ? <EyeOff color={colors.text} width={iconSize} height={iconSize} />
                  : <Eye color={colors.text} width={iconSize} height={iconSize} />}
              </IconButton>
            </InputAdornment>
          ) : EndIcon ? (
            <InputAdornment position="end">
              <EndIcon color={colors.text} width={iconSize} height={iconSize} />
            </InputAdornment>
          ) : EndElement ? <InputAdornment position="end">{<EndElement />}</InputAdornment> : null,
          style: inputHeight ? { height: inputHeight } : undefined,
        }}
        inputProps={mergedInputProps}
        {...textFieldProps}
        sx={{
          width: "100%",
          maxWidth: "100%",
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            height: inputHeight,
            background: background || colors.border + "70",
            color: colors.text,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.border}`
          },
          "& .MuiOutlinedInput-notchedOutline:hover": {
            border: `1px solid ${colors.border}`
          },
          "& .MuiOutlinedInput-notchedOutline:focus": {
            border: `1px solid ${colors.border}`
          },
          '& .MuiInputBase-inputMultiline': {
            height: '100% !important',
          },
          '& .MuiInputBase-input:read-only': {
            cursor: 'default',
          },
          ...textFieldProps.sx,
        }}
        onInvalid={(e) => handleInvalidField(e, setError)}
        onInput={handleInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        error={Boolean(error)}
        helperText={error ?? helperText}
        onPaste={handlePaste}
        defaultValue={(mask && defaultValue) ? format(defaultValue as string, {
          mask: mask.template!,
          replacement: mask.replace!,
        }) : defaultValue}
      />
    </Box>
  )
})

CustomInput.displayName = "Input"
