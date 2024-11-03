import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Discord({
			clientId: process.env.AUTH_DISCORD_ID as string,
			clientSecret: process.env.AUTH_DISCORD_SECRET as string,
			authorization:
				"https://discord.com/oauth2/authorize?scope=identify+guilds",
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				token.expires_at = account.expires_in as unknown as number;
				token.refresh_token = account.refresh_token;
			} else if (
				token.expires_at &&
				Math.floor(( new Date(token.expires_at).getTime() - Date.now()) / 1000)
			) {
				return token;
			} else {
				if (!token.refresh_token)
					throw new TypeError("No refresh token available");
				try {
					const response = await fetch("https://discord.com/api/oauth2/token", {
						method: "POST",
						body: new URLSearchParams({
							client_id: process.env.AUTH_DISCORD_ID as string,
							client_secret: process.env.AUTH_DISCORD_SECRET as string,
							grant_type: "refresh_token" as string,
							refresh_token: token.refresh_token as string,
						}),
					});

					const tokenOrErorr = await response.json();
					if (!response.ok) throw tokenOrErorr;

					const newTokens = tokenOrErorr as {
						access_token: string;
						refresh_token: string;
						expires_in: number;
					};

					token.access_token = newTokens.access_token;
					token.expires_at = Math.floor(
						Date.now() / 1000 + newTokens.expires_in,
					);

					if (newTokens.refresh_token)
						token.refresh_token = newTokens.refresh_token;
					return token;
				} catch (error) {
					console.error("Error refreshing access_token", error);
					token.error = "RefreshTokenError";
					return token;
				}
			}
			if (profile) {
				token.globalName = profile.global_name;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string;
			session.user.id = token.sub as string;
			session.user.globalName = token.globalName as string;
			return session;
		},
	},
});
