import { useRef, useState } from 'react';
import styles from './style.module.css';

export default function Byb() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [top, setTop] = useState(0);

    function handleExpand() {
        const rect = wrapperRef.current?.getBoundingClientRect();
        setTop(rect ? Math.max(rect.top, 0) : 0);
        setExpanded(true);
    }

    return (
        <div
            ref={wrapperRef}
            className={`${styles.bybWrapper} ${expanded ? styles.expanded : ""}`}
            style={expanded ? { top, height: `calc(100vh - ${top}px)` } : undefined}
        >
            {expanded && (
                <button
                    type="button"
                    className={`btn ${styles.backBtn}`}
                    onClick={() => setExpanded(false)}
                >
                    ← Terug
                </button>
            )}
            <div className={styles.byb} id="byb">
                <button
                    type="button"
                    className={styles.buggy}
                    onClick={handleExpand}
                >
                    <img src="https://placehold.co/200" alt="buggy placeholder"/>
                    <span>Klik hier</span>
                </button>
            </div>
        </div>
    )
}
