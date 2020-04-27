import {v4 as uuidv4} from "uuid";
import {moodRange} from "../../../checkin-ui/src/types";

export enum Feeling {
  depressed = 'depressed',
  optimistic = 'optimistic',
  bored = 'bored',
  happy = 'happy'
}

export type Checkin = {
  mood: number;
  feeling: Feeling[];
  createdAt: number
  userId: string;
  comment?: string;
}
export const buildCheckin = (partialCheckin: Partial<Checkin> = {}): Checkin => {
  const defaultCheckin = {
    feeling: [Feeling.bored],
    mood: Math.floor(Math.random() * moodRange.max + 1),
    comment: 'feeling up and down today',
    createdAt: Date.now(),
    userId: uuidv4()
  };
  return {...defaultCheckin, ...partialCheckin}
};

export interface Store<T> {
  store: (t: T) => Promise<{ result: T | undefined, error?: string }>
  findAll: () => Promise<{ result: T[] | undefined, error?: string }>
}

export class InMemoryCheckinStore implements Store<Checkin> {
  constructor(private checkins: Checkin[] = []) {
  }

  async store(checkin: Checkin): Promise<{ result: Checkin, error?: string }> {
    this.checkins.push(checkin);
    return {result: checkin}
  };

  async findAll(): Promise<{ result: Checkin[] | undefined, error?: string }> {
    return {result: this.checkins}
  };

  async storeAll(newCheckins: Checkin[]) {
    newCheckins.forEach(checkin => this.checkins.push(checkin))
  }

}

export class AlwaysErrorsCheckinStore implements Store<Checkin> {
  async findAll(): Promise<{ result: Checkin[] | undefined; error?: string }> {
    throw new Error('error finding all')
  };

  async store(t: Checkin): Promise<{ result: Checkin | undefined; error?: string }> {
    return {result: undefined, error: 'error storing'}
  };
}
