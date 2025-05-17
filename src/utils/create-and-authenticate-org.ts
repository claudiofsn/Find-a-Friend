import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      id: "org-1",
      name: "Org 1",
      email: "org@gmail.com",
      password_hash: await hash("123456", 6),
      phone: "16999999",
      cep: "1402002",
      uf: "SP",
      city: "cidade",
      neighborhood: "bairro",
      street: "rua",
      number: "10000",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "org@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
