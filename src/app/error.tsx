"use client"
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export default function ErrorPage() {
  return (
    <Box
      sx={{
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px"
      }}
    >
      <Image
        width={110}
        height={100}
        src="/logo.png"
        alt='Convert It Logo'
        style={{ objectFit: 'contain' }}
        priority
      />

      <Typography
        variant='h1'
        fontSize={32}
        fontWeight={600}
      >
        Oops! Ocurrió un error.
      </Typography>

      <Typography>
        Intenta recargar la página o vuelve más tarde.
      </Typography>
    </Box>
  )
}