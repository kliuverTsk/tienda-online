import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

// Crear el contexto
export const CarritoContext = createContext();

// Crear el provider
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const savedCart = localStorage.getItem('carrito');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            const existeProducto = prevCarrito.find(item => 
                item.id === producto.id && 
                item.colorSeleccionado === producto.colorSeleccionado && 
                item.tallaSeleccionada === producto.tallaSeleccionada
            );

            if (existeProducto) {
                toast.success('Se actualizó la cantidad del producto');
                return prevCarrito.map(item =>
                    item.id === producto.id &&
                    item.colorSeleccionado === producto.colorSeleccionado &&
                    item.tallaSeleccionada === producto.tallaSeleccionada
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            toast.success('Producto agregado al carrito');
            return [...prevCarrito, producto];
        });
    };

    const eliminarDelCarrito = (id, color, talla) => {
        setCarrito(prevCarrito => {
            const resultado = prevCarrito.filter(item => 
                !(item.id === id && 
                item.colorSeleccionado === color && 
                item.tallaSeleccionada === talla)
            );
            toast.info('Producto eliminado del carrito');
            return resultado;
        });
    };

    const actualizarCantidad = (id, color, talla, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        
        setCarrito(prevCarrito =>
            prevCarrito.map(item =>
                item.id === id &&
                item.colorSeleccionado === color &&
                item.tallaSeleccionada === talla
                    ? { ...item, cantidad: nuevaCantidad }
                    : item
            )
        );
        toast.success('Cantidad actualizada');
    };

    const getTotalItems = () => {
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            actualizarCantidad,
            getTotalItems
        }}>
            {children}
        </CarritoContext.Provider>
    );
}