import { selectCount, selectGameOver } from '../Board/boardSlice';
import { useSelector } from 'react-redux';
import { selectGameStarted } from '../Playspot/playSpotSlice';
import styles from './Info.module.css'

export default function Info(){
    const count = useSelector(selectCount);
    const gameOver = useSelector(selectGameOver);
    const started = useSelector(selectGameStarted);
    const rulesStr = 'The purpose of the game is to ate as many apples as possible. Use arrow keys to direct the snake. After every eaten apple length and speed of the snake will grow. Good luck!';
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