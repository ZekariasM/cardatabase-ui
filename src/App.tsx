import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {

  return (
    <>
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position='static' >
        <Toolbar>
          <Typography variant='h5'>
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
    </>
  )
}