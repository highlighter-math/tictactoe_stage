'use client'

import Grid2 from "@/components/Grid2";
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HomePage() {
  return (
    <main style={{ padding: "20px" }}>
      <Grid2 />
      <Fab
      href="/"
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <ArrowBackIcon />
    </Fab>
    </main>
    
  );
}
