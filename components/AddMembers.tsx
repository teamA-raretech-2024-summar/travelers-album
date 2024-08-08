"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "./ui/button";
import { fetchFilteredUsers, registerFriends } from "../lib/data";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import { SearchParamsInput } from "./ui/searchParamsInput";
// import { UserList } from "./ui/users";

const AddMembers = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await fetchFilteredUsers(userId);
      const usersWithChecked = fetchedUsers.map((user) => ({
        ...user,
        checked: false,
      }));
      setMembers(usersWithChecked);
      console.log("Fetched users:", usersWithChecked);
    }

    fetchUsers();
  }, [userId]);

  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    setMembers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, checked: isChecked } : user
      )
    );
    console.log("Checkbox changed:", members);
  };

  const handleAddNewMembers = () => {
    console.log("Add new members button clicked", members);
    //　TODO: 新規旅行者をメンバーを追加モーダルに表示できるようにする
    // checked: true がついているメンバーを選ぶ
    const addfriends = members
      .filter((member) => member.checked) // checked が true の人をフィルタリング
      .map((member) => ({
        // 必要なプロパティだけを残す
        id: member.id,
        name: member.name,
        icon: member.icon,
      }));
    registerFriends(addfriends);
    router.push("/tripadd");
  };

  return (
    <div className="flex-1  flex flex-col  px-10 md:px-28 py-10 bg-gradient-to-b from-green-300 to-green-200">
      <h2 className="text-3xl">Add Member</h2>
      <div className="flex-1 flex flex-col items-center   py-32 px-10 ">
        <div className="flex items-center  w-auto md:w-2/3  ">
          <label htmlFor="member" className="text-xl  whitespace-nowrap px-5">
            ID検索 :
          </label>
          <SearchParamsInput
            id="member"
            type="text"
            className="rounded-lg pr-5 shadow-custom-shadow cursor-pointer"
            placeholder="ユーザーIDを入力"
          />
        </div>
        {/* ユーザー一覧を表示するコンポーネント（バックエンド確認用） */}
        <Suspense fallback={<p>取得中</p>}>
          {/* <UserList userId={userId} /> */}
          <div className="py-10 lg:px-48 flex flex-col space-y-6">
            <div className="flex flex-col space-y-6">
              {members.map((user) => (
                <div className="flex" key={user.id}>
                  <Checkbox
                    id={user.id.toString()}
                    className="self-start"
                    checked={user.checked}
                    onCheckedChange={(checked: string | boolean) =>
                      handleCheckboxChange(user.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={user.id.toString()}
                    className="flex-1 text-xl text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ID : {user.id}
                  </label>
                  <label
                    htmlFor={user.id.toString()}
                    className="flex-1 text-xl text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ユーザー名 : {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Suspense>
        <span className="flex-1"></span>
        <Button
          variant="outline"
          className="bg-yellow-400 hover:bg-yellow-500 shadow-custom-shadow hover:shadow-none "
          onClick={handleAddNewMembers}
        >
          新規メンバーを登録！
        </Button>
      </div>
    </div>
  );
};

export default AddMembers;
