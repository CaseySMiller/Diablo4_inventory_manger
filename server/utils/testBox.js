let text = "Some text with a lucky Hit and also Lucky Hit:";

// Using the regular expression with the 'i' flag to make it case-insensitive
const pattern = new RegExp("lucky hit(?::|$)|Lucky Hit", "gi");

// Replacing occurrences of "lucky hit" or "Lucky Hit:" with "New String"
const newText = text.replace(pattern, "New String");

console.log(newText);