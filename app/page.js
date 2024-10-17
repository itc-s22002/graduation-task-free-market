'use client'

import React from "react";
import Image from "next/image";
import styles from "./styles/Home.module.css"
import Header from "@/components/header";
import List from "@/components/List";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <section className={styles.popularCategory}>
        <h2>人気カテゴリー</h2>
        <div className={styles.circleContainer}>
          {["人気 1", "人気 2", "人気 3", "人気 4", "人気 5"].map(
            (item, index) => (
              <div key={index} className={styles.circle}>
                {item}
              </div>
            )
          )}
        </div>
      </section>

      <section className={styles.products}>
        <h2>商品</h2>
        <List/>
      </section>
    </div>
  );
}
export default Home