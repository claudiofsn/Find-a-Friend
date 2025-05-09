import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}

interface RegisterUseCaseReponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 10);

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      latitude,
      longitude,
    });

    return { org };
  }
}
