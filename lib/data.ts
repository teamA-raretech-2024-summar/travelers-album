import { sql } from "@vercel/postgres";
import { User } from "./definitions";
import { users as sampleUsers } from "./placeholder-data";
import { members as sampleFellowTravelers } from "./placeholder-data";

// ID でユーザーを検索
export async function fetchFilteredUsers(userId: string) {
  // サンプルデータの場合
  return sampleUsers.filter((sampleUser) => sampleUser.id.includes(userId));

  // DB から引っ張ってくる場合（まだ DB ができていないのでどれが動くのかわからない）
  try {
    // ex.1
    const users = await sql<User>`
      SELECT * FROM users WHERE id LIKE ${`%${userId}%`};
    `;
    return users.rows;

    // ex.2
    // const query = `SELECT * FROM users WHERE id LIKE $1`;
    // const users = await sql(query, [`%${userId}%`]);
    // return users.rows;

    // ex.3
    // const query = `SELECT * FROM users WHERE id LIKE $1`;
    // const { rows } = await sql<User>(query, [`%${userId}%`]);
    // return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

// 現在のユーザーの仲間？（fellow ユーザー）取得する）
export async function fetchFellowTravelers() {
  return sampleFellowTravelers;

  // ログインしているユーザーのIDがどこかから欲しい
  const userId = "user2";

  // DB から引っ張ってくる場合（まだ DB ができていないのでどれが動くのかわからない）
  // try {
  //   // ex.1
  //   const friends = await sql<User>`
  //   SELECT DISTINCT u.*
  //   FROM Users u
  //   JOIN Friendships f ON (u.id = f.friend_id OR u.id = f.user_id)
  //   WHERE (f.user_id = ${`%${userId}%`} OR f.friend_id = ${`%${userId}%`})
  //       AND u.id != ${`%${userId}%`}
  //   `;
  //   return friends.rows;
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to fetch users.");
  // }
}

// 新規旅行者登録で登録したメンバーをログインしているユーザーの仲のよいユーザーとして登録する
// ログインユーザーのIDが欲しい...
// DB に追加するだけなので戻り値は成功したか失敗したかでもよいかも
// 失敗したら失敗の通知でもいいかも...
export const registerFriends = (friends) => {
  // ログインしているユーザーのIDがどこかから欲しい
  const userId = "user2";
  console.log("friends", friends);

  friends.forEach((friend) => sampleFellowTravelers.push(friend));
  // TODO:重複ユーザーがメンバー追加画面に出てきている問題が発生してしまうのでそこを修正
  // フロントエンドに ID が漏れるのはまずい？？？
  console.log(sampleFellowTravelers);

  // DB へ保存（まだ DB ができていないのでどれが動くのかわからない）
  // try {
  //   return "";
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to fetch users.");
  // }
};
