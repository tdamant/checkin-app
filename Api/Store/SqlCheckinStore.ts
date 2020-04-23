import {Checkin, Store} from "./CheckinStore";
import {PostgresDatabase} from "../database/postgres/PostgresDatabase";

export class SqlCheckinStore implements Store<Checkin> {
  constructor(db: PostgresDatabase) {
  }
  findAll (): Promise<{ result: Checkin[] | undefined; error?: string }> {
    throw new Error('not implemented')
  };
  store (t: Checkin): Promise<{ result: Checkin | undefined; error?: string }> {
    throw new Error('not implemented')
  };
}
