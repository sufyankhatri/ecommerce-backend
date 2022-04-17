import * as dotenv from 'dotenv'

dotenv.config();
const database = {
    development:   {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "postgres",
      entities: [
        "dist/**/*.model.ts"
      ],
      synchronize: false,
      uuidExtension: 'pgcrypto'
    },
    test:  {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: "",
      database: process.env.POSTGRES_DB,
      entities: [
        "src/**/*.model.ts"
      ],
      synchronize: true,
      dropSchema: true,
      migrationsRun: false,
      migrations: [
        "src/database/migrations/*.ts"
      ],
      cli: {
        migrationsDir: "src/database/migrations"
    },
    keepConnectionAlive: true,
    uuidExtension: 'pgcrypto'
    }
  }

  const DatabaseConfig = () => ({
    ...database[process.env.NODE_ENV]
  })

  export = DatabaseConfig;