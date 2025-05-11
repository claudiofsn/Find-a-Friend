import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetProfileUseCase } from "../pet/get-pet-details";

export function makeGetPetProfileUseCase() {
  const prismaPetRepository = new PrismaPetsRepository();
  const getPetProfileUseCase = new GetPetProfileUseCase(prismaPetRepository);

  return getPetProfileUseCase;
}
