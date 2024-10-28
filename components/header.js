'use client'

import React from "react";
import Image from "next/image";
import styles from "./styles/Header.module.css"
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    return(
        <header className={styles.header}>
        <div className={styles.icon} onClick={() => router.push('/')}>
          <Image
            src="/home.png" // publicフォルダ内の画像ファイルパス
            alt="サンプル画像"
            width={50} // 必須: 画像の幅を指定
            height={50} // 必須: 画像の高さを指定
          />
        </div>
        <input className={styles.search} type="text" placeholder="検索" />
        <div className={styles.icon} onClick={() => router.push('/profile')}>
          <Image
            src="/people.png" // publicフォルダ内の画像ファイルパス
            alt="サンプル画像"
            width={50} // 必須: 画像の幅を指定
            height={50} // 必須: 画像の高さを指定
          />
        </div>
        <button className={styles.uploadButton} onClick={() => router.push('/listing')}>出品</button>
      </header>
    )
}

export default Header