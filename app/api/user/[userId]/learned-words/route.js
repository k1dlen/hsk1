import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const [learnedWords] = await db.query(`
      SELECT w.* FROM words w
      JOIN user_learned_words ulw ON w.id = ulw.word_id
      WHERE ulw.user_id = ?`, [userId]);

    return NextResponse.json(learnedWords);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  }
}
