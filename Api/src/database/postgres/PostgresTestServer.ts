import {StartedTestContainer} from 'testcontainers/dist/test-container';
import {GenericContainer} from 'testcontainers';
import * as path from "path";
import {Pool} from 'pg';
import {PostgresMigrator} from "./PostgresMigrator";
import {PostgresDatabase} from "./PostgresDatabase";

export class PostgresTestServer {
  private postgres?: StartedTestContainer;

  public async start() {
    this.postgres = await new GenericContainer('postgres', '9.6-alpine')
      .withExposedPorts(5432)
      .start();
    const mappedPort = this.postgres.getMappedPort(5432);
    return {
      host: 'localhost',
      port: mappedPort,
      user: 'postgres',
      password: '',
      database: 'postgres'
    };
  }

  public async startAndGetDb(): Promise<PostgresDatabase> {
    const adminConnectionDetails = await this.start();
    await new PostgresMigrator(adminConnectionDetails, path.resolve('./src/database/bootstrap')).migrate();
    const connectionDetails =  {
      host: 'localhost',
      port: adminConnectionDetails.port,
      user: 'postgres',
      password: '',
      database: 'checkin_store'
    };

    await new PostgresMigrator(connectionDetails, path.resolve('./src/database/migrations')).migrate();
    return new PostgresDatabase(new Pool(connectionDetails));
  }

  public async stop() {
    await this.postgres!.stop();
  }

}
