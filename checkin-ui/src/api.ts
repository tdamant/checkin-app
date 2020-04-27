import {Checkin, CheckinSummary} from "./types";

export const saveCheckin = async (checkin: Checkin): Promise<{ saved: boolean }> => {
  const res = await fetch('/checkins', {
    method: 'POST',
    body: JSON.stringify({checkin}),
  });
  return {saved: res.status === 200}
};


export const fetchCheckins = async (userId: string): Promise<CheckinSummary | undefined> => {
  try {
    const apiResponse = await fetch(`/checkins?userId=${userId}`, {method: 'GET'});
    if (apiResponse.status !== 200) {
      return undefined
    }
    const {checkins, medianMood} = await apiResponse.json();
    const validData = !!checkins.length && !!medianMood;
    return validData ? {checkins, medianMood} : undefined
  } catch (ignore) {}
};
