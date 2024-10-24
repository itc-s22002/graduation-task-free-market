"use client"; // クライアントサイドで動作することを明示

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterフックをnext/navigationからインポート
import Link from 'next/link'; // Linkコンポーネントをインポート

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
                    {["category1", "category2", "category3", "category4", "category5"].map((category, index) => (
                        <Link href={`/category/page.js`} key={index}>
                            <div style={styles.circle}>
                                {`人気 ${index + 1}`}
                            </div><Link href={`/category/page.js`}></Link>

                        </Link>
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
        marginBottom: '30px',
    },
    icon: {
        fontSize: '150px',
    },
    search: {
        padding: '20px',
        width: '500px',
        fontSize: '30px',
    },
    profileIcon: {
        fontSize: '150px',
        cursor: 'pointer', // クリック可能にする
    },
    uploadButton: {
        backgroundColor: '#ff5c5c',
        color: 'white',
        padding: '50px 200px',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '30px',
    },
    popularCategory: {
        marginBottom: '50px',
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
        cursor: 'pointer',
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
