import { FastifyInstance } from "fastify";
import { create } from "./create";
import { profile } from "./profile";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", create);
  app.get("/pets", search);
  app.get("/pets/:petId", profile);
}
