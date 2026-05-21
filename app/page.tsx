import { getAllPosts, getAllCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">My Blog</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Thoughts, stories and ideas from creative minds.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
            <PostCard post={featuredPost} featured />
          </section>
        )}

        {/* All Posts */}
        {restPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}