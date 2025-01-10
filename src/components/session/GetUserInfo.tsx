import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GetUserInfo() {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null; // ou throw une erreur personnalisée
  }

  return {
    name: session.user.name,
    avatar: session.user.avatar,
    role: session.user.role,
    email: session.user.email
  };
}
