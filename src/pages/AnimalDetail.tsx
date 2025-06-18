import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import type { iAnimal } from "../models/iAnimal";
import { fetchAnimals } from "../service/animalService";
import FallbackImage from "../components/FallbackImage"; 


type AnimalState = {
  animal: iAnimal | null;
  timeSinceFed: number;
};

type AnimalAction =
  | { type: "LOAD_ANIMAL"; payload: iAnimal }
  | { type: "FEED_ANIMAL" }
  | { type: "UPDATE_TIME"; payload: number };

function animalReducer(state: AnimalState, action: AnimalAction): AnimalState {
  switch (action.type) {
    case "LOAD_ANIMAL": {
      const stored = localStorage.getItem(`lastFed-${action.payload.id}`);
      const lastFed = stored ? new Date(stored) : new Date(action.payload.lastFed);
      const now = new Date();
      const diffInHours = (now.getTime() - lastFed.getTime()) / 1000 / 60 / 60;
      return {
        animal: action.payload,
        timeSinceFed: diffInHours,
      };
    }
    case "FEED_ANIMAL": {
      if (!state.animal) return state;
      const now = new Date();
      localStorage.setItem(`lastFed-${state.animal.id}`, now.toISOString());
      return {
        animal: {
          ...state.animal,
          lastFed: now.toISOString(),
        },
        timeSinceFed: 0,
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        timeSinceFed: action.payload,
      };
    }
    default:
      return state;
  }
}

function AnimalDetail() {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(animalReducer, {
    animal: null,
    timeSinceFed: 0,
  });

  const getStatusMessage = (time: number) => {
    if (time >= 4) return { text: "Hungrig! Mata nu!", color: "red" };
    if (time >= 3) return { text: "Snart hungrig", color: "orange" };
    return { text: "Mätt", color: "green" };
  };

  useEffect(() => {
    const load = async () => {
      const allAnimals = await fetchAnimals();
      const found = allAnimals.find((a) => a.id === Number(id));
      if (found) {
        dispatch({ type: "LOAD_ANIMAL", payload: found });
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.animal) return;
      const stored = localStorage.getItem(`lastFed-${state.animal.id}`);
      const lastFed = stored ? new Date(stored) : new Date(state.animal.lastFed);
      const now = new Date();
      const diffInHours = (now.getTime() - lastFed.getTime()) / 1000 / 60 / 60;
      dispatch({ type: "UPDATE_TIME", payload: diffInHours });
    }, 60000);

    return () => clearInterval(interval);
  }, [state.animal]);

  if (!state.animal) return <div>Laddar...</div>;

  const { animal, timeSinceFed } = state;
  const status = getStatusMessage(timeSinceFed);

  return (
  <div className="max-w-screen-xl mx-auto px-4 py-6">
    <div className="border border-black rounded shadow-md overflow-hidden">

      <div className="flex flex-col md:flex-row">

        
        <div className="w-full md:w-[55%]">
          <FallbackImage
            src={animal.imageUrl}
            fallback="/fallback.jpg"
            alt={animal.name}
            className={`w-full ${animal.id === 9 ? "h-[750px]" : "h-[600px]"} object-cover`}
          />
        </div>

       
        <div className="w-full md:w-[45%] flex flex-col justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
            <p className="text-gray-700">{animal.longDescription}</p>
          </div>

          <div className="mt-6">
            <p className={`font-bold text-${status.color}-500 mb-2`}>{status.text}</p>
             <div className="flex justify-between items-center">
    
            <button
              onClick={() => dispatch({ type: "FEED_ANIMAL" })}
              disabled={timeSinceFed < 4}
              className={`px-5 py-2 rounded text-white font-semibold ${
                timeSinceFed >= 4
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Mata
            </button>
            <button
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-sky-700 hover:bg-sky-900 text-white rounded font-semibold"
    >
      Tillbaka
    </button>
          </div>
        </div>
</div>
      </div>
    </div>
  </div>
);
}

export default AnimalDetail;