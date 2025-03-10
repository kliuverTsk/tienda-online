import { useContext, useState } from 'react';
import { CarritoContext } from '../../context/context';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './carrito.css';

export function Carrito() {
    const { carrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito } = useContext(CarritoContext);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        direccion: '',
        comentarios: ''
    });

    const validateForm = () => {
        if (!formData.nombre.trim()) {
            toast.error('Por favor ingresa tu nombre');
            return false;
        }
        if (!formData.telefono.trim()) {
            toast.error('Por favor ingresa tu teléfono');
            return false;
        }
        if (!formData.direccion.trim()) {
            toast.error('Por favor ingresa tu dirección');
            return false;
        }
        return true;
    };

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEliminar = (id, color, talla) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
            eliminarDelCarrito(id, color, talla);
            toast.info('Producto eliminado del carrito', {
                icon: '🗑️'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        if (window.confirm('¿Estás seguro de enviar el pedido? Verifica que todos los datos sean correctos.')) {
            const mensaje = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${carrito.map(item => 
                `- ${item.nombre}\n` +
                `  Cantidad: ${item.cantidad}\n` +
                `  Color: ${item.colorSeleccionado || 'No especificado'}\n` +
                `  Talla: ${item.tallaSeleccionada || 'No especificada'}\n` +
                `  Precio unitario: $${item.precio}\n` +
                `  Subtotal: $${(item.precio * item.cantidad).toFixed(2)}`
            ).join('\n\n')}\n\n` +
            `Total del pedido: $${total.toFixed(2)}\n\n` +
            `Datos de envío:\n` +
            `Nombre: ${formData.nombre}\n` +
            `Teléfono: ${formData.telefono}\n` +
            `Dirección: ${formData.direccion}\n` +
            `Comentarios adicionales: ${formData.comentarios || 'Ninguno'}`;
    
            window.open(`https://wa.me/+5511949749057?text=${encodeURIComponent(mensaje)}`);
            limpiarCarrito();
            setShowForm(false);
            toast.success('¡Gracias por tu compra!', {
                description: 'Tu pedido ha sido enviado',
                icon: '✨'
            });
        }
    };

    if (carrito.length === 0) {
        return (
            <div className="carrito-vacio">
                <h2>Tu carrito está vacío</h2>
                <p>¡Agrega algunos productos!</p>
                <Link to="/">Ir a comprar</Link>
            </div>
        );
    }

    return (
        <div className="container-carrito">
            {carrito.map(item => (
                <div key={item.id} className="producto-in-carrito">
                    <div className="producto-in-carrito-img">
                        <img src={Array.isArray(item.imagenes) ? item.imagenes[0] : item.imagen} alt={item.nombre} />
                    </div>
                    <div className="producto-info">
                        <h4>{item.nombre}</h4>
                        <p>Color: {item.colorSeleccionado || 'No especificado'}</p>
                        <p>Talla: {item.tallaSeleccionada || 'No especificada'}</p>
                        <p>${item.precio}</p>
                    </div>
                    
                    <div className="botones-carrito">
                        <button onClick={() => actualizarCantidad(
                            item.id, 
                            item.colorSeleccionado, 
                            item.tallaSeleccionada, 
                            item.cantidad + 1
                        )}>
                            +
                        </button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => actualizarCantidad(
                            item.id, 
                            item.colorSeleccionado, 
                            item.tallaSeleccionada, 
                            item.cantidad - 1
                        )}>
                            -
                        </button>
                        <button 
                            onClick={() => handleEliminar(item.id, item.colorSeleccionado, item.tallaSeleccionada)}
                            className="delete-btn"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <div className="carrito-total">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button onClick={() => setShowForm(true)}>
                    Finalizar Compra
                </button>
            </div>

            {showForm && (
                <div className="form-overlay">
                    <div className="whatsapp-form">
                        <h3>Completa tus datos para el envío</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre completo"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Número de teléfono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="direccion"
                                placeholder="Dirección de envío"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="comentarios"
                                placeholder="Comentarios adicionales (opcional)"
                                value={formData.comentarios}
                                onChange={handleInputChange}
                            />
                            <div className="form-buttons">
                                <button type="button" onClick={() => setShowForm(false)}>
                                    Cancelar
                                </button>
                                <button type="submit">
                                    Enviar por WhatsApp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}