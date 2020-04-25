import {Handler} from "../../server";
import {Res, ResOf} from "http4js/core/Res";
import {Req} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {Checkin, Feeling, Store} from "../Store/CheckinStore";

export class CheckinHandler implements Handler {
  constructor(private checkinStore: Store<Checkin>) {
  }
  async handle(req: Req): Promise<Res> {
      return req.method === Method.POST ? this.handlePost(req) : this.handleGet(req)
  };

  private async handlePost(req: Req): Promise<Res> {
    try {
      const parsedBody = JSON.parse(req.bodyString());
      const checkin = parsedBody.checkin;
      const isValid = this.validateCheckin(checkin);
      if(!isValid) {
        return ResOf(400, 'not a valid checkin')
      }
      const stored = await this.checkinStore.store(checkin);
      if(stored.error || !stored.result) {
        return ResOf(500, 'error storing checkin')
      }
      return ResOf(200, JSON.stringify({checkin: stored.result}));
    } catch (e) {
      console.log(e);
      return ResOf(500, e.message)
    }

  }

  private validateCheckin(checkin: any): boolean {
    if(checkin) {
      const feelingValid = Array.isArray(checkin.feeling) && checkin.feeling.reduce((prev:boolean, curr: any) => {
        const inFeelingsEnum = Object.values(Feeling).includes(curr);
        return prev && inFeelingsEnum;
      }, true);
      //todo change 0 and 7 to constants
      const moodValid = typeof checkin.mood === "number" && checkin.mood > 0 && checkin.mood < 8;
      return feelingValid && moodValid && !!checkin.createdAt && !!checkin.userId
    }
    return false
  }

  private async handleGet(_req: Req): Promise<Res> {
    const storeRes =  await this.checkinStore.findAll();
    return ResOf(200, JSON.stringify({checkins: storeRes.result}));
  }
}
