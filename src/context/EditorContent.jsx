import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const EditorContext = createContext();

export function EditorContextProvider(props) {
	const [ Editor, ChangeEditor ] = createStore({ value: "" });

	return (
		<EditorContext.Provider value={{ Editor, ChangeEditor }}>
			{props.children}
		</EditorContext.Provider>
	);
}

export function useEditorContext() {
	return useContext(EditorContext);
}
