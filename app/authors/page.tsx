import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic';
import Link from 'next/link';

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Authors</h1>

      {authors.length === 0 ? (
        <p className="text-gray-500">No authors available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => {
            const name = getMetafieldValue(author.metadata?.name) || author.title;
            const bio = getMetafieldValue(author.metadata?.bio);
            const avatar = author.metadata?.avatar;

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  {avatar && (
                    <img
                      src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <h2 className="text-xl font-bold">{name}</h2>
                </div>
                {bio && (
                  <p className="text-gray-600 text-sm line-clamp-3">{bio}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}