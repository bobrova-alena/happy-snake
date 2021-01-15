import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { started } from '../Playspot/playSpotSlice';
import Info from '../Info/Info';
import styles from './Start.module.css';

export default function Start() {
    const dispatch = useDispatch();
    let playBtnStr = 'Play';

    return (
        <div className={styles.start}>
            <Button variant="outline-success" className={styles.playBtn} onClick={()=>dispatch(started())} >{playBtnStr}</Button>
            <Info/>    
        </div>
    );
}