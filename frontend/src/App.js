import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: { main: '#2d2d2d' },
    secondary: { main: '#f5f5dc' },
    background: { default: '#fffdf6' }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: { textTransform: 'none' }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Box sx={{ 
          minHeight: 'calc(100vh - 128px)', 
          padding: 3,
          backgroundColor: 'background.default'
        }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;