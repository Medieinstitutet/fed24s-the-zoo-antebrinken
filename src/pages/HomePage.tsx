import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="max-w-screen-md mx-auto p-6 space-y-10">

     
      <div
        className="relative h-64 md:h-80 rounded shadow-lg bg-cover bg-center"
         style={{ backgroundImage: "url('/natur.jpg')" }}
        
      >
        
        <div className="absolute inset-0 bg-gradient-to-t from white/90 via-white/50 to-transparent flex items-center justify-center rounded">
          <h1 className="text-black text-4xl md:text-5xl font-bold text-center">
            Välkommen till Djurparken 
          </h1>
          </div>
        </div>
      

      
      <div className="text-center">
        <p className="text-xl mb-4">Träffa och mata Philips djur!</p>
      <Link
  to="/animals"
  className="btn btn-pulse inline-block bg-green-600 hover:bg-green-700 text-white rounded text-lg font-semibold"
>
  Gå till djuren →
</Link>
      </div>

      
      

    </div>
  );
}

export default HomePage;