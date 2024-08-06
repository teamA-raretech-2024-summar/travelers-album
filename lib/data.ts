import { sql } from "@vercel/postgres";
import { User } from "./definitions";
import { users as sampleUsers } from "./placeholder-data";

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
