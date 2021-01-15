import { configureStore } from "@reduxjs/toolkit";
import boardReducer from '../components/Board/boardSlice';
import gameReducer from '../components/Playspot/playSpotSlice'

const store = configureStore({
    reducer: {
        board: boardReducer,
        game: gameReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;