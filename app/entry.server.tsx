import { CacheProvider } from "@emotion/react"
import createEmotionServer from "@emotion/server/create-instance"
import { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"
import { MuiProvider, createEmotionCache } from "~/libs/mui"

export default async function handleRequest(
	request: Request,
	statusCode: number,
	headers: Headers,
	context: EntryContext,
) {
	const cache = createEmotionCache();

	const MuiRemixServer = () => (
		<CacheProvider value={cache}>
			<MuiProvider>
				<RemixServer context={context} url={request.url} />
			</MuiProvider>
		</CacheProvider>
	);

	// Render the component to a string.
	const html = renderToString(<MuiRemixServer />);

	// Grab the CSS from emotion
	const { extractCriticalToChunks } = createEmotionServer(cache);
	const { styles } = extractCriticalToChunks(html);

	let stylesHTML = "";

	styles.forEach(({ key, ids, css }) => {
		const emotionKey = `${key} ${ids.join(" ")}`;
		const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
		stylesHTML = `${stylesHTML}${newStyleTag}`;
	});

	// Add the emotion style tags after the insertion point meta tag
	const markup = html.replace(
		/<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
		`<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
	);

	headers.set("Content-Type", "text/html");

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: statusCode,
		headers,
	});
}
