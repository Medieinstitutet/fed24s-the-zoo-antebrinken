import type { iAnimal } from "../src/models/iAnimal";
const API_URL = "https://animals.azurewebsites.net/api/animals";

export async function fetchAnimals(): Promise<iAnimal[]> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}