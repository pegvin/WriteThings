import { useEditorContext } from "./context/EditorContent";

export const WordPerMinute = 225;

export default function() {
	const { Editor } = useEditorContext();

	var match = Editor.value.match(/\S+/g);

	if (match == null) {
		match = { length: 0 };
	}

	const time = match.length / WordPerMinute;
	return (
		<div>
			<span>{match.length} {match.length > 1 ? "words" : "word"}</span>
			<span class="separator">·</span>
			<span>{Editor.value.length} chars</span>
			<span class="separator">·</span>
			<span>{match.length == 0 ? 'Nothing to read' : (time >= 1 ? Math.ceil(time) + ' minute read (' + {WordPerMinute} + ' wpm)' : 'Less than a minute read') }</span>
		</div>
	);
}
