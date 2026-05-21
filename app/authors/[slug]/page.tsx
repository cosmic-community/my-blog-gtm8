// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);
  const name = getMetafieldValue(author.metadata?.name) || author.title;
  const bio = getMetafieldValue(author.metadata?.bio);
  const email = getMetafieldValue(author.metadata?.email);
  const website = getMetafieldValue(author.metadata?.website);
  const avatar = author.metadata?.avatar;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Author Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-12 pb-12 border-b border-gray-200">
        {avatar && (
          <img
            src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={name}
            width={150}
            height={150}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          {bio && <p className="text-lg text-gray-600 mb-4">{bio}</p>}
          <div className="flex flex-wrap gap-4 text-sm">
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-accent-600 hover:text-accent-700"
              >
                {email}
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 hover:text-accent-700"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Posts */}
      <h2 className="text-2xl font-bold mb-6">Posts by {name}</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
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