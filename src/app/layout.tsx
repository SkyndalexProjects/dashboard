import "./globals.css";
import ClientProviders from "./ClientProviders";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<ClientProviders>
						{}
						{children}
					</ClientProviders>
				</SessionProvider>
			</body>
		</html>
	);
};

export default Layout;
