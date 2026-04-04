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
    images: [u('photo-1590874103328-eac38a683ce7'), u('photo-1597484661647-d376173c0bba')],
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
    images: [u('photo-1580301762395-5bec2616d0b6'), u('photo-1555041469-a586c61ea9bc')],
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
    images: [u('photo-1514228742587-6b1558fcca3d'), u('photo-1577937927133-6688b3b3c2c3')],
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
    images: [u('photo-1555041469-a586c61ea9bc'), u('photo-1617103996329-9e656bd82f8e')],
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
    images: [u('photo-1631049035639-63935523a78a'), u('photo-1522771739844-6a9f6d5f14af')],
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
    images: [u('photo-1610701596007-11502818a0e9'), u('photo-1578749556568-bc2b40b68d48')],
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
    images: [u('photo-1556910103-1c02745a30bf'), u('photo-1603199506016-b9a594b593c0')],
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
    images: [u('photo-1602605634572-27c0635c4ecd'), u('photo-1602874804370-7f928fc9db5b')],
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
    images: [u('photo-1578500494197-246c612b07cb'), u('photo-1612196808240-5884a6482847')],
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
    images: [u('photo-1620799140408-ed534d64d0b5'), u('photo-1631217868264-e5b90bb7e133')],
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
    images: [u('photo-1597484661647-d376173c0bba'), u('photo-1590874103328-eac38a683ce7')],
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
    images: [u('photo-1506368083636-6defb6d8e85e'), u('photo-1556910103-1c02745a30bf')],
    stock: 48,
  },
]

export const COLLECTIONS = [
  { slug: 'home', title: 'Home Essentials', filter: 'Home', image: u('photo-1600210492493-0946911123ea') },
  { slug: 'kitchen', title: 'Kitchen & Table', filter: 'Kitchen', image: u('photo-1556910103-1c02745a30bf') },
  { slug: 'carry', title: 'Carry', filter: 'Carry', image: u('photo-1590874103328-eac38a683ce7') },
  { slug: 'bedding', title: 'Bedding & Bath', filter: 'Bedding', image: u('photo-1580301762395-5bec2616d0b6') },
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
