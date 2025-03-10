import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CarritoContext } from '../../context/context'
import './navbar.css';

export function Navbar() {
    const { getTotalItems } = useContext(CarritoContext);
    const totalItems = getTotalItems();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1><Link to="/">Urban Style</Link></h1>
            </div>
            
            <div className="navbar-categories">
                <ul>
                    <li><Link to="/categoria/gorras">Gorras</Link></li>
                    <li><Link to="/categoria/ropa-mujer">Ropa mujer</Link></li>
                    <li><Link to="/categoria/ropa-hombre">Ropa Hombre</Link></li>
                    <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                </ul>
            </div>

            <div className="navbar-cart">
                <Link to="/carrito">
                    🛒
                    {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
}