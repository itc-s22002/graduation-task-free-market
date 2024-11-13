"use client";

import Header from "@/components/header";
import styles from "../styles/Purchase.module.css";
import React, { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginModal from "@/components/loginModal";

const db = getFirestore(app);
const auth = getAuth(app);

const Detail = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const Produts = searchParams.get("m");

  const [item, setItem] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [seller, setSeller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //ログインモーダル


  const [transactionsData, setTransactionsData] = useState(false);

  const [user, setUser] = useState(null); //ユーザー情報

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
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  const getImageData = async () => {
    let ProdutsId = Produts;
    let sellerId = "";
    try {
      const produtsDocRef = doc(db, "Produts", ProdutsId);
      const produtsQuerySnapshot = await getDoc(produtsDocRef);

      if (produtsQuerySnapshot.exists()) {
        setItem(produtsQuerySnapshot.data());
        sellerId = produtsQuerySnapshot.data().seller_id;
        console.log(produtsQuerySnapshot.data());
      } else {
        console.log("p data not found");
      }
    } catch (error) {
      console.error("Error fetching  data: ", error);
    }
    try {
      const q = query(
        collection(db, "Users"),
        where("user_id", "==", sellerId)
      );
      const sellerQuerySnapshot = await getDocs(q);

      const itemsArray = sellerQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSeller(itemsArray[0]);
    } catch (error) {
      console.error("Error fetching  data: ", error);
    }
    try {
      const q = query(
        collection(db, "Transactions"),
        where("product_id", "==", ProdutsId)
      );
      const sellerQuerySnapshot = await getDocs(q);

      const itemsArray = sellerQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(itemsArray[0].id);
      console.log(itemsArray[0].id);
    } catch (error) {
      setTransactionsData(true);
      console.error("Error fetching  data: ", error);
    }
  };

  useEffect(() => {
    getImageData();
  }, []);

  //ログインモーダルの表示
  const openModal = () => {
    setIsModalOpen(true);
  };

  //ログインモーダルの非表示
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTransactions = async () => {
    try {
      //Firebaseにデータの送信
      const docRef = addDoc(collection(db, "Transactions"), {
        buyer_id: user.uid,
        product_id: Produts,
        seller_id: item.seller_id,
        statas: "交渉中",
        transaction_date: serverTimestamp(),
      });
    } catch (error) {
      console.error("アップロード中にエラーが発生しました:", error);
      alert("アップロードに失敗しました。");
    }
    try {
      const q = query(
        collection(db, "Transactions"),
        where("product_id", "==", Produts)
      );
      const sellerQuerySnapshot = await getDocs(q);

      const itemsArray = sellerQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(itemsArray[0].id);
      router.push(`purchase?t=${itemsArray[0].id}`);
    } catch (error) {
      setTransactionsData(true);
      console.error("Error fetching  data: ", error);
    }
    try {
      const docRef = updateDoc(doc(db, "Produts", Produts), {
        statas: "交渉中",
      });
    } catch (error) {
      console.error("アップロード中にエラーが発生しました:", error);
      alert("アップロードに失敗しました。");
    }
  };
  const onPurchase = () => {
    if (transactionsData) {
      addTransactions();
    } else {
      try {
        const docRef = updateDoc(doc(db, "Produts", Produts), {
          statas: "交渉中",
        });
      } catch (error) {
        console.error("アップロード中にエラーが発生しました:", error);
        alert("アップロードに失敗しました。");
      }
      router.push(`/purchase?t=${transactions}`);
    }
  };

  return (
    <div className={styles.box}>
      {user ? (
          <div>
            {/* <p>{user.email}</p>
          <button onClick={() => auth.signOut()}>ログアウト</button> */}
          </div>
        ) : (
          <div>
            <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
        )}
      <Header />
      <div className={styles.container}>
        {item && (
          <>
            <div className={styles.containerUpImage}>
              <>
                <img
                  src={item.image}
                  alt="Cropped"
                  className={styles.croppedImage}
                />
              </>
            </div>

            <div className={styles.form}>
              <div className={styles.inputGroup}>
                <label>商品名</label>
                <div className={styles.input}>{item.productName}</div>
                <label>商品詳細</label>
                <div className={styles.input}>{item.productDetails}</div>
                <label>支払い金額</label>
                <div className={styles.input}>{item.price}円</div>
                <label>受取場所</label>
                <div className={styles.input}>{item.location}</div>
                <label>出品者</label>
                <div className={styles.input}>
                  {seller && (
                    <>
                      <p>ニックネーム：{seller.name}</p>
                      <p>学校：{seller.school}</p>
                      <p>学籍番号：{seller.student_id}</p>
                    </>
                  )}
                </div>
              </div>
              {user && (
                <>
                {item.statas == "購入" || item.seller_id == user.uid ? (
                <>{item.statas}</>
              ) : (
                <>
                <button
                  type="submit"
                  className={styles.submitButton}
                  onClick={() => onPurchase()}
                >
                  購入手続き
                </button>
                </>
              )}
                </>

              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
