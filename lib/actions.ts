"use server";

import { neon } from "@neondatabase/serverless";

export const insertScore = async (score: number, user_id: number) => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL is not set");
  const sql = neon(dbUrl);
  await sql`insert into scores (user_id, score)
              values (${user_id}, ${score})`;
};
