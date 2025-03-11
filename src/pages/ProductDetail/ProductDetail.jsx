import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';  // Esta línea ya está correcta
import { CarritoContext } from '../../context/context';
import './ProductDetail.css';

export function ProductDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedTalla, setSelectedTalla] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        const getProducto = async () => {
            const docRef = doc(db, 'productos', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() });
            }
        };
        getProducto();
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedTalla) {
            alert('Por favor selecciona un color y una talla');
            return;
        }
        agregarAlCarrito({
            ...producto,
            colorSeleccionado: selectedColor,
            tallaSeleccionada: selectedTalla,
            cantidad: 1
        });
    };

    return (
        <div className="product-detail-container">
            <div className="product-images">
                <div className="main-image">
                    <img src={producto.imagenes[currentImageIndex]} alt={producto.nombre} />
                </div>
                <div className="thumbnail-container">
                    {producto.imagenes.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${producto.nombre} ${index + 1}`}
                            onClick={() => setCurrentImageIndex(index)}
                            className={currentImageIndex === index ? 'active' : ''}
                        />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <h1>{producto.nombre}</h1>
                <p className="price">${producto.precio}</p>
                <p className="marca">Marca: {producto.marca}</p>

                <div className="color-selector">
                    <h3>Colores disponibles:</h3>
                    <div className="color-options">
                        {producto.colores.map((color, index) => (
                            <button
                                key={index}
                                className={selectedColor === color ? 'selected' : ''}
                                onClick={() => setSelectedColor(color)}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="talla-selector">
                    <h3>Tallas disponibles:</h3>
                    <div className="size-options">
                        {producto.tallas.map((talla, index) => (
                            <button
                                key={index}
                                className={selectedTalla === talla ? 'selected' : ''}
                                onClick={() => setSelectedTalla(talla)}
                            >
                                {talla}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="especificaciones">
                    <h3>Especificaciones:</h3>
                    <ul>
                        {producto.especificaciones.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>

                <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={!selectedColor || !selectedTalla}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}