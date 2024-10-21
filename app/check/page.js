"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Listing.module.css";
import { useRouter } from 'next/navigation';

import {
    collection,
    addDoc,
    getFirestore,
    serverTimestamp, query, limit, where, getDocs,doc, getDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

import LoginModal from "@/components/loginModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "@/components/header";

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const MerchandiseCheck = () => {

    const [merchandises, setMerchandise] = useState(null);
    useEffect(() => {
        getMerchandiseCategoryList();
    }, []);

    const [item, setItem] = useState(null);

    const getMerchandiseCategoryList = async () => {

        try {
            // const querySnapshot = await getDocs(doc(db, "Produts","30YzGX9VOwJTD76P2KSM"));
            const itemDocRef = doc(db, "Produts","30YzGX9VOwJTD76P2KSM")
            const querySnapshot = await getDoc(itemDocRef);
            if (querySnapshot.exists()){
                setItem(querySnapshot.data())
                console.log(querySnapshot.data())
            }else{
                console.log(itemDocRef)
            }
        } catch (error) {
            console.error("Error fetching merchandise:", error);
        }
    };

    return (
        <>

            {item &&(
                <div className={styles.container}>
                    <div className={styles.containerUpImage}>
                        <>
                            <img src={item.image} alt="Cropped" className={styles.croppedImage} />
                        </>
                    </div>

                    <div className={styles.form}>
                        <div className={styles.inputGroup}>
                            <div><h1>{item.productName}</h1></div>
                            <div>{item.productDetails}</div>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            商品購入
                        </button>

                        <div className={styles.inputGroup}>
                            <label htmlFor="dropdown"><h2>カテゴリー</h2></label>
                            <div>{item.category}</div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label><h2>出品金額</h2></label>
                            <div>{item.price}</div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label><h2>受取受取方法</h2></label>
                            <div>{item.location}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default MerchandiseCheck;