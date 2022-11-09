const parsers = {
  INT,
  STR,
  DOT,
  VAL,
  GROUP,
  NAME,
  OP,
  CALL,
  SET,
  FUNCTION,
  ARGUMENT,
  ARGUMENTS,
  IF,
  ELIF,
  ELSE,
  TRUE,
  FALSE,
  WHILE,
  GET,
	BODY
};

function firstChild(elem) {
	return elem.firstChild;
}

function parseChildren(elem) {
	if (elem.querySelectorAll) {
		return [...elem.querySelectorAll(":scope > *")].map(parseElem)
	} else {
		return ""
	}
}

function parseElem(elem) {
	if (typeof parsers[elem.tagName] === "undefined") {
		console.log(elem)
	}
	return (parsers[elem.tagName] ?? (e => "--|" + parseChildren(e) + "|--"))(elem)
}

function INT(elem) {
	return elem.textContent;
}

function STR(elem) {
	return '"' + elem.textContent + '"';
}

function DOT(elem) {
	return "." + (elem.getAttribute("_") ?? Object.keys(elem.attributes)[0]);
}

function VAL(elem) {
	console.log(elem.attributes)
	return elem.getAttribute("_") ?? Object.keys(elem.attributes)[0] ?? "null";
}

function GROUP(elem) {
	return "(" + parseChildren(elem).join("") + ")"
}

function NAME(elem) {
	return parseChildren(elem).join("")
}

function OP(elem) {
	if (elem.rawAttrs[0] === "_") {
		attr = elem.rawAttrs.replace(`_=("|')`, '').replace(`("|')`)
	} else {
		attr = elem.rawAttrs
	}
	return parseChildren(elem).join(attr);
}

function CALL(elem) {
	return parseElem(firstChild(elem)) + "(" + parseChildren(elem).slice(1).join() + ")"
}

function SET(elem) {
	if (firstChild(elem).tagName === "NAME") {
		return parseElem(firstChild(elem)) + "=" + parseElem(firstChild(elem).nextSibling) + ";";
	} else {
		return (elem.getAttribute("_") ?? Object.keys(elem.attributes)[0]) + "=" + parseChildren(elem) + ";";
	}
}

function ARGUMENT(elem) {
	return elem.getAttribute("_") ?? Object.keys(elem.attributes)[0];
}

function ARGUMENTS(elem) {
	return parseChildren(elem).join();
}

function BODY(elem) {
	return parseChildren(elem).join("")
}

function FUNCTION(elem) {
	res = "function ";
	if (elem.attributes.length > 0) {
		res += Object.keys(elem.attributes)[0]
	}
	if (firstChild(elem).tagName === "ARGUMENTS") {
		res += "(" + parseElem(firstChild(elem)) + ") {" + parseChildren(elem).slice(1).join("") + "}"
	} else {
		res += "() {" + parseChildren(elem).join("") + "}"
	}
	return res;
}

function IF(elem) {
	return ";if (" + parseElem(firstChild(elem)) + ') {' + parseChildren(elem).slice(1).join(";") + "}"
}

function ELIF(elem) {
	return "else if (" + parseElem(firstChild(elem)) + ') {' + parseChildren(elem).slice(1).join("") + "}"
}

function ELSE(elem) {
	return "else {" + parseChildren(elem).slice(1).join("") + "}"
}

function WHILE(elem) {
	return ";while (" + parseElem(firstChild(elem)) + ') {' + parseChildren(elem).slice(1).join("") + "}"
}

function TRUE(elem) {
	return "true"
}

function FALSE(elem) {
	return "false"
}

function ARRAY(elem) {
	return "[" + parseChildren(elem).join() + "]"
}

function GET(elem) {
	return "[" + parseElem(firstChild(elem)) + "]"
}

const fs = require('fs');
const htmlparser = require('node-html-parser');

fs.readFile('script.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  root = htmlparser.parse(data).removeWhitespace()
	out = parseChildren(root).join(";")
	console.log(out)
	eval(out)
});
