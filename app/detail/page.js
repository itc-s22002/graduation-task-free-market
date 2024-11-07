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
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";

const db = getFirestore(app);

const Detail = () => {
  const searchParams = useSearchParams();
  const Transactions = searchParams.get("m");

  const [item, setItem] = useState(null);
  const [transactions, getTransactions] = useState(null);
  const [seller, setSeller] = useState(null);

  const getImageData = async () => {
    let transactionsPid = Transactions;
    let sellerId = ""
    try {
      const produtsDocRef = doc(db, "Produts", transactionsPid);
      const produtsQuerySnapshot = await getDoc(produtsDocRef);

      if (produtsQuerySnapshot.exists()) {
        setItem(produtsQuerySnapshot.data());
        sellerId = produtsQuerySnapshot.data().seller_id
        console.log(produtsQuerySnapshot.data())
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
      console.log(itemsArray[0]);
    } catch (error) {
      console.error("Error fetching  data: ", error);
    }
  };

  useEffect(() => {
    getImageData();
  }, []);

  return (
      <div className={styles.box}>
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
                <div className={styles.input}>{item.price}</div>
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
              <button type="submit" className={styles.submitButton}>
                出品
              </button>
            </div>
          </>
        )}
        </div>
      </div>
  );
};

export default Detail;