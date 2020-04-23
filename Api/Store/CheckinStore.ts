export enum Feeling {
  depressed = 'depressed',
  optimistic = 'optimistic',
  bored = 'bored',
  happy = 'happy'
}

export type Checkin = {
  mood: number;
  feeling: Feeling[];
  comment?: string
}
export const buildCheckin = (partialCheckin: Partial<Checkin> = {}): Checkin => {
  const defaultCheckin = {
    feeling: [Feeling.bored],
    mood: 4,
    comment: 'feeling up and down today'
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

}

export class AlwaysErrorsCheckinStore implements Store<Checkin> {
  async findAll(): Promise<{ result: Checkin[] | undefined; error?: string }> {
    throw new Error('error finding all')
  };

  async store(t: Checkin): Promise<{ result: Checkin | undefined; error?: string }> {
    return {result: undefined, error: 'error storing'}
  };
}
