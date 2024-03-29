import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { Start } from './pages/start'
import { theme } from './theme'
import { GlobalStyle } from './theme/global-style'

const container = document.querySelector('#root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Start />
  </ThemeProvider>
)
