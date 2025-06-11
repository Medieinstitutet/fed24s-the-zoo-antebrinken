import { Outlet, Link } from "react-router-dom";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-white text-xl font-semibold"> The Zoo App by Philip</h1>
        <nav className="flex space-x-8">
          <Link to="/" className="mr-4 text-blue-700 hover:underline">Hem</Link>
          <Link to="/animals" className="text-blue-700 hover:underline">Djur</Link>
        </nav>
        </div>
      </header>

      <main className="p-4 flex-grow">
        <Outlet />
      </main>

      <footer className="w-full h-[50px] bg-black text-white mt-8 text-center flex items-center justify-center">
  &copy; 2025 Zoo App
</footer>
    </div>
  );
}