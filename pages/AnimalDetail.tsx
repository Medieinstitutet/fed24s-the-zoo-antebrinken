import { useParams } from "react-router";
import React, { useEffect, useReducer } from "react";
import type { iAnimal } from "../src/models/iAnimal";
import { fetchAnimals } from "../service/animalService";

type AnimalState = {
  animal: iAnimal | null;
  timeSinceFed: number; // 
};

type AnimalAction =
  | { type: "LOAD_ANIMAL"; payload: iAnimal }
  | { type: "FEED_ANIMAL" }
  | { type: "UPDATE_TIME" };

function animalReducer(state: AnimalState, action: AnimalAction): AnimalState {
  switch (action.type) {
    case "LOAD_ANIMAL": {
      const fedTime = new Date(action.payload.lastFed).getTime();
      const now = new Date().getTime();
      const diffInHours = (now - fedTime) / 1000 / 60 / 60;
      return {
        animal: action.payload,
        timeSinceFed: diffInHours,
      };
    }
    case "FEED_ANIMAL": {
      if (!state.animal) return state;
      const updatedAnimal = {
        ...state.animal,
        isFed: true,
        lastFed: new Date().toISOString(),
      };
      return {
        animal: updatedAnimal,
        timeSinceFed: 0,
      };
    }
    case "UPDATE_TIME": {
      if (!state.animal) return state;
      const fedTime = new Date(state.animal.lastFed).getTime();
      const now = new Date().getTime();
      const diffInHours = (now - fedTime) / 1000 / 60 / 60;
      return {
        ...state,
        timeSinceFed: diffInHours,
      };
    }
    default:
      return state;
  }
}

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(animalReducer, {
    animal: null,
    timeSinceFed: 0,
  });

 
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
      dispatch({ type: "UPDATE_TIME" });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!state.animal) return <div>Laddar...</div>;

  const { animal, timeSinceFed } = state;

  return (
    <div>
      <h2>{animal.name}</h2>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        onError={(e) => {
          e.currentTarget.src = "/default-animal.jpg";
        }}
        style={{ maxWidth: "400px", height: "auto" }}
      />
      <p>{animal.longDescription}</p>

      {timeSinceFed >= 4 && (
        <p style={{ color: "red", fontWeight: "bold" }}>Hungrig! Mata nu!</p>
      )}
      {timeSinceFed >= 3 && timeSinceFed < 4 && (
        <p style={{ color: "orange" }}>Snart hungrig</p>
      )}

      <button
        onClick={() => dispatch({ type: "FEED_ANIMAL" })}
        disabled={timeSinceFed < 4}
        style={{
          backgroundColor: timeSinceFed >= 4 ? "#4CAF50" : "#ccc",
          color: timeSinceFed >= 4 ? "white" : "#666",
          cursor: timeSinceFed >= 4 ? "pointer" : "not-allowed",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginTop: "1rem",
        }}
      >
        Mata
      </button>
    </div>
  );
};

export default AnimalDetail;