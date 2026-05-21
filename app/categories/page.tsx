import { getAllCategories, getMetafieldValue } from '@/lib/cosmic';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title;
            const description = getMetafieldValue(category.metadata?.description);

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-accent-500 transition-all"
              >
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                {description && (
                  <p className="text-gray-600 text-sm">{description}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}