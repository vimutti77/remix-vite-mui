import { withEmotionCache } from "@emotion/react"
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { useContext } from "react"
import { ClientStyleContext } from "~/libs/mui"

const Layout = withEmotionCache(
	({ children }: { children: React.ReactNode }, emotionCache) => {
		const clientStyleData = useContext(ClientStyleContext);

		// Only executed on client
		useEnhancedEffect(() => {
			// re-link sheet container
			emotionCache.sheet.container = document.head;
			// re-inject tags
			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach((tag) => {
				(emotionCache.sheet as any)._insertTag(tag);
			});
			// reset cache to reapply global styles
			clientStyleData.reset();
		}, []);

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<Meta />
					<Links />
				</head>
				<body>
					{children}
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
		);
	},
);

export default function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}
