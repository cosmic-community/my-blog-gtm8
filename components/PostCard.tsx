import Link from 'next/link';
import { Post } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const title = getMetafieldValue(post.metadata?.title) || post.title;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const featuredImage = post.metadata?.featured_image;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  if (featured) {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className="block group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {featuredImage && (
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt={title}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-8 flex flex-col justify-center">
            {category && (
              <span className="inline-block self-start px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium mb-3">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-600 transition-colors">
              {title}
            </h3>
            {excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
            )}
            {author && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(author.metadata?.name) || author.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span>{getMetafieldValue(author.metadata?.name) || author.title}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      {featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="inline-block px-2 py-1 bg-accent-100 text-accent-700 rounded text-xs font-medium mb-2">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </span>
        )}
        <h3 className="text-lg font-bold mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{excerpt}</p>
        )}
        {author && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{getMetafieldValue(author.metadata?.name) || author.title}</span>
          </div>
        )}
      </div>
    </Link>
  );
}