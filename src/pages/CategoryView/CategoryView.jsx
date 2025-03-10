import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';  // Agregamos este import

import './CategoryView.css';

export function CategoryView() {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoria } = useParams();

    const getCategoryTitle = () => {
        switch(categoria) {
            case 'gorras':
                return 'Gorras';
            case 'ropa-mujer':
                return 'Ropa Mujer';
            case 'ropa-hombre':
                return 'Ropa Hombre';
            default:
                return 'Productos';
        }
    };

    useEffect(() => {
        const getProductos = async () => {
            setIsLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const productosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const productosFiltrados = productosData.filter(producto => 
                    producto.categoria === categoria
                );
                setProductos(productosFiltrados);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getProductos();
    }, [categoria]);

    if (isLoading) {
        return <div className="loading">Cargando productos...</div>;
    }

    return (
        <div className="category-view">
            <h2>{getCategoryTitle()}</h2>
            {productos.length === 0 ? (
                <div className="no-products">
                    <p>No hay productos disponibles en esta categoría</p>
                </div>
            ) : (
                <div className="products-grid">
                    {productos.map(producto => (
                        <div key={producto.id} className="product-card">
                            <Link to={`/producto/${producto.id}`}>
                                <img 
                                    src={Array.isArray(producto.imagenes) ? producto.imagenes[0] : producto.imagen} 
                                    alt={producto.nombre} 
                                />
                                <div className="product-info">
                                    <h3>{producto.nombre}</h3>
                                    <p className="price">${producto.precio}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}