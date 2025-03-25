"use server";

import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");
const sql = neon(dbUrl);

export const insertScore = async (score: number, user_id: number) => {
  await sql`insert into scores (user_id, score)
              values (${user_id}, ${score})`;
};

export const fetchPlayerScores = async (userId: number) => {
  const playerScores = await sql`select score
                             from scores
                             where user_id = ${userId}
                             order by score desc limit 5`;
  return playerScores;
};
