import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageFade from '../components/PageFade'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import styles from './Shop.module.css'

export default function Shop() {
  const [params] = useSearchParams()
  const catParam = params.get('category') || 'All'
  const sortParam = params.get('sort') || 'featured'
  const [category, setCategory] = useState(catParam === 'All' ? 'All' : catParam)
  const [sort, setSort] = useState(sortParam)
  const [priceMax, setPriceMax] = useState(200)
  const [page, setPage] = useState(1)
  const perPage = 8
  const { addItem } = useCart()
  const { toast } = useToast()

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (category !== 'All') list = list.filter((p) => p.category === category)
    list = list.filter((p) => p.price <= priceMax)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'newest') list.reverse()
    return list
  }, [category, sort, priceMax])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const slice = filtered.slice((page - 1) * perPage, page * perPage)

  const onAdd = (p) => {
    addItem(p, 1)
    toast('Added to cart')
  }

  return (
    <PageFade>
      <div className={styles.page}>
        <h1 className={styles.title}>Shop</h1>
        <div className={styles.layout}>
          <aside className={styles.side}>
            <h2 className={styles.sideH}>Category</h2>
            {['All', 'Home', 'Kitchen', 'Carry', 'Bedding', 'Loungewear'].map((c) => (
              <button
                key={c}
                type="button"
                className={category === c ? styles.filterOn : styles.filter}
                onClick={() => {
                  setCategory(c)
                  setPage(1)
                }}
              >
                {c}
              </button>
            ))}
            <h2 className={styles.sideH}>Max price</h2>
            <input
              type="range"
              min="20"
              max="200"
              value={priceMax}
              onChange={(e) => {
                setPriceMax(+e.target.value)
                setPage(1)
              }}
              className={styles.range}
            />
            <p className={styles.rangeLab}>${priceMax}</p>
            <h2 className={styles.sideH}>Sort</h2>
            <select
              className={styles.select}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </aside>
          <div>
            <div className={styles.grid}>
              {slice.map((p) => (
                <ProductCard key={p.slug} product={p} onAdd={onAdd} />
              ))}
            </div>
            {pages > 1 && (
              <div className={styles.pager}>
                <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </button>
                <span>
                  {page} / {pages}
                </span>
                <button type="button" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageFade>
  )
}
