import {SqlCheckinStore} from "./SqlCheckinStore";
import {PostgresTestServer} from "../database/postgres/PostgresTestServer";
import {PostgresDatabase} from "../database/postgres/PostgresDatabase";
import {buildCheckin} from "./CheckinStore";
import { expect } from "chai";

describe('SqlCheckinStore', () => {
  describe('store', function () {
    this.timeout(30000);
    let checkinStore: SqlCheckinStore;
    const testPostgresServer = new PostgresTestServer();
    let database: PostgresDatabase;

    before(async () => {
      database = await testPostgresServer.startAndGetDb();
      checkinStore = new SqlCheckinStore(database);
    });

    after(async () => {
      await testPostgresServer.stop();
    });

    afterEach(async() => {
      await database.query('TRUNCATE TABLE checkins CASCADE;')
    });
    it('stores a checkin', async () => {
      const now = new Date('2020-01-01').getTime();
      const checkin = buildCheckin({createdAt: now});
      await checkinStore.store(checkin);
      const rows = (await database.query('select * from checkins')).rows;
      expect(rows[0].mood).to.eql(checkin.mood);
      expect(rows[0].feeling).to.eql(checkin.feeling);
      expect(rows[0].comment).to.eql(checkin.comment);
      expect(rows[0].created_at.getTime()).to.eql(checkin.createdAt);
    });
    it('returns the checkin if successfully inserted', async () => {
      const now = new Date('2020-01-01').getTime();
      const checkin = buildCheckin({createdAt: now});
      const storeResponse = await checkinStore.store(checkin);
      expect(storeResponse).to.eql({
        result: checkin
      })
    })
  })
});
