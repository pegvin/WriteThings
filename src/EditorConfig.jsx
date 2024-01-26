import { useConfigContext } from "./context/Config";
import { For } from "solid-js";

const fontList = [
	{
		type: 'serif',
		fonts: [ "Courier Prime", "Merriweather" ]
	},
	{
		type: 'sans-serif',
		fonts: [ "Atkinson Hyperlegible", "Geologica" ]
	},
	{
		type: 'monospace',
		fonts: [ "Cousine", "Ubuntu Mono" ]
	}
];

export default function() {
	const { Config, ChangeConfig } = useConfigContext();
	return (<div class="EditorConfigurator">
		<select id="fontSelector" onChange={(e) => ChangeConfig("Font", "Name", e.target.value)}>
			<For each={fontList}>{(fontType, i) =>
				<optgroup label={fontType.type}>
					<For each={fontType.fonts}>{(font, i) =>
						<option value={font} selected={Config.Font.Name == font ? "selected" : ""}>{font}</option>
					}</For>
				</optgroup>
			}</For>
		</select>
		<input id="fontSize" type="number" min="12" max="100" value="18" onChange={
			(e) => {
				if (e.target.value > 100) {
					e.target.value = 100;
				}
				ChangeConfig("Font", "Size", e.target.value);
			}
		} />
		<label for="fontSelector"> Font</label>
		<span class="separator">·</span>
		<input type="checkbox" id="EnableSpellCheck" onChange={(e) => ChangeConfig("SpellCheckEnabled", e.target.checked)} />
		<label for="EnableSpellCheck"> Enable Spell Check</label>
	</div>);
}
