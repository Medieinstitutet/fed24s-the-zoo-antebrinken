import { useParams } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
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
    <div>
      <h2>{animal.name}</h2>
      <FallbackImage
        src={animal.imageUrl}
        fallback="/fallback.jpg"
        alt={animal.name}
        style={{ maxWidth: "400px", height: "auto" }}
      />
      <p>{animal.longDescription}</p>
      <p style={{ color: status.color, fontWeight: "bold" }}>{status.text}</p>
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
}

export default AnimalDetail;