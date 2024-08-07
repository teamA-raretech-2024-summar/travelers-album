import React, { Suspense } from "react";
import Header from "../../../../components/Header";

import { Metadata } from "next";
import AddMembers from "../../../../components/AddMembers";

export const metadata: Metadata = {
  title: "メンバーの追加",
  description: "メンバーを追加します",
  icons: {
    icon: "/favicon.png",
  },
};

const page = ({
  searchParams,
}: {
  searchParams?: {
    userId?: string;
  };
}) => {
  const userId = searchParams?.userId || ""; // デフォルトは表示しないようにする？

  return (
    <div className="h-screen w-full flex flex-col">
      <Header menu />
      <AddMembers userId={userId} />
    </div>
  );
};

export default page;
