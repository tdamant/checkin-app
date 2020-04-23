import {Checkin, Store} from "./CheckinStore";
import {PostgresDatabase} from "../database/postgres/PostgresDatabase";
import {v4 as uuidv4} from "uuid";

export class SqlCheckinStore implements Store<Checkin> {
  constructor(private db: PostgresDatabase) {
  }
  findAll (): Promise<{ result: Checkin[] | undefined; error?: string }> {
    throw new Error('not implemented')
  };
  async store (checkin: Checkin): Promise<{ result: Checkin | undefined; error?: string }> {
    const id = uuidv4();
    const sql = `INSERT INTO checkins (id, created_at, mood, feeling, comment) VALUES ( '${id}', to_timestamp(${checkin.createdAt/1000}),${checkin.mood}, '{${checkin.feeling}}', '${checkin.comment}') RETURNING *`;
    const {mood, feeling, created_at, comment} = (await this.db.query(sql)).rows[0];
    return {result: {
        mood,
        feeling,
        comment,
        createdAt: created_at.getTime()
      }}
  };
}
