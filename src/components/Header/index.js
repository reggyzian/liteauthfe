import Link from 'next/link';

const navItems = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'About', href: '/about' },
  { id: 3, label: 'Login', href: '/users/login' },
  { id: 4, label: 'Register', href: '/users/register' },
];

export default function Header() {
  return (
    <header className="flex items-center py-5">
      <div className="w-1/2">
        <h1 className="text-5xl font-bold mb-2">Liteauth</h1>
        <p className="text-xs">Simple auth frontend with jwt</p>
      </div>
      <nav className="w-1/2 grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
