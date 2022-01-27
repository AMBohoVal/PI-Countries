import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/country/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
