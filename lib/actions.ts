"use server";

import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");
const sql = neon(dbUrl);

export const insertScore = async (
  score: number,
  user_id: number,
  created_at: string,
) => {
  await sql`insert into scores (user_id, score, created_at)
              values (${user_id}, ${score}, ${created_at})`;
};

export const fetchPlayerScores = async (userId: number) => {
  return await sql`select score, created_at
                             from scores
                             where user_id = ${userId}
                             order by score desc limit 5`;
};
