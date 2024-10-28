"use client"; // クライアントコンポーネントとして指定

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { app } from "../../firebaseConfig";

const db = getFirestore(app);

export default function Profile() {
    const router = useRouter();
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        studentId: '',
        school: '',
    });
    const [isSaved, setIsSaved] = useState(false); // 保存成功フラグ

    // プロフィール情報の取得
    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, 'users', '1'); // user_id 1 のデータを取得
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfileInfo({
                    name: data.name || '',
                    studentId: data.student_id || '',
                    school: data.school || '',
                });
            } else {
                console.log('No such document!');
            }
        };

        fetchProfile();
    }, []);

    // フォームの入力を変更したときの処理
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 保存ボタンがクリックされたときの処理
    const handleSave = async () => {
        try {
            const docRef = doc(db, 'users', '1'); // user_id 1 のデータを保存
            await setDoc(docRef, {
                name: profileInfo.name,
                student_id: profileInfo.studentId,
                school: profileInfo.school,
            }, { merge: true });
            alert('プロフィールが保存されました！');
            setIsSaved(true); // 保存成功フラグを更新
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('プロフィールの保存に失敗しました。');
        }
    };

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.icon} onClick={handleHomeClick}>
                    👤
                </div>
                <h1 style={styles.title}>プロフィール(PROFILE)</h1>
                {isSaved && ( // 保存後に名前、学籍番号、所属校を表示
                    <div style={styles.profileDetails}>
                        <span style={styles.profileName}>{profileInfo.name}</span>
                        <span style={styles.profileSchool}>{profileInfo.school}</span>
                        <span style={styles.profileStudentId}>{profileInfo.studentId}</span>
                    </div>
                )}
            </header>

            <section style={styles.profileSection}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>名前</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="名前を入力"
                        value={profileInfo.name}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>学籍番号</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="studentId"
                        placeholder="学籍番号を入力"
                        value={profileInfo.studentId}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>所属校</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="school"
                        placeholder="所属校を入力"
                        value={profileInfo.school}
                        onChange={handleChange}
                    />
                </div>
            </section>

            <button style={styles.saveButton} onClick={handleSave}>
                保存
            </button>
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
    icon: {
        fontSize: '80px',
        marginRight: '20px',
        cursor: 'pointer',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
    },
    profileDetails: {
        display: 'flex',
        flexDirection: 'column', // 縦に並べる
        marginLeft: '20px', // アイコンとのスペース
    },
    profileName: {
        fontSize: '24px',
        color: '#333',
    },
    profileSchool: {
        fontSize: '18px',
        color: '#555',
    },
    profileStudentId: {
        fontSize: '18px',
        color: '#555',
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
        fontSize: '18px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
    },
};
