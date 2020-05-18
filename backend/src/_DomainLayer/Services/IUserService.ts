import { UserDto } from "_ApplicationLayer/DTO/User/user.dto";

export interface IUserService {
  findAll(activeOnly: boolean): Promise<UserDto[]>;
  findUserById(id: number): Promise<UserDto>;
}
