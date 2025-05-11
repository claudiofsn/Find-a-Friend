import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "prisma/generated/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetProfileUseCaseRequest {
  id: string;
}

interface GetPetProfileUseCaseReponse {
  pet: Pet;
}

export class GetPetProfileUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    id,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseReponse> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
