import { connect } from "@/database/mongo.config";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { User as UserModel } from "@/models/User";
import { JWT } from "next-auth/jwt";

export type CustomSession = {
  user?: CustomUser;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login", // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  },

  callbacks: {
    async signIn({ user }) {
      connect();
      try {
        const findUser = await UserModel.findOne({ email: user.email });
        if (!findUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
          });
        }
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.user = {
          id: user.id || "",
          name: user.name || "",
          email: user.email || "",
          role: user.role || "", // Définit un rôle par défaut
          avatar: user.avatar || "",
        };
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: JWT;
    }) {
      session.user = token.user as CustomUser; // Ajoute les données utilisateur au session
      return session;
    },
  },

  providers: [
    Credentials({
      name: "Welcome Back",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        connect();
        const user = await UserModel.findOne({ email: credentials?.email });
        if (user) {
          // Retourne les données nécessaires pour le token
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          };
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      },
    },
  },
  
};
