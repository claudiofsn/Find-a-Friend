import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "prisma/generated/client";

interface CreatePetUseCaseRequest {
  name: string;
  org_id: string;
  size: number;
  birth_date: Date;
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
