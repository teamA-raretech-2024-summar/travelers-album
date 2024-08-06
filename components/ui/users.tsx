// バックエンドの処理を確認するためのテスト UI
// フロントとバックでデータのやりとりができたら削除
// 装飾はフロントエンドにおまかせ
import * as React from "react";
import { fetchFilteredUsers } from "../../lib/data";

export const UserList = async ({ userId }: { userId: string }) => {
  const users = await fetchFilteredUsers(userId);
  // console.log("userId ", userId);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ margin: "10px", listStyleType: "none" }}>
            <span>
              画像, id:{user.id}, ユーザー名:{user.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
