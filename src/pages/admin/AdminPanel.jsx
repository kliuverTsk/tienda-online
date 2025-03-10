import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './AdminPanel.css';

export function AdminPanel() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: '',
        imagenes: [''],
        categoria: '',
        marca: '',
        colores: [''],
        tallas: ['unico'],
        especificaciones: []
    });
    const agregarColor = () => {
        setNewProduct({
            ...newProduct,
            colores: [...newProduct.colores, '']
        });
    };
    
    const eliminarColor = (index) => {
        const nuevosColores = newProduct.colores.filter((_, i) => i !== index);
        setNewProduct({...newProduct, colores: nuevosColores});
    };
    
    const handleColorChange = (index, value) => {
        const nuevosColores = [...newProduct.colores];
        nuevosColores[index] = value;
        setNewProduct({...newProduct, colores: nuevosColores});
    };
    
    const agregarTalla = () => {
        setNewProduct({
            ...newProduct,
            tallas: [...newProduct.tallas, '']
        });
    };
    
    const eliminarTalla = (index) => {
        const nuevasTallas = newProduct.tallas.filter((_, i) => i !== index);
        setNewProduct({...newProduct, tallas: nuevasTallas});
    };
    
    const handleTallaChange = (index, value) => {
        const nuevasTallas = [...newProduct.tallas];
        nuevasTallas[index] = value;
        setNewProduct({...newProduct, tallas: nuevasTallas});
    };
    const handleImagenChange = (index, value) => {
        const nuevasImagenes = [...newProduct.imagenes];
        nuevasImagenes[index] = value;
        setNewProduct({...newProduct, imagenes: nuevasImagenes});
    };

    const agregarImagen = () => {
        setNewProduct({
            ...newProduct,
            imagenes: [...newProduct.imagenes, '']
        });
    };

    const eliminarImagen = (index) => {
        const nuevasImagenes = newProduct.imagenes.filter((_, i) => i !== index);
        setNewProduct({...newProduct, imagenes: nuevasImagenes});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'productos'), {
                nombre: newProduct.nombre,
                precio: Number(newProduct.precio),
                imagenes: newProduct.imagenes.filter(img => img !== ''),
                categoria: newProduct.categoria,
                marca: newProduct.marca,
                colores: newProduct.colores.filter(color => color !== ''),
                tallas: newProduct.tallas.filter(talla => talla !== ''),
                especificaciones: newProduct.especificaciones
            });
            
            setNewProduct({
                nombre: '',
                precio: '',
                imagenes: [''],
                categoria: '',
                marca: '',
                colores: [''],
                tallas: ['unico'],
                especificaciones: []
            });
            
            const querySnapshot = await getDocs(collection(db, 'productos'));
            const productosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosData);
            
            alert('Producto agregado con éxito');
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Error al agregar producto');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteDoc(doc(db, 'productos', productId));
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const productosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProductos(productosData);
                alert('Producto eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    // Eliminar el useEffect de checkAuth ya que ProtectedRoute ya maneja esto
    useEffect(() => {
        const getProductos = async () => {
            const querySnapshot = await getDocs(collection(db, 'productos'));
            const productosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosData);
        };
        getProductos();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
        }
    }, [user, navigate]);

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Panel de Administración</h2>
                <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </div>

            <div className="admin-content">
                <section className="add-product">
                    <h3>Añadir Nuevo Producto</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={newProduct.nombre}
                            onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            value={newProduct.precio}
                            onChange={(e) => setNewProduct({...newProduct, precio: e.target.value})}
                            required
                        />
                        
                        <div className="imagenes-container">
                            <h4>Imágenes del producto</h4>
                            {newProduct.imagenes.map((imagen, index) => (
                                <div key={index} className="imagen-input">
                                    <input
                                        type="text"
                                        placeholder={`URL de la imagen ${index + 1}`}
                                        value={imagen}
                                        onChange={(e) => handleImagenChange(index, e.target.value)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button 
                                            type="button" 
                                            onClick={() => eliminarImagen(index)}
                                            className="delete-btn"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={agregarImagen}
                                className="add-btn"
                            >
                                Añadir otra imagen
                            </button>
                        </div>
                        <select
                            value={newProduct.categoria}
                            onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="gorras">Gorras</option>
                            <option value="ropa-mujer">Ropa Mujer</option>
                            <option value="ropa-hombre">Ropa Hombre</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Marca"
                            value={newProduct.marca}
                            onChange={(e) => setNewProduct({...newProduct, marca: e.target.value})}
                            required
                        />
                        <div className="colores-container">
                            <h4>Colores disponibles</h4>
                            {newProduct.colores.map((color, index) => (
                                <div key={index} className="color-input">
                                    <input
                                        type="text"
                                        placeholder={`Color ${index + 1}`}
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button 
                                            type="button" 
                                            onClick={() => eliminarColor(index)}
                                            className="delete-btn"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={agregarColor}
                                className="add-btn"
                            >
                                Añadir otro color
                            </button>
                        </div>
                        <div className="tallas-container">
                            <h4>Tallas disponibles</h4>
                            {newProduct.tallas.map((talla, index) => (
                                <div key={index} className="talla-input">
                                    <input
                                        type="text"
                                        placeholder={`Talla ${index + 1}`}
                                        value={talla}
                                        onChange={(e) => handleTallaChange(index, e.target.value)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button 
                                            type="button" 
                                            onClick={() => eliminarTalla(index)}
                                            className="delete-btn"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={agregarTalla}
                                className="add-btn"
                            >
                                Añadir otra talla
                            </button>
                        </div>
                        <textarea
                            placeholder="Especificaciones (una por línea)"
                            value={newProduct.especificaciones.join('\n')}
                            onChange={(e) => setNewProduct({
                                ...newProduct,
                                especificaciones: e.target.value.split('\n').filter(spec => spec.trim() !== '')
                            })}
                        />
                        <button type="submit" className="submit-btn">Añadir Producto</button>
                    </form>
                </section>

                <section className="product-list">
                    <h3>Lista de Productos</h3>
                    <div className="products-grid">
                        {productos.map(producto => (
                            <div key={producto.id} className="product-item">
                                <img src={Array.isArray(producto.imagenes) ? producto.imagenes[0] : producto.imagen} alt={producto.nombre} />
                                <h4>{producto.nombre}</h4>
                                <p>${producto.precio}</p>
                                <p>Categoría: {producto.categoria}</p>
                                <p>Marca: {producto.marca}</p>
                                <p>Colores: {Array.isArray(producto.colores) ? producto.colores.join(', ') : producto.color}</p>
                                <p>Tallas: {Array.isArray(producto.tallas) ? producto.tallas.join(', ') : producto.talla}</p>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(producto.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}