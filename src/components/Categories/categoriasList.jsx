import './CategoriasList.css'
import { Link } from 'react-router-dom'

export function CategoriasList() {
  return (
    <section className="categories" id="categories">
      <h2 className="categories-title">Nuestras Categorías</h2>
      <div className="categories-container">
        <div className="categories-grid">
          <div className="category-card">
            <Link to="/categoria/gorras">
              <img src="/img/categories/img1.svg" alt="Gorras" />
            </Link>
          </div>
          <div className="category-card">
            <Link to="/categoria/ropa-mujer">
              <img src="/img/categories/img1.svg" alt="Ropa Mujer" />
            </Link>
          </div>
          <div className="category-card">
            <Link to="/categoria/ropa-hombre">
              <img src="/img/categories/img1.svg" alt="Ropa Hombre" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
