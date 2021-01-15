import Board from '../Board/Board';
import Info from '../Info/Info'
import styles from './Playspot.module.css'
import React from 'react';
import { selectGameStarted } from './playSpotSlice';
import { useSelector } from 'react-redux';
import Start from '../Start/Start';

export default function Playspot(){
    const started = useSelector(selectGameStarted);

    return (
        <div className={styles.playspot}>
            { started ? 
                <>
                    <Board/>
                    <Info/>  
                </>
                : <Start/> }
        </div>
    );
}