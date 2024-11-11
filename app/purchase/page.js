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
  updateDoc
} from "firebase/firestore";
import Chat from "@/components/chat";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const db = getFirestore(app);

const Purchase = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const Transactions = searchParams.get("t");

  const [item, setItem] = useState(null);
  const [transactionsId, getTransactionsId] = useState(null);
  const [seller, setSeller] = useState(null);

  const [produtsId, setProdutsId] = useState(null)

  const getImageData = async () => {
    let transactionsPid = "";
    let sellerId = "";
    try {
      const transactionsDocRef = doc(db, "Transactions", Transactions);
      const transactionsQuerySnapshot = await getDoc(transactionsDocRef);

      if (transactionsQuerySnapshot.exists()) {
        getTransactionsId(transactionsQuerySnapshot.id);
        transactionsPid = transactionsQuerySnapshot.data().product_id;
        sellerId = transactionsQuerySnapshot.data().buyer_id;
      } else {
        console.log("t data not found");
      }
    } catch (error) {
      console.error("Error fetching  data: ", error);
    }
    try {
      const produtsDocRef = doc(db, "Produts", transactionsPid);
      const produtsQuerySnapshot = await getDoc(produtsDocRef);

      if (produtsQuerySnapshot.exists()) {
        setItem(produtsQuerySnapshot.data());
        setProdutsId(produtsQuerySnapshot.id);

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

  const onPurchase = () => {
    console.log(transactionsId)
    try {
      const docRef = updateDoc(doc(db, "Transactions",transactionsId), {
        statas: "購入",
      });
    } catch (error) {
      console.error("アップロード中にエラーが発生しました:", error);
      alert("アップロードに失敗しました。");
    }
    try {
      const docRef = updateDoc(doc(db, "Produts",produtsId), {
        statas: "購入",
      });
    } catch (error) {
      console.error("アップロード中にエラーが発生しました:", error);
      alert("アップロードに失敗しました。");
    }
    router.push("/")
  }

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

              <Chat />

              <button type="submit" className={styles.submitButton} onClick = {() => onPurchase()}>
                購入
              </button>
            </div>
          </>
        )}
        </div>
      </div>
  );
};

export default Purchase;
