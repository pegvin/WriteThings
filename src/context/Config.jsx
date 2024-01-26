import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const ConfigContext = createContext();

export function ConfigContextProvider(props) {
	const [ Config, ChangeConfig ] = createStore({
		SpellCheckEnabled: false,
		Font: { Type: "monospace", Name: "Cousine", Size: 18 }
	});

	return (
		<ConfigContext.Provider value={{ Config, ChangeConfig }}>
			{props.children}
		</ConfigContext.Provider>
	);
}

export function useConfigContext() {
	return useContext(ConfigContext);
}
