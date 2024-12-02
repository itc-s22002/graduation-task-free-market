"use client";

import Header from "@/components/header";
import List from "@/components/List";
import { useSearchParams } from "next/navigation";
import styles from "../styles/Home.module.css";
import { Suspense } from "react";



//カテゴリー一覧
const Lists = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
  return (
    <Suspense fallback={<div>Loding...</div>}>
      <div className = {styles.container}>
      <Header />
      <h3>{category}・カテゴリー一覧</h3>
      <List category = {category}/>
    </div>
    </Suspense>
  );
};
export default Lists;
