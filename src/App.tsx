import { BrowserRouter, Routes, Route } from 'react-router';

// pages
import Home from './pages/Home/Home';

// components
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
