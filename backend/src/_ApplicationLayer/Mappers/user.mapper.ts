import { UserDto } from "_ApplicationLayer/DTO/User/user.dto";
import { IMapper } from "_DomainLayer/Services/IMapper ";
import { User } from "_DomainLayer/Entities/TypeOrm/user.entity";

class UserMapper implements IMapper<User, UserDto> {
  toDomain(dto: UserDto): User {
    let user: User = {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      isActive: dto.isActive,
    };

    return user;
  }
  toDTO(t: User): UserDto {
    let dto: User = {
      id: t.id,
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      isActive: t.isActive,
    };

    return dto;
  }
}

const instance = new UserMapper();

export default instance;
