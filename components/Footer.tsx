export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} My Blog. Built with Next.js and Cosmic.</p>
      </div>
    </footer>
  );
}