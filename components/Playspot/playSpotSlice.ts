import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../src/store";

const gameAdapter = createEntityAdapter<GameState>();

type GameState = {
    started: boolean
}

const initialState = gameAdapter.getInitialState({
    started: false
});

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        started (state: GameState) {
            state.started = true;
        }
    }
});

export const {
    started
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectGameStarted = (state: RootState) => state.game.started;

