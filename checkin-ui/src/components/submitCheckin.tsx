import React, {useState} from "react";
import {Feeling} from "../types";
import {useHistory} from "react-router-dom";
import styled from "styled-components";


const Container = styled.div `
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  margin: 40px auto;
`;

const MoodInput = styled.div`
`;

export const SubmitCheckin = ({userId}: {userId: string}) => {
  const [checkinInput, setCheckinInput] = useState<{ mood?: number, feeling?: string[], comment?: string, userId: string }>({userId});
  const history = useHistory();

  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mood = Number(e.currentTarget.value);
    setCheckinInput({...checkinInput, mood: mood})
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.currentTarget.value;
    setCheckinInput({...checkinInput, comment})
  };

  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = e.currentTarget.value;
    const checked = e.currentTarget.checked;
    const existingFeelings = checkinInput.feeling || [];
    if(checked) {
      existingFeelings.push(feeling);
      setCheckinInput({...checkinInput, feeling: existingFeelings})

    } else {
      const newArr = existingFeelings.filter(existing => existing !== feeling);
      setCheckinInput({...checkinInput, feeling: newArr})
    }
  };

  const submitForm = async () => {
    const body = JSON.stringify({
      checkin: {...checkinInput, createdAt: Date.now()}
    });
    const res = await fetch('/checkins', {
      method: 'POST',
      body,
    });
    const resBody = await res.json();
  };

  return (
    <Container>
      <MoodInput>
        <label>
          What is your mood (1 low 7 high)
          <input name='mood' type='range' min='1' max='7' onChange={handleMoodChange}/>
          <div>{checkinInput.mood}</div>
        </label>
      </MoodInput>
      <input type='checkbox' value={Feeling.happy} onChange={handleFeelingChange}/>
      <input type='checkbox' value={Feeling.bored} onChange={handleFeelingChange}/>
      <input type='checkbox' value={Feeling.depressed} onChange={handleFeelingChange}/>
      <input type='checkbox' value={Feeling.optimistic} onChange={handleFeelingChange}/>
      <input name='comment' type='text' onChange={handleCommentChange}/>
      <button onClick={submitForm}>Submit</button>
      <button onClick={() => history.push('/results')}>View previous check ins</button>
    </Container>
  )
};
