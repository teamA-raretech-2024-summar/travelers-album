// バックエンドの処理を確認するためのテスト UI
// フロントとバックでデータのやりとりができたら削除
// 装飾はフロントエンドにおまかせ
"use client";
import React from "react";
import { useState, useEffect, Suspense } from "react";
import { fetchFilteredUsers } from "../../lib/data";
import { Checkbox } from "./checkbox";

export const UserList = async ({ userId }: { userId: string }) => {
  // React-Query で書けるかも
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await fetchFilteredUsers(userId);
      const usersWithChecked = fetchedUsers.map((user) => ({
        ...user,
        checked: false,
      }));
      setUsers(usersWithChecked);
    }

    fetchUsers();
  }, [userId]);

  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, checked: isChecked } : user
      )
    );
  };

  return (
    <div className="py-10 lg:px-48 flex flex-col space-y-6">
      <div className="flex flex-col space-y-6">
        {users.map((user) => (
          <div className="flex" key={user.id}>
            <Checkbox
              id={user.id.toString()}
              className="self-start"
              // checked={user.checked}
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
  );
};
