import {Server} from "./server";
import {CheckinHandler} from "./src/Handlers/CheckinHandler";
import {PostgresTestServer} from "./src/database/postgres/PostgresTestServer";
import {SqlCheckinStore} from "./src/Store/SqlCheckinStore";

const start = async () => {
  const testPostgresServer = new PostgresTestServer();
  const db = await testPostgresServer.startAndGetDb();
  const store = new SqlCheckinStore(db);
  const checkinHandler = new CheckinHandler(store);
  const server = new Server(checkinHandler);
  await server.start()
};

start();
