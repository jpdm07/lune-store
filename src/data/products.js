/**
 * Product imagery: Unsplash (https://unsplash.com/license).
 * Each photo is chosen to match the product name; a light warm filter is applied in CSS for a cohesive LUNE palette.
 */
const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const PRODUCTS = [
  {
    id: 'p1',
    slug: 'linen-tote',
    name: 'Linen Tote',
    price: 38,
    category: 'Carry',
    description:
      'Natural undyed linen with double-stitched handles. Light enough for daily carry, strong enough for market runs.',
    materials:
      '100% European flax linen. Spot clean; cold wash separately when needed. Line dry.',
    images: [u('photo-1709303014108-5d988f63864f'), u('photo-1698834318982-f9c5b35dc90a')],
    stock: 40,
  },
  {
    id: 'p2',
    slug: 'cotton-throw',
    name: 'Cotton Throw',
    price: 62,
    category: 'Bedding',
    description: 'Woven cotton in a soft herringbone. Oatmeal tone, generous drape for sofa or bed.',
    materials: '100% cotton. Machine wash cold, tumble low.',
    images: [u('photo-1598622444660-9d76ceeb7daf'), u('photo-1620832401018-30259b006ffe')],
    stock: 55,
  },
  {
    id: 'p3',
    slug: 'ceramic-mug',
    name: 'Ceramic Mug',
    price: 24,
    category: 'Kitchen',
    description: 'Hand-finished stoneware with a matte glaze. Holds 12 oz; comfortable lip and handle.',
    materials: 'Stoneware, food-safe glaze. Dishwasher safe; microwave safe.',
    images: [u('photo-1514228742587-6b1558fcca3d'), u('photo-1612285761051-d5eef9e88e86')],
    stock: 120,
  },
  {
    id: 'p4',
    slug: 'wool-blanket',
    name: 'Wool Blanket',
    price: 95,
    category: 'Bedding',
    description: 'Merino wool in an earthy sand tone with a subtle fringe edge. Warm without weight.',
    materials: '100% merino wool. Dry clean recommended.',
    images: [u('photo-1638431110087-80c185015f94'), u('photo-1629301203564-850c7d40f46e')],
    stock: 28,
  },
  {
    id: 'p5',
    slug: 'linen-pillowcase-set',
    name: 'Linen Pillowcase Set',
    price: 58,
    category: 'Bedding',
    description: 'Two pillowcases in stonewashed linen. Natural tone, breathable for sleep.',
    materials: '100% linen. Machine wash cold, tumble low.',
    images: [u('photo-1609587611471-be23d7344d81'), u('photo-1721073956820-644a71ba075e')],
    stock: 44,
  },
  {
    id: 'p6',
    slug: 'ceramic-dinner-plate',
    name: 'Ceramic Dinner Plate',
    price: 32,
    category: 'Kitchen',
    description: 'Matte white with subtle texture. Stackable, everyday dinnerware.',
    materials: 'Stoneware. Dishwasher and microwave safe.',
    images: [u('photo-1623682522867-ef176aa9c883'), u('photo-1591632288574-a387f820a1ca')],
    stock: 80,
  },
  {
    id: 'p7',
    slug: 'linen-napkin-set',
    name: 'Linen Napkin Set',
    price: 44,
    category: 'Kitchen',
    description: 'Set of four napkins with a minimalist hem. Natural linen.',
    materials: '100% linen. Machine wash cold.',
    images: [u('photo-1596433904500-97b901c5d274'), u('photo-1705290304352-4beef0b626b3')],
    stock: 60,
  },
  {
    id: 'p8',
    slug: 'beeswax-candle',
    name: 'Beeswax Candle',
    price: 28,
    category: 'Home',
    description: 'Unscented beeswax, cotton wick. ~40 hour burn, soft honeyed glow.',
    materials: 'Pure beeswax, cotton wick. Trim wick to ¼" before each use.',
    images: [u('photo-1608571423902-eed4a5ad8108'), u('photo-1582735689369-4fe89db7114c')],
    stock: 90,
  },
  {
    id: 'p9',
    slug: 'ceramic-vase',
    name: 'Ceramic Vase',
    price: 48,
    category: 'Home',
    description: 'Organic silhouette with matte terracotta glaze. Sized for a small bouquet.',
    materials: 'Stoneware. Wipe clean; not dishwasher recommended.',
    images: [u('photo-1660958639203-cbc9bb56955b'), u('photo-1584515453937-c00929e621d1')],
    stock: 35,
  },
  {
    id: 'p10',
    slug: 'cotton-robe',
    name: 'Cotton Robe',
    price: 88,
    category: 'Bedding',
    description: 'Waffle knit cotton robe with belt tie. One size, natural undyed tone.',
    materials: '100% cotton. Machine wash cold, tumble low.',
    images: [u('photo-1770294759101-fae1377d4d34'), u('photo-1645828258540-4bdc95e904cc')],
    stock: 22,
  },
  {
    id: 'p11',
    slug: 'woven-market-bag',
    name: 'Woven Market Bag',
    price: 42,
    category: 'Carry',
    description: 'Seagrass weave with leather handles. Structured base, farmers-market ready.',
    materials: 'Seagrass, leather handles. Wipe clean; avoid prolonged moisture.',
    images: [u('photo-1759150307882-329480e1384f'), u('photo-1627202626612-1e304a201b32')],
    stock: 38,
  },
  {
    id: 'p12',
    slug: 'linen-table-runner',
    name: 'Linen Table Runner',
    price: 36,
    category: 'Kitchen',
    description: '14 × 72 inches, stonewashed linen with fringe ends.',
    materials: '100% linen. Machine wash cold, line dry preferred.',
    images: [u('photo-1762539747176-5d8f166346de'), u('photo-1758810744738-6eebece715a9')],
    stock: 48,
  },
]

export const COLLECTIONS = [
  { slug: 'home', title: 'Home Essentials', filter: 'Home', image: u('photo-1633169761411-c28abf790f98') },
  { slug: 'kitchen', title: 'Kitchen & Table', filter: 'Kitchen', image: u('photo-1545874239-30867bd8f206') },
  { slug: 'carry', title: 'Carry', filter: 'Carry', image: u('photo-1709303014108-5d988f63864f') },
  { slug: 'bedding', title: 'Bedding & Bath', filter: 'Bedding', image: u('photo-1721073956820-644a71ba075e') },
]

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelated(slug, n = 4) {
  const p = getProductBySlug(slug)
  if (!p) return PRODUCTS.slice(0, n)
  return PRODUCTS.filter((x) => x.slug !== slug && x.category === p.category).slice(0, n).length
    ? PRODUCTS.filter((x) => x.slug !== slug && x.category === p.category).slice(0, n)
    : PRODUCTS.filter((x) => x.slug !== slug).slice(0, n)
}
