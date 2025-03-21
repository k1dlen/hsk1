import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId
      ? `
      SELECT 
        w.type,
        COUNT(*) as total,
        SUM(CASE WHEN ulw.word_id IS NOT NULL THEN 1 ELSE 0 END) as learned
      FROM words w
      LEFT JOIN user_learned_words ulw 
        ON w.id = ulw.word_id AND ulw.user_id = ?
      GROUP BY w.type
    `
      : `
      SELECT 
        type, 
        COUNT(*) as total,
        0 as learned
      FROM words
      GROUP BY type
    `;

    const [rows] = await db.query(query, userId ? [userId] : []);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return NextResponse.json(
      { error: "Ошибка при получении категорий" },
      { status: 500 }
    );
  }
}
