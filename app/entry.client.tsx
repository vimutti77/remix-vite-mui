import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import {
	ReactNode,
	StrictMode,
	startTransition,
	useMemo,
	useState,
} from "react";
import { hydrateRoot } from "react-dom/client";
import {
	ClientStyleContext,
	MuiProvider,
	createEmotionCache,
} from "~/libs/mui";

type ClientCacheProviderProps = {
	children: ReactNode;
};
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
	const [cache, setCache] = useState(createEmotionCache());

	const clientStyleContextValue = useMemo(
		() => ({
			reset() {
				setCache(createEmotionCache());
			},
		}),
		[],
	);

	return (
		<ClientStyleContext.Provider value={clientStyleContextValue}>
			<CacheProvider value={cache}>{children}</CacheProvider>
		</ClientStyleContext.Provider>
	);
}

const hydrate = () => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<ClientCacheProvider>
					<MuiProvider>
						<RemixBrowser />
					</MuiProvider>
				</ClientCacheProvider>
			</StrictMode>,
		);
	});
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate);
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1);
}
