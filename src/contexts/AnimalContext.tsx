import { createContext, useContext, useEffect, useState } from "react";
import type { iAnimal } from "../models/iAnimal";
import { fetchAnimals } from "../../service/animalService";

interface AnimalContextValue {
  animals: iAnimal[];
  feedAnimal: (id: number) => void;
  getLastFed: (id: number) => Date;
}

const AnimalContext = createContext<AnimalContextValue | undefined>(undefined);

export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (!context) throw new Error("useAnimalContext must be used within AnimalProvider");
  return context;
};

export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
  const [animals, setAnimals] = useState<iAnimal[]>([]);

  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  const feedAnimal = (id: number) => {
    localStorage.setItem(`lastFed-${id}`, new Date().toISOString());
  };

  const getLastFed = (id: number): Date => {
    const stored = localStorage.getItem(`lastFed-${id}`);
    const animal = animals.find(a => a.id === id);
    return stored ? new Date(stored) : new Date(animal?.lastFed ?? "");
  };

  return (
    <AnimalContext.Provider value={{ animals, feedAnimal, getLastFed }}>
      {children}
    </AnimalContext.Provider>
  );
};