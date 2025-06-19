import { useEffect, useState } from "react";
import { fetchAnimals } from "../service/animalService";
import type { iAnimal } from "../models/iAnimal";
import { Link } from "react-router-dom";
import FallbackImage from "../components/FallbackImage";
import { motion } from "framer-motion";

function AnimalList() {
  const [animals, setAnimals] = useState<iAnimal[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  function getLastFed(animal: iAnimal) {
    const stored = localStorage.getItem(`lastFed-${animal.id}`);
    return stored ? stored : animal.lastFed;
  }

  function getFeedStatus(lastFed: string) {
    const fedTime = new Date(lastFed).getTime();
    const now = new Date().getTime();
    const diffInHours = (now - fedTime) / 1000 / 60 / 60;

    if (diffInHours >= 5) return "Mata djuret!";
    if (diffInHours >= 3) return "Snart hungrig";
    return "Mätt";
  }

  function getStatusColor(lastFed: string) {
    const status = getFeedStatus(lastFed);
    if (status === "Mata djuret!") return "text-red-500";
    if (status === "Snart hungrig") return "text-orange-400";
    return "text-green-600";
  }

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    
      
       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <input
        type="text"
        placeholder="Filtrera på namn..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
       className="w-full p-2 mb-4 border rounded"
      />

      {filteredAnimals.length === 0 && <p>Inga djur hittades.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none" >
        {filteredAnimals.map((animal,i) => {
          const lastFed = getLastFed(animal);
          const feedStatus = getFeedStatus(lastFed);

          return (
            <motion.li key={animal.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.08,duration:0.4}} className="my-2 w-full h-full">
             <div className="relative w-full h-[500px] rounded overflow-hidden shadow border border-black">
                <Link
                  to={`/animals/${animal.id}`}
                   className="flex flex-col items-center gap-6 no-underline text-inherit">
                  <FallbackImage
                    src={animal.imageUrl}
                    fallback="/fallback.jpg"
                    alt={animal.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                   <div className="absolute inset-0 flex flex-col justify-end text-black p-4 bg-gradient-to-t from-white/90 via-white/50 to-transparent">
        <h2 className="text-xl font-semibold">{animal.name}</h2>
        <p className="text-sm break-words">{animal.shortDescription}</p>
        <p className="mt-1 text-sm">
                      <strong>Status:</strong>{" "}
                      <span className={`font-bold ${getStatusColor(lastFed)}`}>
                  {feedStatus}
                 </span>
                    </p>
                  </div>
                </Link>
              </div>
            </motion.li>
          );
        })}
      </div>
    </div>

  );
}

export default AnimalList;