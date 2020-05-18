export interface BaseRepository<T> {
  exists(t: number): Promise<boolean>;
  delete(t: number): Promise<void>;
  create(t: T): Promise<T>;
  update(t: T): Promise<void>;
  getById(t: number): Promise<T>;
  getAll(): Promise<Array<T>>;
}
