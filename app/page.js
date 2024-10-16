"use client"; // このコンポーネントがクライアントコンポーネントであることを示す

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterをnext/navigationからインポート

export default function Home() {
    const router = useRouter(); // useRouterフックを使用
    const [searchTerm, setSearchTerm] = useState(''); // 検索キーワードの状態
    const [products] = useState(Array(8).fill('商品')); // 商品リストの初期化

    const handleProfileClick = () => {
        router.push('/profile'); // プロフィールページに遷移
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // 検索キーワードを更新
    };

    // 検索結果をフィルタリング
    const filteredProducts = products.filter((product) =>
        product.includes(searchTerm) // 検索キーワードが含まれているかチェック
    );

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.icon}>🏠</div>
                <input
                    style={styles.search}
                    type="text"
                    placeholder="検索"
                    value={searchTerm}
                    onChange={handleSearchChange} // 入力が変わったときに呼び出す
                />
                <div style={styles.profileIcon} onClick={handleProfileClick}>
                    👤
                </div>
                <button style={styles.uploadButton}>出品</button>
            </header>

            <section style={styles.popularCategory}>
                <h2>人気カテゴリー</h2>
                <div style={styles.circleContainer}>
                    {["人気 1", "人気 2", "人気 3", "人気 4", "人気 5"].map((item, index) => (
                        <div key={index} style={styles.circle}>
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section style={styles.products}>
                <h2>商品</h2>
                <div style={styles.productGrid}>
                    {filteredProducts.map((product, index) => (
                        <div key={index} style={styles.productBox}>{product}</div> // 検索結果を表示
                    ))}
                </div>
            </section>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f0f8ff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    // 家のアイコン
    icon: {
        fontSize: '100px',
    },
    // 検索
    search: {
        padding: '8px',
        width: '400px',
    },
    // 人間アイコン
    profileIcon: {
        fontSize: '100px',
        cursor: 'pointer', // クリック可能にする
    },
    // 出品ボタン
    uploadButton: {
        backgroundColor: '#ff5c5c',
        color: 'white',
        padding: '25px 50px',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
    },
    popularCategory: {
        marginBottom: '20px',
    },
    circleContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    circle: {
        width: '200px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#d3d3d3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    products: {
        marginBottom: '20px',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
    },
    productBox: {
        width: '400px',
        height: '300px',
        backgroundColor: '#d3d3d3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
