// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 pb-8 border-b border-gray-200">
        <div className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-3">
          Category
        </div>
        <h1 className="text-4xl font-bold mb-3">{name}</h1>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}