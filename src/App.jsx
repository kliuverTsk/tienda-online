import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { TopBanner } from './components/TopBanner/TopBanner'
import { Home } from './pages/home/Home'
import { Carrito } from './pages/carrito/carrito'
import { AboutUs } from './pages/AboutUs/AboutUs';
import { AuthProvider } from './context/authContext';
import { Login } from './pages/admin/Login';
import { AdminPanel } from './pages/admin/AdminPanel';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';
import { CategoryView } from './pages/CategoryView/CategoryView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app">
          <TopBanner />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/sobre-nosotros" element={<AboutUs />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/categoria/:categoria" element={<CategoryView />} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
      </HashRouter>
    </AuthProvider>
  )
}

export default App