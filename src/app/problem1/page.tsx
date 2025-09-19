'use client'

import Grid from "@/components/Grid";
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const prod = process.env.NODE_ENV === "production";
const basePath = prod ? "/tictactoe_stage/" : "/";

export default function HomePage() {
  return (
    <main style={{ padding: "20px" }}>
      <Grid />
      <Fab
      href={basePath}
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