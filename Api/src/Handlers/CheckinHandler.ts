import {Handler} from "../../server";
import {Res, ResOf} from "http4js/core/Res";
import {Req} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {Checkin, Store} from "../Store/CheckinStore";
import {CheckinSummary, Feeling, moodRange} from "../../../checkin-ui/src/types";
import {getMedian} from "../utils/stats";

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
      const moodValid = typeof checkin.mood === "number" && checkin.mood >= moodRange.min && checkin.mood <= moodRange.max;
      return feelingValid && moodValid && !!checkin.createdAt && !!checkin.userId
    }
    return false
  }

  private async handleGet(req: Req): Promise<Res> {
    const userId = req.query('userId');
    if(!userId || typeof userId !== 'string') {
      return ResOf(400, 'no userId provided')
    }
    const checkinSummary = await this.getCheckinSummary(userId);
    if(checkinSummary.error || !checkinSummary.summary) {
      return ResOf(500, `failed to get checkins from db - ${checkinSummary.error}`)
    }
    return ResOf(200, JSON.stringify(checkinSummary.summary));
  };

  private getCheckinSummary = async (userId: string): Promise<{summary?: CheckinSummary, error?:string}> => {
    try {
      const storeRes =  await this.checkinStore.findAll();
      if(storeRes.error || !storeRes.result) {
        return {error: 'failed to get checkins from store'}
      }
      // TODO filter in sql
      const checkins = storeRes.result.filter(checkin => userId === checkin.userId);
      const moods = checkins.map(checkin => checkin.mood);
      const medianMood = !!checkins.length ? getMedian(moods) : undefined;
      return {summary: {checkins, medianMood}}
    } catch(e) {
      return {error: e.message}
    }
  }
}
