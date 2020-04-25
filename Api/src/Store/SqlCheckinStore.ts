import {Checkin, Store} from "./CheckinStore";
import {PostgresDatabase} from "../database/postgres/PostgresDatabase";
import {v4 as uuidv4} from "uuid";

export class SqlCheckinStore implements Store<Checkin> {
  constructor(private db: PostgresDatabase) {
  }

  async findAll(): Promise<{ result: Checkin[] | undefined; error?: string }> {
    const sql = `SELECT * FROM checkins`;
    const rows = (await this.db.query(sql)).rows;
    const checkins = rows.map(({mood, created_at, feeling, comment, user_id}) => (
      {
        mood,
        createdAt: created_at.getTime(),
        feeling,
        comment,
        userId: user_id
      }));
    return {result: checkins}

  };

  async store(checkin: Checkin): Promise<{ result: Checkin | undefined; error?: string }> {
    const id = uuidv4();
    const sql = `INSERT INTO checkins (id, created_at, mood, feeling, comment, user_id) VALUES ( '${id}', to_timestamp(${checkin.createdAt / 1000}),${checkin.mood}, '{${checkin.feeling}}', '${checkin.comment}', '${checkin.userId}') RETURNING *`;
    const {mood, feeling, created_at, comment, user_id} = (await this.db.query(sql)).rows[0];
    return {
      result: {
        mood,
        feeling,
        comment,
        createdAt: created_at.getTime(),
        userId: user_id
      }
    }
  };
}
