import {ReqOf} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {expect} from "chai";
import {CheckinHandler} from "./CheckinHandler";
import {AlwaysErrorsCheckinStore, buildCheckin, InMemoryCheckinStore} from "../Store/CheckinStore";

describe('CheckinHandler', () => {
  describe('posts', () => {
    const store = new InMemoryCheckinStore();
    const handler = new CheckinHandler(store);
    it('returns 400 if empty body', async () => {
      const req = ReqOf(Method.POST, '/checkins', JSON.stringify({}));
      const res = await handler.handle(req);
      expect(res.status).to.eql(400)
    });
    it('returns 400 if checkin is missing required field', async () => {
      const incorrectBody = JSON.stringify({checkin: {mood: 'hello', feeling: ['optimistic']}});
      const req = ReqOf(Method.POST, '/checkins', incorrectBody);
      const res = await handler.handle(req);
      expect(res.status).to.eql(400)
    });
    it('passes checkin to store and returns 200 if store successful', async () => {
      const checkin = buildCheckin();
      const body = JSON.stringify({checkin});
      const req = ReqOf(Method.POST, '/checkins', body);
      const res = await handler.handle(req);
      expect(res.status).to.eql(200);
      const storedCheckins = await store.findAll();
      expect(storedCheckins.result).to.eql([checkin])
    });
    it('returns 500 if store errors', async () => {
      const erroringStore = new AlwaysErrorsCheckinStore();
      const handler = new CheckinHandler(erroringStore);
      const checkin = buildCheckin();
      const body = JSON.stringify({checkin});
      const req = ReqOf(Method.POST, '/checkins', body);
      const res = await handler.handle(req);
      expect(res.status).to.eql(500);
      expect(res.bodyString()).to.eql('error storing checkin');
    })
  });
  describe('gets', () => {
    const store = new InMemoryCheckinStore();
    const handler = new CheckinHandler(store);
    it('returns all checkins', async () => {
      const checkin = buildCheckin();
      await store.store(checkin);
      const req = ReqOf(Method.GET, '/checkins');
      const res = await handler.handle(req);
      const body = JSON.parse(res.bodyString());
      expect(res.status).to.eql(200);
      expect(body).to.eql({checkins: [checkin]})
    })
  })
});
