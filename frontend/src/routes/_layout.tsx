import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import { Container } from '@mui/material'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Outlet />
      </Container>
    </>
  )
}
