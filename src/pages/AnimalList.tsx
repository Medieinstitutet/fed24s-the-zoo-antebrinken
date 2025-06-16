import { useEffect, useState } from "react";
import { fetchAnimals } from "../service/animalService";
import type { iAnimal } from "../models/iAnimal";
import { Link } from "react-router-dom";
import FallbackImage from "../components/FallbackImage";

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
    <div>
      

      <input
        type="text"
        placeholder="Filtrera på namn..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
       className="w-full p-2 mb-4 border rounded"
      />

      {filteredAnimals.length === 0 && <p>Inga djur hittades.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 list-none" >
        {filteredAnimals.map((animal) => {
          const lastFed = getLastFed(animal);
          const feedStatus = getFeedStatus(lastFed);

          return (
            <li key={animal.id}  className="my-2">
              <div>
                <Link
                  to={`/animals/${animal.id}`}
                   className="flex flex-col items-center gap-4 no-underline text-inherit"
>
                
                  <FallbackImage
                    src={animal.imageUrl}
                    fallback="/fallback.jpg"
                    alt={animal.name}
                    className="w-[120px] h-[120px] object-cover object-top rounded-[6px]"
                  />
                  <div>
                    <h2>{animal.name}</h2>
                    <p>{animal.shortDescription}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`font-bold ${getStatusColor(lastFed)}`}>
                  {feedStatus}
                 </span>
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default AnimalList;