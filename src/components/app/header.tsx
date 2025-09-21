"use client"

import { SettingsButton } from '@/components/app/settings-button'
import { useAppTheme } from '@/contexts/app-theme'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const { colors } = useAppTheme()

  return (
    <Box
      component="header"
      sx={{
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        padding: "8px 16px",
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: colors.text
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Image
              width={70}
              height={70}
              src="/logo.png"
              alt='Convert It Logo'
              style={{ objectFit: 'contain' }}
              priority
            />

            <Typography
              variant='h2'
              fontSize={24}
              fontWeight="bold"
            >
              ConvertIt
            </Typography>
          </Box>
        </Link>

        <SettingsButton />
      </Box>
    </Box>
  )
}

