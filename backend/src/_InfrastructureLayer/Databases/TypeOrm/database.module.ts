import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

const modelsPath = path.resolve(
  "./src/_DomainLayer/Entities/TypeOrm" + "/**/*.entity{.ts,.js}"
);

console.log("modelsPath", modelsPath);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "patient_vitals",
      //autoLoadEntities: true,
      entities: [modelsPath],
    }),
  ],
})
export class MySqlDatabaseModule {}
