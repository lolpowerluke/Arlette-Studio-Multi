import styles from './style.module.css';

export default function Byb() {
    return (
        <div className={styles.bybWrapper}>
            <div className="buildYourBuggy">
                {/*
                todo OFWEL: complete redo in only code  //mijn voorkeur
                todo OFWEL: one solid img for that bs
                */}
                <img className={styles.bybImage1} src="../../../assets/Header1.svg"></img>
                {/*<img className={styles.bybImage2} src="../../../assets/Header2.svg"></img>*/}


            </div>
        </div>
    )
}