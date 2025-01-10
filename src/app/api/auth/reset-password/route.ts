import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Logique de la route (vérification du lien magique, etc.)
  return NextResponse.json({ message: 'Link verified successfully!' });
}
