import { RegisterUseCase } from "../orgs/register.";
import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";

export function makeRegisterOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository();
  const registerUseCase = new RegisterUseCase(prismaOrgRepository);

  return registerUseCase;
}
