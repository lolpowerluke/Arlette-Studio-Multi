import styles from './style.module.css';

export default function Byb() {
    return (
        <div className={styles.bybWrapper}>
            <div className="buildYourBuggy">
                <img className={styles.bybImage1} src="./assets/Header1.svg"></img>
                <img className={styles.bybImage2} src="./assets/Header2.svg"></img>
            </div>
        </div>
    )
}