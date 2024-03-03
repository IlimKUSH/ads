'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 'clamp(24px, 3vw, 36px)',
      fontWeight: '900',
    },
    h2: {
      fontSize: 'clamp(22px, 3vw, 32px)',
      fontWeight: '800',
    },
    h3: {
      fontSize: 'clamp(20px, 3vw, 28px)',
      fontWeight: '700',
    },
    h4: {
      fontSize: 'clamp(18px, 3vw, 24px)',
      fontWeight: '600',
    },
    h5: {
      fontSize: 'clamp(16px, 3vw, 20px)',
      fontWeight: '500',
    },
    h6: {
      fontSize: 'clamp(14px, 3vw, 16px)',
      fontWeight: '400',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
