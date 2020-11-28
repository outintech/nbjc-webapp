import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme'

export default function Provider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}