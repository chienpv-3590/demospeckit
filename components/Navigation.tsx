import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-blue-600 transition-colors">
            MyBlog
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium min-h-[44px] flex items-center"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-primary transition-colors font-medium min-h-[44px] flex items-center"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
