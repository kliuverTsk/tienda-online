import { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { CarritoContext } from '../../context/context';
import './productlist.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ProductList() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const { agregarAlCarrito } = useContext(CarritoContext);
    const productsPerPage = 8;

    const getProductos = async (isLoadingMore = false) => {
        try {
            let q;
            if (!isLoadingMore) {
                q = query(
                    collection(db, 'productos'),
                    orderBy('nombre'),
                    limit(productsPerPage)
                );
            } else {
                if (!lastDoc) return;
                q = query(
                    collection(db, 'productos'),
                    orderBy('nombre'),
                    startAfter(lastDoc),
                    limit(productsPerPage)
                );
            }

            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                setHasMore(false);
                return;
            }

            const productosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            
            if (!isLoadingMore) {
                setProductos(productosData);
            } else {
                setProductos(prev => [...prev, ...productosData]);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    const loadMore = () => {
        if (!loading && hasMore) {
            setLoading(true);
            getProductos(true);
        }
    };

    const handleAgregarAlCarrito = (producto) => {
        agregarAlCarrito({...producto, cantidad: 1});
        toast.success('¡Producto agregado!', {
            description: `${producto.nombre} - $${producto.precio}`,
            duration: 2000,
            icon: '🛍️'
        });
    };

    return (
        <div>
            <h1 className='products-title'>Productos</h1>
            <div className="product-grid">
                {productos.map(producto => (
                    <div key={producto.id} className="product-card">
                        <Link to={`/producto/${producto.id}`}>
                            <img 
                                src={producto.imagenes?.[0] || producto.imagen} 
                                alt={producto.nombre}
                                onError={(e) => {
                                    console.log('Error cargando imagen:', producto.imagenes?.[0]);
                                    e.target.src = 'ruta/a/imagen/por/defecto.jpg';
                                }}
                            />
                            <div className="product-info">
                                <h3>{producto.nombre}</h3>
                                <p className="price">${producto.precio}</p>
                            </div>
                        </Link>
                        <button 
                            className="add-to-cart"
                            onClick={() => handleAgregarAlCarrito(producto)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div className="load-more">
                    <button 
                        onClick={loadMore} 
                        disabled={loading}
                        className="load-more-button"
                    >
                        {loading ? 'Cargando...' : 'Cargar más productos'}
                    </button>
                </div>
            )}
        </div>
    );
}