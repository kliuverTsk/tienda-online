const filtrarProductosPorCategoria = (productos, categoria) => {
        const categoriasSinPrefijo = categoria.replace('/categoria/', '');
        return productos.filter(producto => producto.categoria === categoriasSinPrefijo);
    };