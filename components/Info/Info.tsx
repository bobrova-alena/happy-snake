import { selectCount, selectGameOver } from '../Board/boardSlice';
import { useSelector } from 'react-redux';
import { selectGameStarted } from '../Playspot/playSpotSlice';
import styles from './Info.module.css'
import MobileDetect from 'mobile-detect';
import { useEffect, useState } from 'react';

export default function Info(){
    const count = useSelector(selectCount);
    const gameOver = useSelector(selectGameOver);
    const started = useSelector(selectGameStarted);
    const [isMobile, setIsMobile] = useState(false);
    

    useEffect(()=>{
        var detector = new MobileDetect(navigator.userAgent);
        if(detector.mobile())
            setIsMobile(true);
    }, []);

    const rulesStr = `The purpose of the game is to ate as many apples as possible. ${isMobile ? 'Swipe left, right, up or down on the field' : 'Press left, right, up or down keys'} to turn the snake. After every eaten apple length and speed of the snake will grow. Good luck!`;
    const countStr = `Count of apples: ${count}`;
    
    return (
        <div className={styles.info}>
            {started ? 
                <div className={styles.count}>{countStr}</div> :
                <div className={styles.rules}>{rulesStr}</div>
            }
        </div>
    );
}