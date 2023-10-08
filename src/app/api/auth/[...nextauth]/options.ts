import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    /*GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID as string,
      clientSecret: process.env.YANDEX_SECRET as string,
    }),*/
    CredentialsProvider({
      name: "",
      credentials: {
        username: {
          label: "Введите свой логин:",
          type: "text",
          placeholder: "Логин",
        },
        password: {
          label: "Введите свой пароль:",
          type: "password",
          placeholder: "Пароль",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = { id: "1", name: "Director", password: "Demo" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "auto",
    brandColor: "#002296",
  },
  pages: {
    //  signIn:"/"
  },
  session: {
    strategy: "jwt",
    // 5 minutes
    maxAge: 5 * 60,
    // not for Json web token
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
