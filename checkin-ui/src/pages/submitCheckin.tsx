import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {MoodInput} from "../components/moodInput";
import {FeelingInput} from "../components/feelingInput";
import {GenericButton} from "../components/genericButton";
import {saveCheckin} from "../api";
import {Checkin} from "../types";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  align-items: center;
  margin: 40px auto;
  text-align: center;
`;

const Comment = styled.textarea`
  width: 80%;
  height: 100px;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 24px;
  text-align: center;
`;


export type CheckinInput = { mood?: number, feeling?: string[], comment?: string, userId: string };

export const SubmitCheckin = ({userId}: { userId: string }) => {
  const [checkinInput, setCheckinInput] = useState<CheckinInput>({userId});
  const history = useHistory();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.currentTarget.value;
    setCheckinInput({...checkinInput, comment})
  };

  const validateInput = (input: Partial<CheckinInput>): Boolean => {
    const setFeeling = !!input.feeling?.length;
    return setFeeling && !!input.mood && !!input.userId
  };

  const submitCheckin = async () => {
    const isValid = validateInput(checkinInput);
    if (!isValid) {
      alert('Please enter your mood (remember to hit set) and choose one or more of the feelings')
      return
    }
    const {saved} = await saveCheckin({...checkinInput, createdAt: Date.now()} as Checkin);
    if (!saved) {
      alert('something went wrong saving your checkin, please try again later');
      return
    }
    history.push('/results')
  };

  return (
    <Container>
      <MoodInput setMoodFn={(mood) => {
        setCheckinInput({...checkinInput, mood})
      }}/>
      <FeelingInput setFeelingFn={(feeling: string[]) => {
        setCheckinInput({...checkinInput, feeling})
      }}/>
      <Comment onChange={handleCommentChange} placeholder={'Any comments?'}/>
      <GenericButton onClick={submitCheckin} text='Submit'/>
      <GenericButton dimensions={{height: 48}} onClick={() => history.push('/results')} text='View previous checkins'/>
    </Container>
  )
};
