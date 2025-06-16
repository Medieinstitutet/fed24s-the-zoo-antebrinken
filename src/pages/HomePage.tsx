import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="max-w-screen-md mx-auto p-6 space-y-10">

     
      <div
        className="relative h-64 md:h-80 rounded shadow-lg bg-cover bg-center"
        
      >
        
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center rounded">
          <h1 className="text-black text-4xl md:text-5xl font-bold text-center">
            Välkommen till Djurparken 🐾
          </h1>
          </div>
        </div>
      

      
      <div className="text-center">
        <p className="text-xl mb-4">Träffa och mata Philips djur!</p>
        <Link
          to="/animals"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold"
        >
          Gå till djuren →
        </Link>
      </div>

      
      

    </div>
  );
}

export default HomePage;