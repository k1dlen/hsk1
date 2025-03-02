import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  const params = await context.params;
  const { wordId, userId } = params;

  if (!wordId || !userId) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await db.query(
      "INSERT INTO user_learned_words (user_id, word_id) VALUES (?, ?)",
      [userId, wordId]
    );
    return NextResponse.json({ message: "Карточка отмечена как изученная" });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Карточка отмечена как изученная" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
