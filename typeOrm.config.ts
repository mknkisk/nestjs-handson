import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'test',
  username: 'test',
  password: 'password',
  entities: ['dist/**/entities/**/*.entity.js'],
  migrations: ['dist/**/migrations/**/*.js'],
  // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  synchronize: true,
  logging: true,
});
