import {Server} from "./server";
import {InMemoryCheckinStore} from "./Store/CheckinStore";
import {CheckinHandler} from "./Handlers/CheckinHandler";

const start = async () => {
  const store = new InMemoryCheckinStore();
  const checkinHandler = new CheckinHandler(store);
  const server = new Server(checkinHandler);
  await server.start()
};

start();
