import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Reservations from './pages/Reservations';
import Admin from './pages/Admin';

import Story from './pages/Story';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/story" element={<Story />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
