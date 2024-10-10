'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/Listing.module.css'

import { collection, addDoc, getFirestore, serverTimestamp} from 'firebase/firestore';
import { app } from '../../firebaseConfig';

import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import LoginModal from '@/components/loginModal';
import { getAuth,onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app) 

const  ListingForm = () => {
  const [productName, setProductName] = useState('');//商品名
  const [productDetails, setProductDetails] = useState('');//商品の詳細
  const [category, setCategory] = useState('ファッション');//カテゴリー
  const [price, setPrice] = useState('');//金額
  const [location, setLocation] = useState('');//受取場所

  const [image, setImage] = useState(null);  // 選択された画像ファイルを保存
  const [previewUrl, setPreviewUrl] = useState('');  // プレビュー用の画像URL

  const [isModalOpen, setIsModalOpen] = useState(false); //ログインモーダル

  const [user, setUser] = useState(null);//ユーザー情報
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログインしている場合
        setUser(user);
      } else {
        // ログインしていない場合
        setUser(null);
        setIsModalOpen(true);
      }
      setLoading(false);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  const categoryselect = [
    {name:"ファッション"},
    {name:"家電・デジタル機器"},
    {name:"家具インテリア"},
    {name:"ホビー・本"},
    {name:"スポーツ・アウトドア"},
    {name:"美容・健康"},
    {name:"チケット・サービズ"},
    {name:"その他"}
  ]

  //画像の選択
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);  // 選択されたファイルを保存

      // FileReaderを使って画像のプレビューを表示
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);  // 読み込んだ画像データURLを設定
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  //出品商品情報をアップロート
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
    if (!image) {
      alert('画像を選択してください');
      return;
    }

    if(!productName && !productDetails && !price && !location){
      alert('入力されていない項目があります');
      return;
    }
    // Firebase Storageの参照を作成
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      // Firebase Storageに画像をアップロード
      await uploadBytes(storageRef, image);
      console.log('画像がアップロードされました');

      // アップロードした画像のURLを取得
      const downloadURL = await getDownloadURL(storageRef);

      //Firebaseにデータの送信
      const docRef = await addDoc(collection(db, 'Produts'), {
        productName,
        productDetails,
        category,
        price:Number(price),
        location,
        statas:"販売中",
        create_at:serverTimestamp(),
        image:downloadURL,
        seller_id:user.email
      });

      //入力を空にする
      alert('データがアップロードされました');
      setProductName('')
      setProductDetails('')
      setCategory('option1')
      setPrice('')
      setLocation('')
      setPreviewUrl('')
      setImage('')


    } catch (error) {
      console.error('アップロード中にエラーが発生しました:', error);
      alert('アップロードに失敗しました。');
    }
  };

  //ログインモーダルの表示
  const openModal = () => {
    setIsModalOpen(true);
  };

  //ログインモーダルの非表示
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;  // ロード中の表示
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton}>&lt;</button>
      {user?(
        <div>
          <p>{user.email}</p>
          <button onClick={() => auth.signOut()}>ログアウト</button>  {/* ログアウトボタン */}
        </div>
      ):(
        <div>
          <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </div>
      )}
      <div className={styles.imageBox}>
        <span>
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} />                
              {previewUrl && (
                <div>
                  <img src={previewUrl} alt="Preview" width="300" />
                </div>
              )}
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
                onChange={handleCategory}
                className={
                    styles.input
                }
            >
                {categoryselect.map((val, index) =>(
                  <option key={index} value={val.name}>{val.name}</option>

                ))}
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