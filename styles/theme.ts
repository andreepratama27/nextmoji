import { extendTheme } from '@chakra-ui/react'

const colors = {
  app: {
    background: '#282a36',
    foreground: '#f8f8f2',
    primary: '#6272a4'
  },
  colors: {
    cyan: '#8be9fd',
    green: '#50fa7b',
    orange: '#ffb86c',
    pink: '#ff79c6',
    purple: '#bd93f9',
    red: '#ff5555',
    yellow: '#f1fa8c'
  }
}

const theme = extendTheme({ colors })

export {
  theme
}