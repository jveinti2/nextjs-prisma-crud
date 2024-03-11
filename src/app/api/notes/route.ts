import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    if (!notes) {
      return NextResponse.json({ message: "No hay notas", status: 404 });
    }
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const note = await prisma.note.create({
      data: {
        title: title,
        content: content,
      },
    });
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}
