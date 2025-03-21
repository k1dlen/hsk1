import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        w.*, 
        CASE WHEN ulw.word_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_learned
      FROM words w
      LEFT JOIN user_learned_words ulw 
        ON w.id = ulw.word_id AND ulw.user_id = ?
      ${type ? "WHERE w.type = ?" : ""}
    `;

    const params = [userId];
    if (type) params.push(type);

    const [rows] = await db.query(query, params);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
