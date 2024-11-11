"use client";

import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  limit,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import styles from "./styles/List.module.css";
import { useRouter } from "next/navigation";

const db = getFirestore(app);

const List = (category) => {
  const router = useRouter();
  const [merchandises, setMerchandise] = useState(null);
  useEffect(() => {
    getMerchandiseCategoryList();
  }, [category]);

  const getMerchandiseCategoryList = async () => {
    let q = query(collection(db, "Produts"),where("statas","==", "販売中"),limit(8));
    console.log(category);
    if (category.category) {
      q = query(
        collection(db, "Produts"),
        where("category", "==", category.category),
        where("statas","==", "販売中")
      );
    }

    try {
      const querySnapshot = await getDocs(q);
      const merchandise = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(merchandise);
      setMerchandise(merchandise);
      return merchandise;
    } catch (error) {
      console.error("Error fetching merchandise:", error);
    }
  };

  return (
    <>
      <div>
        {merchandises && (
          <div className={styles.merchandiseList}>
            {merchandises.map((merchandise) => (
              <div
                key={merchandise.id}
                className={styles.merchandiseCard}
                onClick = {() => router.push(`/detail?m=${merchandise.id}`)}
              >
                <img src={merchandise.image} alt="Uploaded" width={130} />
                <p>{merchandise.productName}</p>
                <p>{merchandise.price}円</p>
                <p>{merchandise.productDetails}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default List;
