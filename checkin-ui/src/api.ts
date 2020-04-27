import {Checkin, CheckinSummary} from "./types";

export const saveCheckin = async (checkin: Checkin): Promise<{ saved: boolean }> => {
  const res = await fetch('/checkins', {
    method: 'POST',
    body: JSON.stringify({checkin}),
  });
  return {saved: res.status === 200}
};


export const fetchCheckins = async (userId: string): Promise<{result?: CheckinSummary, error?: string}> => {
  try {
    const apiResponse = await fetch(`/checkins?userId=${userId}`, {method: 'GET'});
    const status = apiResponse.status;
    if (status !== 200) {
      return {error: `non 200 status code from api: ${status}`}
    }
    const {checkins, medianMood} = await apiResponse.json();
    return {result: {checkins, medianMood}}
  } catch (e) {
    return {error: e}
  }
};
