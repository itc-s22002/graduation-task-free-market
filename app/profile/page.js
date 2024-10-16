"use client";

import React, { useState, useEffect } from 'react'; // useStateをインポート
import { useRouter } from 'next/navigation'; // useRouterをnext/navigationからインポート

export default function Profile() {
    const router = useRouter(); // useRouter フックを使う
    const [name, setName] = useState(''); // 名前の状態
    const [studentId, setStudentId] = useState(''); // 学籍番号の状態
    const [school, setSchool] = useState(''); // 所属校の状態
    // const [profileInfo, setProfileInfo] = useState(null); // プロフィール情報を保持する状態

    const handleHomeClick = () => {
        router.push('/'); // ホームに戻る
    };

    const [profileInfo, setProfileInfo] = useState({
        name: '',
        studentId: '',
        school: ''
    });

    // コンポーネントがマウントされた時にlocalStorageからデータを読み込む
    useEffect(() => {
        const savedProfile = localStorage.getItem('profileInfo');
        if (savedProfile) {
            setProfileInfo(JSON.parse(savedProfile));
        }
    }, []);

    const handleSave = () => {

        localStorage.setItem('profileInfo', JSON.stringify(profileInfo));

        // 入力内容をコンソールに出力
        console.log('名前:', name);
        console.log('学籍番号:', studentId);
        console.log('所属校:', school);

        setProfileInfo({ name, studentId, school });

        // 実際の保存処理はここに追加できます（例: Firebaseへの保存）

        // 入力をリセット
        setName('');
        setStudentId('');
        setSchool('');
    };

    useEffect(() => {
        const savedProfile = localStorage.getItem('profileInfo');
        if (savedProfile) {
            setProfileInfo(JSON.parse(savedProfile));
        }
    }, []);


    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.icon} onClick={handleHomeClick}>
                    👤
                </div>
                {/*<h1 style={styles.title}>プロフィール</h1>*/}
                <h1 style={styles.title}>
                    プロフィール(PROFILE)
                    {profileInfo && (
                        <span style={styles.profileDetails}>
                            <>
                            <br /> {/* 改行を追加 */}
                            </>
                            名前: {profileInfo.name} 学籍番号: {profileInfo.studentId} 所属校: {profileInfo.school}
        </span>
                    )}
                </h1>

            </header>

            <section style={styles.profileSection}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>名前</label>
                    <input style={styles.input}
                           type="text"
                           placeholder="名前を入力"
                           value={name} // 状態をバインド
                           onChange={(e) => setName(e.target.value)} // 入力内容を状態に保存
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>学籍番号</label>
                    <input style={styles.input}
                           type="text"
                           placeholder="学籍番号を入力"
                           value={studentId} // 状態をバインド
                           onChange={(e) => setStudentId(e.target.value)} // 入力内容を状態に保存
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>所属校</label>
                    <input style={styles.input}
                           type="text"
                           placeholder="所属校を入力"
                           value={school} // 状態をバインド
                           onChange={(e) => setSchool(e.target.value)} // 入力内容を状態に保存
                    />
                </div>
                <button style={styles.saveButton} onClick={handleSave}>保存</button> {/* 保存ボタン */}

            </section>

            <section style={styles.productsSection}>
                <h2>商品</h2>
                <div style={styles.productGrid}>
                    {Array(6).fill(null).map((_, index) => (
                        <div key={index} style={styles.productBox}></div>
                    ))}
                </div>

                <button onClick={handleSave} style={styles.saveButton}>保存</button>

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
        justifyContent: 'start',
        alignItems: 'center',
        marginBottom: '20px',
    },
    // 家のアイコン
    icon: {
        fontSize: '200px',
        marginRight: '20px',
        cursor: 'pointer',
    },
    // プロフィールタイトル
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
    },
    profileSection: {
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        fontSize: '20px',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    productsSection: {
        marginTop: '20px',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
    },
    productBox: {
        width: '250px',
        height: '250px',
        backgroundColor: '#d3d3d3',
    },
};
