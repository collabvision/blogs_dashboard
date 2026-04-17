import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

// Helper to read data
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content || '[]');
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const newData = await request.json();
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  return NextResponse.json({ success: true });
}