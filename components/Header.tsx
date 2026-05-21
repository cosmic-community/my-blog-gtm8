import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          📝 My Blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-accent-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/authors"
            className="text-gray-700 hover:text-accent-600 transition-colors font-medium"
          >
            Authors
          </Link>
          <Link
            href="/categories"
            className="text-gray-700 hover:text-accent-600 transition-colors font-medium"
          >
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}