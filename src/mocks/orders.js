export const orders = [
  {
    id: 1,
    buyerName: 'Estudio Andes',
    status: 'pagada',
    createdAt: '2026-08-01',
    total: 9900,
    items: [{ publicationId: 3, title: 'Cyberpunk Sample Pack', quantity: 1, price: 9900 }],
  },
  {
    id: 2,
    buyerName: 'Camila Soto',
    status: 'pagada',
    createdAt: '2026-08-03',
    total: 3500,
    items: [{ publicationId: 1, title: 'Kusushiki Remix', quantity: 1, price: 3500 }],
  },
  {
    id: 3,
    buyerName: 'Nova Wave',
    status: 'pagada',
    createdAt: '2026-08-06',
    total: 13400,
    items: [
      { publicationId: 3, title: 'Cyberpunk Sample Pack', quantity: 1, price: 9900 },
      { publicationId: 1, title: 'Kusushiki Remix', quantity: 1, price: 3500 },
    ],
  },
  {
    id: 4,
    buyerName: 'Bar La Batuta',
    status: 'pagada',
    createdAt: '2026-08-09',
    total: 3500,
    items: [{ publicationId: 2, title: 'Midnight Circuits', quantity: 1, price: 3500 }],
  },
]
