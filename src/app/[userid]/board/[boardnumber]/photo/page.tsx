import React from "react";
import "../../../../../../styles/global.css";
import Header from "@/components/Header";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/@/lib/auth";
import { redirect } from "next/navigation";

const page = async ({
  params: { userid, boardnumber },
}: {
  params: { userid; boardnumber: string };
}) => {
  console.log("photoでFetching session...");
  let Userid;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("photoでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("photoでセッションの情報を出してみます", session);
      Userid = session.user.id;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }
  const datafetch = () => {
    // userid , boardnumberでデータフェッチ
    userid;
    boardnumber;
  };
  return (
    <div className="h-screen w-screen layer-gradient flex flex-col">
      <Header menu userid={Userid} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-center border-b-2 border-gray-400 py-3">
          <h2 className="text-xl">写真一覧</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-5 px-20">
            {[...Array(30)].map((_, index) => (
              <div
                key={index}
                className=" rounded-xl aspect-square shadow-custom-shadow relative overflow-hidden hover:scale-110 hover:shadow-none transition cursor-pointer"
              >
                <Image
                  src={"/images/routephoto.jpg"}
                  fill
                  className="object-cover"
                  alt="仮の写真です"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
