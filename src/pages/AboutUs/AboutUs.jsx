import './AboutUs.css';

export function AboutUs() {
    return (
        <div className="about-us">
            <div className="about-container">
                <h1>Sobre Nosotros</h1>
                
                <section className="about-section">
                    <h2>¿Quiénes Somos?</h2>
                    <p>Somos una tienda especializada en ropa y accesorios, comprometidos con ofrecer productos de alta calidad a precios accesibles.</p>
                </section>

                <section className="about-section">
                    <h2>Proceso de Compra</h2>
                    <div className="process-steps">
                        <div className="step">
                            <h3>1. Selecciona tus productos</h3>
                            <p>Explora nuestro catálogo y agrega los productos que desees al carrito.</p>
                        </div>
                        <div className="step">
                            <h3>2. Confirma tu pedido</h3>
                            <p>Revisa tu carrito y confirma los productos seleccionados.</p>
                        </div>
                        <div className="step">
                            <h3>3. Entrega</h3>
                            <p>Recibirás tu pedido en la dirección indicada y pagarás al momento de la entrega.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Política de Devoluciones</h2>
                    <p>Aceptamos devoluciones dentro de los primeros 7 días después de la entrega. El producto debe estar en su estado original y sin usar.</p>
                </section>
            </div>
        </div>
    );
}