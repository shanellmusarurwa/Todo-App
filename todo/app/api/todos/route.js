import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function GET() {
  try {
    const response = await axios.get(API_URL);
    return NextResponse.json(response.data.slice(0, 5));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const todo = await request.json();
    const response = await axios.post(API_URL, todo);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...todo } = await request.json();
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await axios.delete(`${API_URL}/${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}