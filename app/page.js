import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.icon}>
          <Image
            src="/home.png" // publicフォルダ内の画像ファイルパス
            alt="サンプル画像"
            width={50} // 必須: 画像の幅を指定
            height={50} // 必須: 画像の高さを指定
          />
        </div>
        <input style={styles.search} type="text" placeholder="検索" />
        <div style={styles.profileIcon}>
          <Image
            src="/people.png" // publicフォルダ内の画像ファイルパス
            alt="サンプル画像"
            width={50} // 必須: 画像の幅を指定
            height={50} // 必須: 画像の高さを指定
          />
        </div>
        <button style={styles.uploadButton}>出品</button>
      </header>

      <section style={styles.popularCategory}>
        <h2>人気カテゴリー</h2>
        <div style={styles.circleContainer}>
          {["人気 1", "人気 2", "人気 3", "人気 4", "人気 5"].map(
            (item, index) => (
              <div key={index} style={styles.circle}>
                {item}
              </div>
            )
          )}
        </div>
      </section>

      <section style={styles.products}>
        <h2>商品</h2>
        <div style={styles.productGrid}>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div key={index} style={styles.productBox}></div>
            ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f0f8ff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  // 家のアイコン
  icon: {
    fontSize: "50px",
  },
  // 検索
  search: {
    padding: "8px",
    width: "400px",
  },
  // 人間アイコン
  profileIcon: {
    fontSize: "70px",
  },
  // 出品ボタン
  uploadButton: {
    backgroundColor: "#ff5c5c",
    color: "white",
    padding: "25px 50px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
  },
  popularCategory: {
    marginBottom: "20px",
  },
  circleContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  circle: {
    width: "200px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#d3d3d3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  products: {
    marginBottom: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  productBox: {
    width: "400px",
    height: "300px",
    backgroundColor: "#d3d3d3",
  },
};
