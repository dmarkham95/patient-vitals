import { BaseRepository } from "./IBaseRepository";
import { User } from "_DomainLayer/Entities/TypeOrm/user.entity";

export interface IUserRepository extends BaseRepository<User> {}
