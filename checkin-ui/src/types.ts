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
  comment?: string;
}
