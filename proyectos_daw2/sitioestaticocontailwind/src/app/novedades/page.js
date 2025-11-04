import NovedadesCarousel from '../components/NovedadesCarousel';
import { products } from '../data/data.js';

function getNovedadesData() {
  const productEntries = Object.entries(products);
  const newItems = productEntries.filter(([slug, product]) =>
    product.ref.startsWith("REF. 4")
  );

  return newItems.map(([slug, product]) => ({
    slug,
    product,
    basePath: "mujer",
  }));
}

export default function NovedadesPage() {
  const items = getNovedadesData();

  return (
    <div className="w-full py-12 md:py-16">
      <h1 className="text-4xl font-bold text-center mb-10">Novedades</h1>
      <NovedadesCarousel items={items} />
    </div>
  );
}
