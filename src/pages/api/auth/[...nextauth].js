import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "axios";

const nextAuthOptions = () => {
	return {
		providers: [
			// GoogleProvider({
			// 	clientId: process.env.GOOGLE_CLIENT_ID,
			// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// }),
			CredentialsProvider({
				name: "Credentials",
				credentials: {
					email: { label: "Email", type: "text", placeholder: "Email" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials) {
					try {
						const response = await axios.post(
							`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
							{
								identifier: credentials.email,
								password: credentials.password,
							}
						);

						if (response.status === 200 && response.data) {
							const { jwt, user } = response.data;
							return {
								id: user.id,
								email: user.email,
								jwt,
							};
						}
					} catch (error) {
						console.warn(error);
						throw Error(error.response);
					}
				},
			}),
		],

		secret: process.env.NEXTAUTH_SECRET,

		pages: {
			signIn: "/auth/login",
		},

		session: { strategy: "jwt" },

		callbacks: {
			async jwt({ token, user, account }) {
				const isSignIn = user ? true : false;
				if (isSignIn && account?.provider === "google") {
					// const response = await fetch(
					// 	`${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`
					// );
					// const data = await response.json();
					// token.jwt = data.jwt;
					// token.id = data.id;
					// token.user = data.user;
				} else if (isSignIn && account?.provider === "credentials") {
					token.jwt = user.jwt;
					token.id = user.id;
				}

				return token;
			},
			async session({ session, token }) {
				session.jwt = token.jwt;
				session.user.id = token.id;

				return Promise.resolve(session);
			},
		},
	};
};

const nextAuth = (req, res) => {
	return NextAuth(req, res, nextAuthOptions(req, res));
};

export default nextAuth;
