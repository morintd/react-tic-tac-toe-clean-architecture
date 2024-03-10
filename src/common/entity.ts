export abstract class Entity<T extends Record<string, unknown>> {
  constructor(protected _data: T) {}
}
