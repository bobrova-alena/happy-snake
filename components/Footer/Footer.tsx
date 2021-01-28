import styles from './Footer.module.css';
import { useSelector } from 'react-redux';
import { selectGameStarted } from '../Playspot/playSpotSlice';

export default function Footer () {
    const authorStr = 'Written by Alena Bobrova';
    const started = useSelector(selectGameStarted);

    return (
        <>
            { started ? <div/> :
                <div className={styles.footer}>
                    <div className={styles.text} >{authorStr}</div>
                </div>
            }
        </>
    );
}