window.onload = function() {
	let textArea = document.querySelector('textarea');

	// Attach Tab Indent Hook
	textArea.addEventListener('keydown', function(e) {
		if (e.key == 'Tab') {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

			// put caret at right position again
			this.selectionStart =
			this.selectionEnd = start + 1;
		}
	});

	// Attach Word Count & Character Count Hook
	textArea.addEventListener('keyup', function() {
		const wpm = 225;
		const match = textArea.value.match(/\S+/g);
		if (match != null) {
			document.getElementById("WordCount").innerText = `${match.length} ${match.length > 1 ? "words" : "word"}`;
			document.getElementById("CharacterCount").innerText = `${textArea.value.length} chars`;

			const time = match.length / wpm;
			document.getElementById("TimeToRead").innerText = time >= 1 ? `${Math.ceil(time)} minute read (${wpm} wpm)` : `Less than a minute read`;
		} else {
			document.getElementById("WordCount").innerText = `0 words`;
			document.getElementById("CharacterCount").innerText = `0 chars`;
			document.getElementById("TimeToRead").innerText = `Nothing to read`;
		}
	});

	textArea.focus();

	document.getElementById("UseFontSerif").onchange = function(e) {
		if (e.target.checked == true) {
			document.querySelector(':root').style.setProperty("--mainFont", "'Courier Prime', serif");
		} else {
			document.querySelector(':root').style.setProperty("--mainFont", "'Cousine', monospace");
		}
		textArea.focus();
	}
	document.getElementById("EnableSpellCheck").onchange = function(e) {
		if (e.target.checked == true) {
			textArea.setAttribute("spellcheck", "true");
		} else {
			textArea.setAttribute("spellcheck", "false");
		}
		textArea.focus();
	}
}

