'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Listing.module.css'

import { collection, addDoc, getFirestore, serverTimestamp} from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const db = getFirestore(app)


const  ListingForm = () => {
  const [productName, setProductName] = useState('');//商品名
  const [productDetails, setProductDetails] = useState('');//商品の詳細
  const [category, setCategory] = useState('option1');//カテゴリー
  const [price, setPrice] = useState('');//金額
  const [location, setLocation] = useState('');//受取場所


  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    // 出品処理をここに追加
    console.log({
      name:productName,
      description:productDetails,
      category,
      price,
      statas:"販売中",
      receive:location,
    });

    try {
      // "Produts"というコレクションにデータを追加
      const docRef = await addDoc(collection(db, 'Produts'), {
        productName,
        productDetails,
        category,
        price:Number(price),
        location,
        statas:"販売中",
        create_at:serverTimestamp(),
        seller_id:1
      });
      console.log(docRef.id)
      alert('データがアップロードされました');
      setProductName('')
      setProductDetails('')
      setCategory('option1')
      setPrice('')
      setLocation('')
    } catch (error) {
      console.error('エラーが発生しました:', error);
      alert('データのアップロードに失敗しました');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton}>&lt;</button>
      <div className={styles.imageBox}>
        <span>
            <div>
            <Image
                src="/amaebi_computer.png"
                width={800}
                height={800}
                layout="responsive"
                className={styles.image}
                alt="商品画像"
            />
            </div>
        </span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>商品名と詳細</label>
          <input
            type="text"
            placeholder="商品名"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="商品詳細"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.submitButton}>出品</button>

        <div className={styles.inputGroup}>
            <label htmlFor="dropdown">カテゴリー</label>
            <select 
                id="dropdown" 
                value={category} 
                onChange={handleChange}
                className={
                    styles.input
                }
            >
                <option value="option1">オプション 1</option>
                <option value="option2">オプション 2</option>
                <option value="option3">オプション 3</option>
            </select>
            <p>選択された値: {category}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>出品金額</label>
          <input
            type="text"
            placeholder="出品金額記入"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>受取受取方法</label>
          <input
            type="text"
            placeholder="受取場所"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
      </form>
    </div>
  );
}

export default ListingForm