import { randomUUID } from "node:crypto";
import { OrgsRepository } from "../orgs-repository";
import { Org, Prisma } from "prisma/generated/client";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }
}
