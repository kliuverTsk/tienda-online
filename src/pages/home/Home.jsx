import { Hero } from '../../components/Hero/Hero'
import { CategoriasList } from '../../components/Categories/categoriasList'
import { ProductList } from '../../components/producList/productList'

export function Home() {
    return (
        <>
            <Hero />
            <CategoriasList />
            <ProductList />
        </>
    )
}