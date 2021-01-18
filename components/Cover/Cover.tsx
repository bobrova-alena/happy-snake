import Button from 'react-bootstrap/Button';
import styles from './Cover.module.css';

type CoverProps = {
    handleOnClick: () => void;
}

export default function Cover(props: CoverProps) {
    let playBtnStr = 'Play';

    return (
        <div className={styles.cover}>
            <div className={styles.auto}/>
            <Button variant="outline-success" className={styles.playBtn} onClick={()=>props.handleOnClick()} >{playBtnStr}</Button>
            <div className={styles.auto}/>
        </div>
    );
}