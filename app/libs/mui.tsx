import createCache from "@emotion/cache";
import {
	CssBaseline,
	Experimental_CssVarsProvider as CssVarsProvider,
	experimental_extendTheme as extendTheme,
} from "@mui/material";
import { createContext } from "react";

const theme = extendTheme();

export type ClientStyleContextData = {
	reset: () => void;
};

export const ClientStyleContext = createContext<ClientStyleContextData>({
	reset: () => {},
});

export function createEmotionCache() {
	return createCache({ key: "css" });
}

export function MuiProvider({ children }: { children: React.ReactNode }) {
	return (
		<CssVarsProvider theme={theme}>
			<CssBaseline />
			{children}
		</CssVarsProvider>
	);
}
