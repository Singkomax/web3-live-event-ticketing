import { Container } from "@mui/material"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Dashboard />
      </Container>
      
    </>
  )
}

export default App
