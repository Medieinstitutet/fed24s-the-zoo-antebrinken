import { Link } from "react-router-dom";
import type { iAnimal } from "../models/iAnimal";
import FeedButton from "./FeedButton";



function AnimalCard({ animal }: { animal: iAnimal }) {
  console.log("Renderar AnimalCard för:", animal.name);
  const timeSinceFed = new Date().getTime() - new Date(animal.lastFed).getTime();
  const hoursSinceFed = timeSinceFed / (1000 * 60 * 60);

   let status = "Mätt";
  if (hoursSinceFed > 5) {
    status = "Hungrig!";
  } else if (hoursSinceFed > 3) {
    status = "Snart hungrig";
  }

   return (
    <div>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
      />
      <h2>{animal.name}</h2>
      <p>{animal.shortDescription}</p>
      <p>Status: {status}</p>
      <Link to={`/animals/${animal.id}`}>Läs mer</Link>
      <div style={{ border: "1px solid red" }}>
  <FeedButton animalId={animal.id} />
</div>
    </div>
  );
}

export default AnimalCard;