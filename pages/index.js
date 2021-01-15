import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Playspot from '../components/Playspot/Playspot';
import Footer from '../components/Footer/Footer';
import Title from '../components/Title/Title';
import Start from '../components/Start/Start';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '../src/store';

export default function Home() {
    const gameTitleStr = 'Happy Snake';
    

    return (
        <Provider store={store}>
            <Head>
                <title>{gameTitleStr}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.auto}/>
                <Title/>
                <Playspot/>
                <div className={styles.auto}/>
                <Footer/>
            </div>
        </Provider>
    )
}
