"use client";

import Header from "@/components/header";
import List from "@/components/List";
import { useSearchParams } from "next/navigation";


const Lists = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    console.log(category)
  return (
    <>
      <Header />
      <h3>カテゴリー一覧</h3>
      <List category = {category}/>
    </>
  );
};
export default Lists;
