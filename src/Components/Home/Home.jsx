import React from "react";
import styles from "./Home.module.css";
import greenplant from "../../Assets/images/greenplant.png";

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>مرحباً بك في عالم النباتات الأخضر</h1>
                    <p className={styles.description}>اكتشف عالماً من النباتات الجميلة واعتني بها بأفضل الطرق</p>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={greenplant} alt="Green Plant" className={styles.plantImage} />
                </div>
            </div>
        </div>
    );
}