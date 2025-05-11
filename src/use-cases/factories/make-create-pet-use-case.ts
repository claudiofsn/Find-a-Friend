import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../pet/create";

export function makeCreatePetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository();
  const createPetUseCase = new CreatePetUseCase(prismaPetRepository);

  return createPetUseCase;
}
