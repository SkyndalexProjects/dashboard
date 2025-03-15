interface CustomBot {
	id: number;
	guildId: string;
	clientId: string;
	token: string;
	activity: string;
	status: string;
	username: string;
	avatar: string;
	icon: string;
}
interface CustomBotRPC {
	id: string;
	name: string;
	icon: string;
	description: string;
	summary: string;
	type: number | null;
	is_monetized: boolean;
	is_verified: boolean;
	is_discoverable: boolean;
	hook: boolean;
	guild_id: string;
	storefront_available: boolean;
	bot_public: boolean;
	bot_require_code_grant: boolean;
	install_params: {
		scopes: string[];
		permissions: string;
	};
	integration_types_config: {
		[key: string]: {
			oauth2_install_params: {
				scopes: string[];
				permissions: string;
			};
		};
	};
	verify_key: string;
	flags: number;
	max_participants: number | null;
}
interface RadioStation {
	took: number;
	_id: string;
	_source: {
		code: string;
		page: {
			country: {
				id: string;
				title: string;
			};
			place: {
				id: string;
				title: string;
			};
		};
		preroll: boolean;
		secure: boolean;
		subtitle: string;
		title: string;
		type: string;
		url: string;
		website: string;
		stream: string;
	};
}

interface User {
    username: string;
    accent_color: number | null;
    avatar: string | null;
    avatar_decoration_data: any | null;
    banner: string | null;
    banner_color: string | null;
    clan: any | null;
    collectibles: any | null;
    discriminator: string;
    email: string;
    flags: number;
    global_name: string;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    primary_guild: any | null;
    public_flags: number;
    verified: boolean;
}

type UserData = User[];