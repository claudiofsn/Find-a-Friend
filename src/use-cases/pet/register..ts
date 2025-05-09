import { OrgsRepository } from "@/repositories/orgs-repository";

interface RegisterPetUseCaseRequest {}

interface RegisterPetUseCaseReponse {}

export class RegisterPetUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({}: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseReponse> {}
}
