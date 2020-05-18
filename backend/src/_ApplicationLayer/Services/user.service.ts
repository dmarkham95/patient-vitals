import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "_ApplicationLayer/DTO/User/user.dto";
import { UserMapper } from "_ApplicationLayer/Mappers";
import { USER_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { IUserRepository } from "_DomainLayer/Repositories/IUserRepository";
import { IUserService } from "_DomainLayer/Services/IUserService";

@Injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@Inject(USER_REPOSITORY) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async findAll(activeOnly = true): Promise<UserDto[]> {
    const users = await this.userRepository.getAll();
    const userList = users.map((u) => UserMapper.toDTO(u));
    return userList;
  }

  public async findUserById(id: number): Promise<UserDto> {
    const user = await this.userRepository.getById(id);
    const userDto = UserMapper.toDTO(user);
    return userDto;
  }
}
