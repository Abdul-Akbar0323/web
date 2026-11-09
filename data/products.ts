export interface Product {
  id: string
  name: string
  category: string
  price: number
  discountPrice?: number
  colors: Color[]
  sizes: Size[]
  material: string
  description: string
  rating: number
  availability: 'in-stock' | 'low-stock' | 'out-of-stock'
  images: string[]
}

export interface Color {
  name: string
  hex: string
  image?: string
}

export interface Size {
  label: string
  available: boolean
}

export const products: Product[] = [
  {
    id: 'lux-001',
    name: 'Cashmere Noir Overcoat',
    category: 'Outerwear',
    price: 1299,
    discountPrice: 999,
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Charcoal Grey', hex: '#4a4a4a' },
      { name: 'Navy Blue', hex: '#1e3a5f' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: '100% Pure Cashmere',
    description: 'A timeless overcoat crafted from the finest Italian cashmere. Features minimalist design with precision tailoring for the modern professional.',
    rating: 4.9,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
  },
  {
    id: 'lux-002',
    name: 'Silk Minimalist Blazer',
    category: 'Blazers',
    price: 899,
    colors: [
      { name: 'Ivory White', hex: '#f5f5f0' },
      { name: 'Stone Beige', hex: '#d4c5b9' },
      { name: 'Deep Black', hex: '#000000' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: 'Premium Silk Blend',
    description: 'Contemporary blazer with clean lines and sophisticated drape. Perfect for elevated everyday elegance.',
    rating: 4.8,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
      'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80',
    ],
  },
  {
    id: 'lux-003',
    name: 'Merino Wool Turtleneck',
    category: 'Knitwear',
    price: 349,
    colors: [
      { name: 'Cream', hex: '#f0ead6' },
      { name: 'Camel', hex: '#c19a6b' },
      { name: 'Forest Green', hex: '#2d5016' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: 'Extra Fine Merino Wool',
    description: 'Luxuriously soft turtleneck knit from the finest merino wool. Exceptional warmth with breathable comfort.',
    rating: 4.9,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    ],
  },
  {
    id: 'lux-004',
    name: 'Italian Leather Trench',
    category: 'Outerwear',
    price: 2499,
    discountPrice: 1899,
    colors: [
      { name: 'Cognac Brown', hex: '#8b4513' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: 'Full-Grain Italian Leather',
    description: 'Statement trench coat crafted from premium Italian leather. Features double-breasted design and timeless silhouette.',
    rating: 5.0,
    availability: 'low-stock',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1548625149-720134d51a3a?w=800&q=80',
    ],
  },
  {
    id: 'lux-005',
    name: 'Tailored Wool Trousers',
    category: 'Trousers',
    price: 449,
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Olive', hex: '#556b2f' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: 'Virgin Wool',
    description: 'Impeccably tailored trousers with modern slim fit. Precision craftsmanship meets contemporary styling.',
    rating: 4.7,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
  },
  {
    id: 'lux-006',
    name: 'Cashmere Cardigan',
    category: 'Knitwear',
    price: 599,
    colors: [
      { name: 'Oatmeal', hex: '#e8dcc5' },
      { name: 'Slate Grey', hex: '#708090' },
      { name: 'Rust', hex: '#b7410e' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: 'Pure Cashmere',
    description: 'Classic cardigan knit from premium cashmere. Timeless design with modern proportions for effortless layering.',
    rating: 4.8,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80',
    ],
  },
  {
    id: 'lux-007',
    name: 'Premium Cotton Shirt',
    category: 'Shirts',
    price: 249,
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Sky Blue', hex: '#87ceeb' },
      { name: 'Soft Pink', hex: '#f4c2c2' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: '100% Egyptian Cotton',
    description: 'Essential dress shirt crafted from the finest Egyptian cotton. Exceptional comfort with refined elegance.',
    rating: 4.6,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
  },
  {
    id: 'lux-008',
    name: 'Luxury Down Puffer',
    category: 'Outerwear',
    price: 799,
    colors: [
      { name: 'Matte Black', hex: '#28282b' },
      { name: 'Forest Green', hex: '#228b22' },
      { name: 'Navy', hex: '#000080' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: 'Recycled Nylon, Down Fill',
    description: 'Contemporary puffer jacket with premium down insulation. Sustainable materials meet modern design.',
    rating: 4.7,
    availability: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1548883354-61f1c7e1d1e3?w=800&q=80',
      'https://images.unsplash.com/photo-1608224547532-c3d7a96c333b?w=800&q=80',
    ],
  },
]
