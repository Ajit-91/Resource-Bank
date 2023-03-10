import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import History from './pages/History/History';
import AllCards from './pages/BucketCards/AllCards';
import AllBuckets from './pages/Buckets/AllBuckets';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Container maxWidth='xl' sx={({ palette: { custom } }) => ({
        backgroundColor: custom.background.main,
        flexGrow: 1,
        py: 5,
      })}>
        <Container sx={{ width: '100%', height: 'fit-content' }}>
          <Navbar />
          <Routes>
            <Route path="/buckets" element={<AllBuckets />} />
            <Route path="/buckets/:id" element={<AllCards />} />
            <Route path="/history" element={<History />} />
            <Route path='*' element={<Navigate to={'/buckets'} />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
}

export default App;
