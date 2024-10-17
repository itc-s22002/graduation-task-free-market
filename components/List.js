"use client";

import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import styles from "./styles/List.module.css";

const db = getFirestore(app);

const List = () => {
  const [merchandises, setMerchandise] = useState(null);
  useEffect(() => {
    getMerchandiseList();
  }, []);

  const getMerchandiseList = async () => {
    const category = "ホビー・本";
    const q = query(
      collection(db, "Produts"),
      where("category", "==", category)
    );

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
              <div key={merchandise.id} className={styles.merchandiseCard}>
                <img src={merchandise.image} alt="Uploaded" width={130} />
                <p>{merchandise.productName}</p>
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
