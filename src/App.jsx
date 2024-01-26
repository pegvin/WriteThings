import StatusBar from './StatusBar';
import TextEditor from './TextEditor';
import EditorConfig from './EditorConfig';

import { ConfigContextProvider } from './context/Config';
import { EditorContextProvider } from './context/EditorContent';

function App() {
	return (
		<main>
			<ConfigContextProvider>
			<EditorContextProvider>
				<TextEditor />
				<footer>
					<StatusBar />
					<EditorConfig />
				</footer>
			</EditorContextProvider>
			</ConfigContextProvider>
		</main>
	);
}

export default App;
