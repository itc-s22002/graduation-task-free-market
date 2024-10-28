'use client'

import React from "react";
import styles from "./styles/Home.module.css"
import Header from "@/components/header";
import List from "@/components/List";
import { useRouter } from 'next/navigation';


const Home = () => {
  const router = useRouter();

  const categoryselect = [
    { name: "ファッション" },
    { name: "家電・デジタル機器" },
    { name: "家具インテリア" },
    { name: "ホビー・本" },
    { name: "スポーツ・アウトドア" },
    { name: "美容・健康" },
    { name: "チケット・サービズ" },
    { name: "その他" },
  ];
  
  return (
    <div className={styles.container}>
      <Header/>
      <section className={styles.popularCategory}>
        <h2>人気カテゴリー</h2>
        <div className={styles.circleContainer}>
          {categoryselect.map(
            ({name}, index) => (
              <div key={index} className={styles.circle} onClick={() => router.push(`/list?category=${name}`)}>
                {name}
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