import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "prisma/generated/client";

interface CreatePetUseCaseRequest {
  name: string;
  org_id: string;
  birth_date: string | null;
}

interface CreatePetUseCaseReponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseReponse> {
    const pet = await this.petRepository.create(data);

    return { pet };
  }
}
