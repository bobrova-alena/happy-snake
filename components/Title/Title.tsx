import styles from './Title.module.css';

export default function Title() {
    const gameTitleStr = 'Happy Snake';

    return (
        <div className={styles.titleContainer}>
            <img src="/images/snake.png" className={styles.snakeImage} alt='Snake'/>
            <div className={styles.textContainer}>
                <div className={styles.title}>{gameTitleStr}</div>
            </div>
        </div>
    );
}