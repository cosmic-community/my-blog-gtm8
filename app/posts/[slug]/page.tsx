// app/posts/[slug]/page.tsx
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const content = getMetafieldValue(post.metadata?.content);
  const tags = getMetafieldValue(post.metadata?.tags);
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Category */}
      {category && (
        <Link
          href={`/categories/${category.slug}`}
          className="inline-block mb-4 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium hover:bg-accent-200 transition-colors"
        >
          {getMetafieldValue(category.metadata?.name) || category.title}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        {title}
      </h1>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-xl text-gray-600 mb-8">{excerpt}</p>
      )}

      {/* Author */}
      {author && (
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={getMetafieldValue(author.metadata?.name) || author.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <Link
              href={`/authors/${author.slug}`}
              className="font-medium text-gray-900 hover:text-accent-600 transition-colors"
            >
              {getMetafieldValue(author.metadata?.name) || author.title}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      )}

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={title}
          width={800}
          height={450}
          className="w-full rounded-lg mb-8"
        />
      )}

      {/* Content */}
      {content && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Tags */}
      {tags && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}