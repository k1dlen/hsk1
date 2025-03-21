import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const [types] = await db.query(`
      SELECT type, COUNT(*) as total 
      FROM words 
      GROUP BY type
    `);

    const [learned] = await db.query(
      `SELECT w.type, COUNT(*) as learned 
       FROM user_learned_words ulw
       JOIN words w ON ulw.word_id = w.id
       WHERE ulw.user_id = ?
       GROUP BY w.type`,
      [userId]
    );

    const progress = types.map((type) => {
      const learnedType = learned.find((l) => l.type === type.type) || {
        learned: 0,
      };
      return {
        type: type.type,
        total: type.total,
        learned: learnedType.learned,
      };
    });

    const totalLearned = progress.reduce((sum, item) => sum + item.learned, 0);
    const totalWords = progress.reduce((sum, item) => sum + item.total, 0);

    return NextResponse.json({
      learned: totalLearned,
      total: totalWords,
      progress,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
