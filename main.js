window.onload = function() {
	let textArea = document.querySelector('textarea');

	// Save Text Automatically
	const MySaveFunc = function() {
		localStorage.setItem("textData", textArea.value);
	};
	textArea.onfocusout = MySaveFunc;
	textArea.onfocusin = MySaveFunc;
	window.onbeforeunload = MySaveFunc;

	// Attach Tab Indent Hook
	textArea.onkeydown = function(e) {
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
	};

	const OnTextAreaChange = function() {
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
	}

	// Attach Word Count & Character Count Hook
	textArea.onkeyup = OnTextAreaChange;

	document.getElementById("fontSelector").onchange = function(e) {
		document.querySelector(':root').style.setProperty("--mainFont", e.target.value);
		textArea.focus();
	}

	document.getElementById("fontSize").onchange = function(e) {
		if (e.target.value > 100) e.target.value = 100;
		document.querySelector(':root').style.setProperty("--mainFontSize", `${e.target.value}px`);
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

	let textData = localStorage.getItem("textData");
	if (textData) {
		textArea.value = textData;
		OnTextAreaChange();
	}

	textArea.focus();
}

