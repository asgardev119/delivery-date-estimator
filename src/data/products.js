export const products = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  inStock: Math.random() < 0.8, // 80% chance of being in stock
  price: Math.floor(Math.random() * 1000) + 100,
}));
