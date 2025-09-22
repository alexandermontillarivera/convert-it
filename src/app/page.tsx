import { Conversor } from '@/components/app/conversor'
import { Header } from '@/components/app/header'
import { Box, Typography } from '@mui/material'

export default function ApplicationPage() {
  return (
    <Box
      component="main"
    >
      <Header />

      <Box
        sx={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <Typography
          variant='h1'
          fontSize={32}
          textAlign="center"
        >
          ConvertIt
        </Typography>

        <Typography
          variant='h2'
          fontSize={20}
          textAlign="center"
          style={{
            opacity: 0.8
          }}
        >
          Una herramienta para convertir sistemas de medidas informáticas.
        </Typography>

        <Conversor />
      </Box>
    </Box>
  )
}
