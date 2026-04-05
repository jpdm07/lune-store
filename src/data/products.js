/**
 * Product imagery: Unsplash (https://unsplash.com/license).
 * Each photo is chosen to match the product name; a light warm filter is applied in CSS for a cohesive LUNE palette.
 *
 * Optional `specs`: label/value rows shown on the PDP (dimensions, contents, capacity, etc.).
 */
const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/**
 * Fabric color options — `hex` drives the round swatch on the product page.
 * (Concept SKUs; imagery stays the same per product.)
 */
export const FABRIC_COLORS = [
  { id: 'natural', label: 'Natural', hex: '#e8dfd4' },
  { id: 'oat', label: 'Oat', hex: '#d4c4b0' },
  { id: 'stone', label: 'Stone', hex: '#9c948a' },
  { id: 'sage', label: 'Sage', hex: '#8a9a88' },
  { id: 'midnight', label: 'Midnight', hex: '#2c3540' },
]

export const COTTON_THROW_COLORS = [...FABRIC_COLORS, { id: 'mauve', label: 'Mauve', hex: '#b89ca8' }]

/** Linen tote hero — same URL as Linen Tote PDP; Carry tile + woven bag first image. */
const LINEN_TOTE_COVER = u('photo-1535981444082-2a5dc0548ef3')

/**
 * When set, selecting a color updates the PDP image to this index (0-based).
 * Colors omitted here fall back to `defaultColorImageIndex` or 0.
 */
export function getImageIndexForColor(product, colorId) {
  const map = product.colorToImage
  if (!map || typeof map !== 'object') return product.defaultColorImageIndex ?? 0
  if (Object.prototype.hasOwnProperty.call(map, colorId)) {
    const idx = map[colorId]
    if (typeof idx === 'number' && idx >= 0 && idx < product.images.length) return idx
  }
  return product.defaultColorImageIndex ?? 0
}

export const PRODUCTS = [
  {
    id: 'p1',
    slug: 'linen-tote',
    name: 'Linen Tote',
    price: 38,
    category: 'Carry',
    colors: FABRIC_COLORS,
    description:
      'Natural undyed linen with double-stitched handles. Light enough for daily carry, strong enough for market runs.',
    materials:
      '100% European flax linen. Spot clean; cold wash separately when needed. Line dry.',
    images: [LINEN_TOTE_COVER],
    specs: [
      { label: 'Dimensions', value: '15" W × 16" H × 5" D (38 × 41 × 13 cm)' },
      { label: 'Handle drop', value: 'Approx. 11" (28 cm)' },
      { label: 'Weight (empty)', value: 'Approx. 8 oz (230 g)' },
      { label: 'Origin', value: 'Designed in the U.S.; sewn in Portugal' },
    ],
    stock: 40,
  },
  {
    id: 'p2',
    slug: 'cotton-throw',
    name: 'Cotton Throw',
    price: 62,
    category: 'Bedding',
    colors: COTTON_THROW_COLORS,
    description: 'Woven cotton in a soft herringbone. Oatmeal tone, generous drape for sofa or bed.',
    materials: '100% cotton. Machine wash cold, tumble low.',
    images: [u('photo-1620832401018-30259b006ffe'), u('photo-1598622444660-9d76ceeb7daf')],
    colorToImage: { natural: 0, mauve: 1 },
    specs: [
      { label: 'Dimensions', value: '50" × 70" (127 × 178 cm)' },
      { label: 'Weight', value: 'Approx. 2.8 lb (1.3 kg)' },
      { label: 'Contents', value: 'One throw' },
    ],
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
    specs: [
      { label: 'Capacity', value: '12 fl oz (355 ml)' },
      { label: 'Dimensions', value: 'Approx. 3.5" H × 3.25" dia (9 × 8.3 cm)' },
      { label: 'Contents', value: 'One mug' },
    ],
    stock: 120,
  },
  {
    id: 'p4',
    slug: 'wool-blanket',
    name: 'Wool Blanket',
    price: 95,
    category: 'Bedding',
    colors: FABRIC_COLORS,
    description: 'Merino wool in an earthy sand tone with a subtle fringe edge. Warm without weight.',
    materials: '100% merino wool. Dry clean recommended.',
    images: [u('photo-1638431110087-80c185015f94')],
    specs: [
      { label: 'Dimensions', value: '60" × 80" (152 × 203 cm)' },
      { label: 'Weight', value: 'Approx. 2.5 lb (1.1 kg)' },
      { label: 'Contents', value: 'One blanket' },
    ],
    stock: 28,
  },
  {
    id: 'p5',
    slug: 'linen-pillowcase-set',
    name: 'Linen Pillowcase Set',
    price: 58,
    category: 'Bedding',
    colors: FABRIC_COLORS,
    description: 'Two pillowcases in stonewashed linen. Natural tone, breathable for sleep.',
    materials: '100% linen. Machine wash cold, tumble low.',
    images: [u('photo-1609587611471-be23d7344d81'), u('photo-1721073956820-644a71ba075e')],
    colorToImage: { midnight: 0, natural: 1 },
    defaultColorImageIndex: 0,
    specs: [
      { label: 'Includes', value: '2 pillowcases' },
      { label: 'Fits pillows up to', value: '20" × 30" (51 × 76 cm) — standard / queen' },
      { label: 'Closure', value: 'Envelope opening' },
    ],
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
    images: [u('photo-1591632288574-a387f820a1ca'), u('photo-1623682522867-ef176aa9c883')],
    specs: [
      { label: 'Diameter', value: '10.5" (27 cm)' },
      { label: 'Height', value: 'Approx. 1" (2.5 cm)' },
      { label: 'Contents', value: 'One plate' },
    ],
    stock: 80,
  },
  {
    id: 'p7',
    slug: 'linen-napkin-set',
    name: 'Linen Napkin Set',
    price: 44,
    category: 'Kitchen',
    colors: FABRIC_COLORS,
    description: 'Set of four napkins with a minimalist hem. Natural linen.',
    materials: '100% linen. Machine wash cold.',
    images: [u('photo-1596433904500-97b901c5d274'), u('photo-1705290304352-4beef0b626b3')],
    colorToImage: { oat: 1 },
    specs: [
      { label: 'Includes', value: '4 napkins' },
      { label: 'Each napkin', value: '18" × 18" (46 × 46 cm)' },
      { label: 'Hem', value: 'Mitered corners, narrow hem' },
    ],
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
    images: [u('photo-1771911434558-6b85496cf608')],
    specs: [
      { label: 'Dimensions', value: 'Approx. 3" dia × 4" H (7.6 × 10 cm) pillar' },
      { label: 'Burn time', value: 'Up to ~40 hours (varies with draft & trim)' },
      { label: 'Scent', value: 'Unscented (natural beeswax note only)' },
      { label: 'Wick', value: '100% cotton, lead-free' },
      { label: 'Contents', value: 'One candle' },
    ],
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
    specs: [
      { label: 'Height', value: 'Approx. 8" (20 cm)' },
      { label: 'Opening', value: 'Approx. 4" (10 cm) diameter' },
      { label: 'Contents', value: 'One vase' },
    ],
    stock: 35,
  },
  {
    id: 'p10',
    slug: 'cotton-robe',
    name: 'Cotton Robe',
    price: 88,
    category: 'Loungewear',
    colors: FABRIC_COLORS,
    description: 'Waffle knit cotton robe with belt tie. One size, natural undyed tone.',
    materials: '100% cotton. Machine wash cold, tumble low.',
    images: [
      u('photo-1645828258540-4bdc95e904cc'),
      u('photo-1759221778500-84537e318452'),
    ],
    specs: [
      { label: 'Fit', value: "One size — best for women's S–L / men's S–M" },
      { label: 'Length', value: 'Approx. 48" (122 cm) from shoulder' },
      { label: 'Features', value: 'Attached belt, patch pockets, waffle knit' },
      { label: 'Contents', value: 'One robe' },
    ],
    stock: 22,
  },
  {
    id: 'p11',
    slug: 'woven-market-bag',
    name: 'Woven Market Bag',
    price: 42,
    category: 'Carry',
    colors: FABRIC_COLORS,
    description: 'Seagrass weave with leather handles. Structured base, farmers-market ready.',
    materials: 'Seagrass, leather handles. Wipe clean; avoid prolonged moisture.',
    images: [LINEN_TOTE_COVER, u('photo-1627202626612-1e304a201b32')],
    specs: [
      { label: 'Dimensions', value: '16" W × 12" H × 7" D (41 × 30 × 18 cm) body' },
      { label: 'Handle drop', value: 'Approx. 9" (23 cm)' },
      { label: 'Contents', value: 'One bag' },
    ],
    stock: 38,
  },
  {
    id: 'p12',
    slug: 'linen-table-runner',
    name: 'Linen Table Runner',
    price: 36,
    category: 'Kitchen',
    colors: FABRIC_COLORS,
    description: '14 × 72 inches, stonewashed linen with fringe ends.',
    materials: '100% linen. Machine wash cold, line dry preferred.',
    images: [u('photo-1762539747176-5d8f166346de'), u('photo-1758810744738-6eebece715a9')],
    colorToImage: { stone: 0, sage: 1 },
    defaultColorImageIndex: 0,
    specs: [
      { label: 'Dimensions', value: '14" W × 72" L (36 × 183 cm)' },
      { label: 'Fringe', value: 'Approx. 1" at each end' },
      { label: 'Contents', value: 'One runner' },
    ],
    stock: 48,
  },
]

export const COLLECTIONS = [
  { slug: 'home', title: 'Home Essentials', filter: 'Home', image: u('photo-1633169761411-c28abf790f98') },
  { slug: 'kitchen', title: 'Kitchen & Table', filter: 'Kitchen', image: u('photo-1545874239-30867bd8f206') },
  {
    slug: 'carry',
    title: 'Carry',
    filter: 'Carry',
    image: PRODUCTS.find((p) => p.slug === 'linen-tote').images[0],
  },
  { slug: 'bedding', title: 'Bedding & Bath', filter: 'Bedding', image: u('photo-1721073956820-644a71ba075e') },
  {
    slug: 'loungewear',
    title: 'Loungewear',
    filter: 'Loungewear',
    image: u('photo-1645828258540-4bdc95e904cc'),
  },
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
