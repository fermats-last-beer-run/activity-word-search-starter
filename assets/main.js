
const searchButton = document.querySelector('#search-button')
const textboxInput = document.querySelector('#textbox');
const quoteSentence = document.querySelector('#sentence');
const searchResults = document.querySelector('#search-results');

// Keep a safe copy of the orignal text content
const originalText = quoteSentence.innerHTML;

// Process a copy of text for searching
let searchSpace = quoteSentence.innerHTML.toLowerCase();
searchSpace = searchSpace.replace(/[^\w\s]/g, '')
console.log(searchSpace);

//Highlights all instances of a word within a text block
function highlight(word, text){
  let regex = new RegExp("\\b(" + word + ")\\b", "gi");
  text = text.replace(regex, "<mark>$1</mark>");
  return text;
}
// Counts number of instances of word within textArray, returns int
function countInstances(word, textArray) {
  let count = 0;
  function counter(textArray) {
    if (textArray.length == 0) {
        return count
    } if (textArray.shift() == word) {
      count += 1
    } 
    return counter(textArray);
  }
  return counter(textArray.slice(0));
}

searchButton.addEventListener('click', function () {
  // Reset text to non-highlighted
  quoteSentence.innerHTML = originalText;
  // Clean userInput
  let userInput = textboxInput.value.trim().toLowerCase();

  if (searchSpace.includes(userInput)) {
    // Split text into array and count each instance of word
    let searchArray = searchSpace.split(' ');
    let instances = countInstances(userInput, searchArray);
    searchResults.innerHTML = `A match was found! Word occured ${instances} times.`;
    // Run highlight function on quote
    quoteSentence.innerHTML = highlight(userInput, originalText);
  } else {
    searchResults.innerHTML = "No match found.";
  }
})

