import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { palette } from './components/theme'

export default function Provider({ children }) {
  return <ThemeProvider theme={palette}>{children}</ThemeProvider>
}