import type { User } from "next-auth";

interface Guild {
	id: string;
	name: string;
	permissions: number;
	icon: string;
	message: string;
}

declare module "next-auth" {
	interface Session {
		user: User & {
			id: string;
			globalName: string;
		};
		accessToken: string;
	}
	interface Profile {
		global_name: string | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		access_token: string;
		expires_at: number;
		refresh_token?: string;
		error?: "RefreshTokenError";
	}
}
