// db1.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const db1Config: TypeOrmModuleOptions = {
  name: 'mdsdata',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  //   password: 'db1_password',
  database: 'mdsdata',
  synchronize: false, // set to true if you want TypeORM to automatically synchronize your database schema with your entity classes
  entities: [], // leave empty array as we're not using entities
};
