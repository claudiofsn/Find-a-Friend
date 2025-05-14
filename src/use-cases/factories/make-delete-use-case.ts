import { Delete } from "../pet/delete";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeDeleteUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const deleteUseCase = new Delete(prismaPetsRepository);

  return deleteUseCase;
}
