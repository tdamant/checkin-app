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
      const checkin = buildCheckin({});
      await checkinStore.store(checkin);
      const result = await database.query('select * from checkins');
      expect(result.rows).to.eql([])
    })
  })
});
