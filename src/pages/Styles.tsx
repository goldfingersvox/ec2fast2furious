import { styled } from "@stitches/react"

export const Layout = styled('div', {
  height: '100%',
  width: '100%',
  padding: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '@media (max-width: 1024px)': {
    padding: '1rem'
  },

  '@media (max-width: 480px)': {
    padding: '0.5rem'
  }
})