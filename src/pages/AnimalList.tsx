import { useEffect, useState } from "react";
import { fetchAnimals } from "../service/animalService";
import type { iAnimal } from "../models/iAnimal";
import { Link } from "react-router-dom";


function AnimalList() {
  const [animals, setAnimals] = useState<iAnimal[]>([]);
  const [filter, setFilter] = useState("");
  const [, setRefresh] = useState(0); 

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

    if (diffInHours >= 5) return "Mata djoooret føhelvede!!!!11";
    if (diffInHours >= 3) return "Snart hungrig";
    return "Mätt";
  }

  function getStatusColor(lastFed: string) {
    const status = getFeedStatus(lastFed);
    if (status === "Mata djoooret føhelvede!!!!11") return "red";
    if (status === "Snart hungrig") return "orange";
    return "green";
  }

  
  function feedAnimal(animal: iAnimal) {
    const lastFed = getLastFed(animal);
    const fedTime = new Date(lastFed).getTime();
    const now = new Date().getTime();
    const diffInHours = (now - fedTime) / 1000 / 60 / 60;

    if (diffInHours < 4) return; 

    localStorage.setItem(`lastFed-${animal.id}`, new Date().toISOString());
    setRefresh((prev) => prev + 1); 
  }

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Djoooooren på zooooo:t</h1>

      <input
        type="text"
        placeholder="Filtrera på namn..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
      />

      {filteredAnimals.length === 0 && <p>Inga djur hittades.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredAnimals.map((animal) => {
          const lastFed = getLastFed(animal);
          const feedStatus = getFeedStatus(lastFed);
          const canFeed = (new Date().getTime() - new Date(lastFed).getTime()) / 1000 / 60 / 60 >= 4;

          return (
            <li key={animal.id} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link
                  to={`/animals/${animal.id}`}
                  style={{ textDecoration: "none", color: "inherit", flexGrow: 1, display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    onError={(e) => {
                      e.currentTarget.src = "/fallback.jpg";
                    }}
                    style={{ width: "120px", height: "auto", borderRadius: "6px" }}
                  />
                  <div>
                    <h2>{animal.name}</h2>
                    <p>{animal.shortDescription}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span style={{ color: getStatusColor(lastFed), fontWeight: "bold" }}>
                        {feedStatus}
                      </span>
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => feedAnimal(animal)}
                  disabled={!canFeed}
                  style={{
                    backgroundColor: canFeed ? "#4CAF50" : "#ccc",
                    color: canFeed ? "white" : "#666",
                    cursor: canFeed ? "pointer" : "not-allowed",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Mata
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AnimalList;