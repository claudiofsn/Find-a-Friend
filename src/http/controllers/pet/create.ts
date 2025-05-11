import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    org_id: z.string(),
    birth_date: z.string().nullable(),
  });

  const body = createPetBodySchema.parse(request.body);
  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute(body);

  return reply.status(201).send();
}
