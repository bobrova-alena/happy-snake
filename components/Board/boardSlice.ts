import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../src/store";

const boardAdapter = createEntityAdapter<BoardState>();

type BoardState = {
    count: number,
    gameOver: boolean
}

const initialState = boardAdapter.getInitialState({
  count: 0,
  gameOver: false
});

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        countIncreased (state: BoardState) {
            state.count++;
        },
        finished (state: BoardState) {
            state.gameOver = true;
        },
        resetState (state: BoardState){
            return initialState;
        }
    }
});

export const {
    countIncreased,
    finished,
    resetState
} = boardSlice.actions;

export default boardSlice.reducer;

export const selectCount = (state: RootState) => state.board.count;
export const selectGameOver = (state: RootState) => state.board.gameOver;
