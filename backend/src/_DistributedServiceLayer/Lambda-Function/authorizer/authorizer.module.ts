import { Module } from "@nestjs/common";
import { ClassProvider } from "@nestjs/common/interfaces";
import { AuthService } from "_ApplicationLayer/Services/auth.service";
import { AUTH_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { AUTH_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { AuthorizerService } from "./authorizer.service";
import { AuthRepository } from "_InfrastructureLayer/Repositories/Auth/auth.repository";

const authRepositoryProvider: ClassProvider = {
  provide: AUTH_REPOSITORY,
  useClass: AuthRepository,
};

const authServiceProvider: ClassProvider = {
  provide: AUTH_SERVICE,
  useClass: AuthService,
};

@Module({
  //  imports: [DatabaseModule],
  providers: [authRepositoryProvider, authServiceProvider, AuthorizerService],
  exports: [authServiceProvider],
})
export class AuthorizerModule {}
