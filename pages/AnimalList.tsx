import { useEffect, useState } from "react";
import { fetchAnimals } from "../services/animalService";
import { iAnimal } from "../models/iAnimal";
import AnimalCard from "../components/AnimalCard";

function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]);

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