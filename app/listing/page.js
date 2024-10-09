'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Listing.module.css'

const  ListingForm = () => {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // 出品処理をここに追加
    console.log({
      productName,
      productDetails,
      category,
      price,
      location
    });
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
                value={selectedValue} 
                onChange={handleChange}
                className={
                    styles.input
                }
            >
                <option value="option1">オプション 1</option>
                <option value="option2">オプション 2</option>
                <option value="option3">オプション 3</option>
            </select>
            <p>選択された値: {selectedValue}</p>
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

// const styles = {
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   backButton: {
//     fontSize: '20px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   imageBox: {
//     width: '500px',
//     height: '500px',
//     backgroundColor: '#d3d3d3',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: '24px',
//     marginRight: '20px',
//   },
//   form: {
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   inputGroup: {
//     marginBottom: '20px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     marginTop: '5px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   },
//   textarea: {
//     width: '100%',
//     height: '100px',
//     padding: '10px',
//     fontSize: '16px',
//     marginTop: '5px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   },
//   submitButton: {
//     backgroundColor: '#ff5c5c',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     marginBottom: '20px',
//   },
// };