// Table with the values for each eltter
let valueLetters = [['A', 1], ['B', 3], ["C", 3], ["D", 2], ["E", 1], ["F", 4], ["G", 2], ["H", 4], ["I", 1], ["J", 8], ["K", 5], ["L", 1], ["M", 3], ["N", 1], ["O", 1], ["P", 3], ["Q", 10], ["R", 1], ["S", 1], ["T", 1], ["U", 1], ["V", 4], ["W", 4], ["X", 8], ["Y", 4], ["Z", 10]];

// Verify user input
function userInputChecker(userInput) {
	if(! userInput.match(/^([a-zA-Z ]+)$/))
    	return(0);
    else
    	return(1);
}

function wordPointsCalculator(word) {
	let i = 0;
	let total = 0;
	let j;

	while(i < word.length) {
		j = 0;
		while(j < valueLetters.length) {
			if (word[i].toUpperCase() == valueLetters[j][0])
				total += valueLetters[j][1];
			j++;
		}
		i++;
	}
	return(total);
}

// Solution 1, using the indexOf method
	// The indexOf method is in the String class
	// It takes as input a substring
	// and looks at its position in the string.
	// It then returns the position of this substring
	// or -1 if it isn't found.
	// This method is case sensitive.
function ocIsContainedV1(word) {
	let position = word.toLowerCase().indexOf("oc");

	if(position == -1)
		return(0);
	else
		return(1);
}

// Solution 2, home made
	// This method goes through the whole string and verifies
	// if there's an occurence of the "o" and then the "c".
function ocIsContainedV2(word) {
	let i = 0;

	while(i < word.length - 1) {
		if(word[i].toLowerCase() == "o" && word[i + 1].toLowerCase() == "c")
			return(1);
		i++;
	}
	return(0);
}

// "kayak" is a palindrome
// "Level"  is a palindrome
// "test"  is not a palindrome
function isItPalindrome(word) {
	let i = 0;
	let j = word.length - 1;

	while(i < j) {
		if (word[i].toLowerCase() != word[j].toLowerCase())
			return(0);
		i++;
		j--;
	}
	return(1);
}

function howManyWords() {
	let NbWords = document.getElementsByClassName("word").length;
	return(NbWords);
}

function getWordsTextContent() {
	let wordsEltsList = document.getElementsByClassName("word");
	let wordsList = [];

	for (let item of wordsEltsList) {
		if (item.getElementsByTagName("input")[0].value)
	    	wordsList.push(item.getElementsByTagName("input")[0].value);
	}

	return(wordsList);
}

function addNewWord() {
	let newWordPosition = howManyWords() + 1;

	const divElt = document.createElement("div");
	divElt.classList.add("word");

	const labelElt = document.createElement("label");
	labelElt.setAttribute("for", "word" + newWordPosition);
	labelElt.textContent = "Word " + newWordPosition + ":";

	const inputElt = document.createElement("input");
	inputElt.setAttribute("type", "text");
	inputElt.setAttribute("name", "word" + newWordPosition);

	divElt.appendChild(labelElt);
	divElt.appendChild(inputElt);
	document.getElementById("UserInput").appendChild(divElt);
}

function deleteLastWord() {
	const lastWordPosition = howManyWords() - 1;

	if (lastWordPosition > 0)
		document.getElementById("UserInput").removeChild(document.getElementsByClassName("word")[lastWordPosition]);
}

function cleanResultArea() {
	let resultArea = document.getElementById("calculatorResult");

	while (resultArea.firstChild) {
		resultArea.removeChild(resultArea.firstChild);
	}
}

///////////////////
// EVENTLISTENER //
///////////////////

// 
// Listen to the button click to add a word
function clicAdd() {
    addNewWord();
}

let boutonAdd = document.getElementById("add");
boutonAdd.addEventListener("click", clicAdd);



// 
// Listen to the button click to delete a word
function clicDelete() {
    deleteLastWord();
}

let boutonDelete = document.getElementById("delete");
boutonDelete.addEventListener("click", clicDelete);



// 
// Listen to the "Calculate the points for the word(s)" button click to
// calculate the points for the word(s)
function clicValidate() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
  		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
    	let wordPoints;
  		
  		if (userInput == 1) { 
  			wordPoints = wordPointsCalculator(item);
			pElt.textContent = "The word " + item + " is worth " + wordPoints + " points";
		} 
		else 
  			pElt.textContent = "The word " + item + " is invalid ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonValidate = document.getElementById("calculatorValidateBtn");
boutonValidate.addEventListener("click", clicValidate);



// 
// Listen to the "Palindrome ?" button click to verify if the word(s) is/are a palindrome(s).
function clicPalindrome() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
  		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
  		let Palindrome = isItPalindrome(item);

  		if (userInput == 1) { 
	  		if (Palindrome == 1)
				pElt.textContent = "The word " + item + " is a palindrome";
			else if (Palindrome == 0)
				pElt.textContent = "The word " + item + " is not a palindrome";
			else
				pElt.textContent = "Error with the function isItPalindrome";
  		}
  		else 
  			pElt.textContent = "The word " + item + " is invalid ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonPalindrome = document.getElementById("calculatorExtraPalindrome");
boutonPalindrome.addEventListener("click", clicPalindrome);



// 
// Listen to the "OC occurrence ?" button click to verify if there is an occurence of the string "oc" in the word(s)
function clicOC() {
	cleanResultArea();

    let wordsList = getWordsTextContent();

    wordsList.forEach(function(item){
		const pElt = document.createElement("p");
    	let userInput = userInputChecker(item);
    	let OC;

    	if (userInput == 1) { 
	  		OC = ocIsContainedV1(item);
	  		// OC = ocIsContainedV2(item);

	  		if (OC == 1)
				pElt.textContent = "The occurence \"OC\" is in the word " + item;
			else if (OC == 0)
				pElt.textContent = "The occurence \"OC\" is not in the word " + item;
			else
				pElt.textContent = "Error with the function ocIsContainedV1";
				// pElt.textContent = "Error with the function ocIsContainedV2;
  		}
  		else 
  			pElt.textContent = "The word " + item + " is invalid ";

  		document.getElementById("calculatorResult").appendChild(pElt);
	});
}

let boutonOC = document.getElementById("calculatorExtraOC");
boutonOC.addEventListener("click", clicOC);