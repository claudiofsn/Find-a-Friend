import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { Org } from "prisma/generated/client";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

interface RegisterUseCaseReponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(data.password, 10);

    const org = await this.orgsRepository.create({
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      phone: data.phone,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
    });

    return { org };
  }
}
