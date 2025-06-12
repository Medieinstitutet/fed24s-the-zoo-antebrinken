import { Outlet, Link } from "react-router-dom";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="metallic-blue p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-white text-xl font-semibold"> The Zoo App by Philip</h1>
        <nav className="flex space-x-8">
          <div>
          <Link to="/" className="mr-4 text-white hover:underline">Hem</Link>
          </div>
          <div>
          <Link to="/animals" className="text-white hover:underline">Djur</Link>
        </div>
        </nav>
        </div>
      </header>

      <main className="p-4 flex-grow">
        <Outlet />
      </main>

      <footer className="w-full h-64px metallic-blue text-white mt-8 text-center flex items-center justify-center">
  

  <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-24">
    
    
    <div>
      <h2 className="text-lg font-semibold mb-2">Om Zoo App</h2>
      <p>&copy; 2025 Zoo App by Philip</p>
      <p>All rights reserved.</p>
    </div>

    
    <div>
      <h2 className="text-lg font-semibold mb-2">Kontakt</h2>
      <p>Telefon: 070-123 45 67</p>
      <p>Email: info@zooapp.se</p>
    </div>

    
    <div>
      <h2 className="text-lg font-semibold mb-2">Följ oss</h2>
      <ul className="flex space-x-4">
        <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
        <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
        <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
      </ul>
    </div>
    </div>

  
</footer>
    </div>
  );
}