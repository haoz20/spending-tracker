import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Journal from './routes/Journal';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  );
}

export default App;
