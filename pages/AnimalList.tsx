import { useEffect, useState } from "react";
import { fetchAnimals } from "../service/animalService";
import type { iAnimal } from "../models/iAnimal";
import AnimalCard from "../components/AnimalCard";

function AnimalList() {
  const [animals, setAnimals] = useState<iAnimal[]>([]);

  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  return (
    <div>
      <h1>Djur på zoo:t</h1>
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default AnimalList;