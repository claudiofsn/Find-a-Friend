export class PetBelongsToAnotherOrgError extends Error {
  constructor() {
    super("This pet belongs to another org.");
  }
}
