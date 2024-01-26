import { useConfigContext } from "./context/Config";
import { useEditorContext } from "./context/EditorContent";

/**
 * @param {KeyboardEvent} e
 */
function HandleTabKey(e) {
	if (e.key == 'Tab') {
		e.preventDefault();
		var start = e.target.selectionStart;
		var end = e.target.selectionEnd;

		// set textarea value to: text before caret + tab + text after caret
		e.target.value = e.target.value.substring(0, start) + "\t" + e.target.value.substring(end);

		// put caret at right position again
		e.target.selectionStart =
		e.target.selectionEnd = start + 1;
	}
}

export default function() {
	const { Config } = useConfigContext();
	const { _, ChangeEditor } = useEditorContext();

	return (
		<textarea
			tabindex="-1"
			placeholder="start writing..."
			spellcheck={ Config.SpellCheckEnabled }
			style={{
				"font-family": Config.Font.Name + ", " + Config.Font.Type,
				"font-size": Config.Font.Size + "px"
			}}
			onKeyDown={HandleTabKey}
			onKeyUp={ (e) => ChangeEditor("value", e.target.value) } />
	);
}
