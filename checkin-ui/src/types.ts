export const moodRange = {
  min: 1,
  max: 7
};

export enum Feeling {
  depressed = 'depressed',
  optimistic = 'optimistic',
  bored = 'bored',
  happy = 'happy'
}

export type Checkin = {
  userId: string;
  mood: number;
  feeling: Feeling[];
  createdAt: number
  comment?: string;
}

export type CheckinSummary = {
  checkins: Checkin[];
  medianMood: number
}
