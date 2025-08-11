import { useEffect, useState } from "react";
import { useAnimalContext } from "../contexts/AnimalContext";

interface FeedButtonProps {
  animalId: number;
}

function FeedButton({ animalId }: FeedButtonProps) {
  const { feedAnimal, getLastFed } = useAnimalContext();
  const [hoursSinceFed, setHoursSinceFed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const lastFed = getLastFed(animalId);
      const diff = (now.getTime() - lastFed.getTime()) / 1000 / 60 / 60;
      setHoursSinceFed(diff);
    }, 60 * 1000);

    
    const now = new Date();
    const diff = (now.getTime() - getLastFed(animalId).getTime()) / 1000 / 60 / 60;
    setHoursSinceFed(diff);

    return () => clearInterval(interval);
  }, [animalId, getLastFed]);

  const handleFeed = () => {
    feedAnimal(animalId);
    setHoursSinceFed(0);
  };

  const getStatusText = () => {
    if (hoursSinceFed >= 5) return "Måste matas!!!!";
    if (hoursSinceFed >= 3) return "Hungrig";
    return "Mätt";
  };

  return (
    <div>
      <p>Status: {getStatusText()}</p>
      <button onClick={handleFeed} disabled={hoursSinceFed < 4}>
        {hoursSinceFed < 4 ? "Mätt - kan inte matas än" : "Mata djur "}
      </button>
    </div>
  );
}

export default FeedButton;