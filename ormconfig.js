module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/modules/common/database/migrations/*.ts'],
  migrationsTableName: 'migration',
  cli: {
    migrationsDir: 'src/modules/common/database/migrations',
  },
};
