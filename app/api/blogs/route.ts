import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This finds the data.json in your project root
const filePath = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      // Create the file if it doesn't exist yet
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return NextResponse.json([]);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content || '[]');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const list = await request.json();
    
    // Safety check: only write if it's an array
    if (!Array.isArray(list)) {
        return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Write error:", error);
    return NextResponse.json({ error: "Failed to write" }, { status: 500 });
  }
}