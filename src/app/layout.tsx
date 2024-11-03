import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ClientProviders from "./ClientProviders";

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
