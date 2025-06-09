import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { iAnimal } from "../models/iAnimal";
import { fetchAnimals } from "../service/animalService";

function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<iAnimal | null>(null);

  useEffect(() => {
    fetchAnimals().then(animals => {
      const found = animals.find(a => a.id === Number(id));
      setAnimal(found ?? null);
    });
  }, [id]);

  if (!animal) return <p>Djur hittades inte</p>;

  return (
    <div>
      <h1>{animal.name}</h1>
      <img src={animal.imageUrl} alt={animal.name} />
      <p>{animal.longDescription}</p>
      {}
    </div>
  );
}

export default AnimalDetail;