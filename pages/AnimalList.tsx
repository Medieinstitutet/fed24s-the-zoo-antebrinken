import { useEffect, useState } from "react";
import { fetchAnimals } from "../service/animalService";
import type { iAnimal } from "../models/iAnimal";


function AnimalList() {
  const [animals, setAnimals] = useState<iAnimal[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  
  function getFeedStatus(lastFed: string) {
    const fedTime = new Date(lastFed).getTime();
    const now = new Date().getTime();
    const diffInHours = (now - fedTime) / 1000 / 60 / 60;

    if (diffInHours >= 5) return "Desperat behov av mat";
    if (diffInHours >= 3) return "Snart hungrig";
    return "Mätt";
  }

  
  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Djur på zoo:t</h1>

      <input
        type="text"
        placeholder="Filtrera på namn..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
      />

      {filteredAnimals.length === 0 && <p>Inga djur hittades.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredAnimals.map((animal) => (
          <li
            key={animal.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={animal.imageUrl}
              alt={animal.name}
              onError={(e) => {
                e.currentTarget.src = "/default-animal.jpg"; 
              }}
              style={{ width: "120px", height: "auto", borderRadius: "6px" }}
            />

            <div>
              <h2>{animal.name}</h2>
              <p>{animal.shortDescription}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      getFeedStatus(animal.lastFed) === "Desperat behov av mat"
                        ? "red"
                        : getFeedStatus(animal.lastFed) === "Snart hungrig"
                        ? "orange"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {getFeedStatus(animal.lastFed)}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimalList;