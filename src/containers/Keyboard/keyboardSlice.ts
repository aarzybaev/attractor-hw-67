import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DoorPass {
  passCode: number;
  isCorrect: boolean | undefined;
}

const initialState: DoorPass = {
  passCode: 1337,
  isCorrect: undefined
};

export const keyboardSlice = createSlice({
  name: 'keyboardPass',
  initialState,
  reducers: {
    checkPass: (state, action: PayloadAction<number>) => {
      state.isCorrect = (state.passCode === action.payload);
    },
    setStatus: (state, action: PayloadAction<undefined | boolean>) => {
      state.isCorrect = action.payload;
    }
  }
});


export const keyboardReducer = keyboardSlice.reducer;
export const {checkPass, setStatus} = keyboardSlice.actions;
