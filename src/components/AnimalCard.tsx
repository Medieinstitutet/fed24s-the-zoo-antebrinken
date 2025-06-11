import { Link } from "react-router-dom";
import type { iAnimal } from "../models/iAnimal";
import FeedButton from "./FeedButton";
import FallbackImage from "./FallbackImage";

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
    <div className="p-4 rounded-lg shadow-md border border-gray-200 bg-white max-w-xs">
      <FallbackImage
        src={animal.imageUrl}
        fallback="/fallback.jpg"
        alt={animal.name}
        className="w-30 h-auto rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{animal.name}</h2>
      <p className="text-gray-700 mt-1">{animal.shortDescription}</p>
      <p className="mt-1 font-medium">
        <span className="text-gray-600">Status:</span> {status}
      </p>
      <Link
        to={`/animals/${animal.id}`}
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        Läs mer
      </Link>
      <div className="mt-3 border border-red-500 p-2 rounded">
        <FeedButton animalId={animal.id} />
      </div>
    </div>
  );
}

export default AnimalCard;