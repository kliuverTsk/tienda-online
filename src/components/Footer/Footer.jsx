import './Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p>WhatsApp: +57 123 456 7890</p>
                    <p>Email: tienda@ejemplo.com</p>
                    <p>Instagram: @tienda_ejemplo</p>
                </div>
                <div className="footer-section">
                    <h3>Horarios de Entrega</h3>
                    <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 2:00 PM</p>
                </div>
                <div className="footer-section">
                    <h3>Zonas de Entrega</h3>
                    <p>Bogotá: Todas las localidades</p>
                    <p>Tiempo estimado: 24-48 horas</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Tu Tienda. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}