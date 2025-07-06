'use client';

import Link from 'next/link';
import Button from '@mui/material/Button';

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '16px',
      }}
    >
      <Link href="/problem1" passHref>
        <Button component="div" variant="outlined" size="medium" sx={{
          width: '200px',
          height: '60px',
          fontSize: '18px',
          padding: '12px 24px',
        }}>
          Problem1
        </Button>
      </Link>
      <Link href="/problem2" passHref>
        <Button component="div" variant="outlined" size="medium" sx={{
          width: '200px',
          height: '60px',
          fontSize: '18px',
          padding: '12px 24px',
        }}>
          Problem2
        </Button>
      </Link>
    </div>
  );
}
