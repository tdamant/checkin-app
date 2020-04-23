import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {ResOf} from "http4js/core/Res";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {HttpHandler} from "http4js/core/HttpMessage";

export interface Handler {
  handle: HttpHandler
}

export class Server {
  private server: Routing;
  constructor(private checkinHandler: Handler, private port: number = 8000) {
    const portToUse = process.env.PORT ? parseInt(process.env.PORT) : this.port;

    this.server = routes(Method.GET, '/health', async () => ResOf(200))
      .withPost('/checkins', this.checkinHandler.handle.bind(this.checkinHandler))
      .asServer(new NativeHttpServer(portToUse))
  }

  start() {
    this.server.start();
    console.log(`server running on ${this.port}`)
  }

  async stop() {
    await this.server.stop()
  }
}
