import { SearchPets } from "../pet/search";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeSearchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const searchPetsUseCase = new SearchPets(prismaPetsRepository);

  return searchPetsUseCase;
}
