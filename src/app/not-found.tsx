import { Box, Button, Link, Typography } from '@mui/material'
import Image from 'next/image'

export default function NotFound() {
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
        Página no encontrada
      </Typography>

      <Typography>
        Lo sentimos, la página que estás buscando no existe.
      </Typography>

      <Button
        LinkComponent={Link}
        variant='contained'
        href='/'
      >
        Volver al inicio
      </Button>

    </Box>
  )
}