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
  GET
};

function parseChildren(elem) {
    return [...elem.children].map(parseElem)
  }
  
  function parseElem(elem) {
    return (parsers[elem.tagName] ?? (e => "{" + parseChildren(e) + "}"))(elem)
  }
  
  function INT(elem) {
    return elem.textContent;
  }
  
  function STR(elem) {
    return '"' + elem.textContent + '"';
  }
  
  function DOT(elem) {
    return "." + (elem.getAttribute("_") ?? elem.attributes[0].name);
  }
  
  function VAL(elem) {
    return elem.getAttribute("_") ?? elem.attributes[0].name ?? "null";
  }
  
  function GROUP(elem) {
    return "(" + parseChildren(elem).join("") + ")"
  }
  
  function NAME(elem) {
    return parseChildren(elem).join("")
  }
  
  function OP(elem) {
    return parseChildren(elem).join(elem.getAttribute("_") ?? elem.attributes[0].name);
  }
  
  function CALL(elem) {
    return parseElem(elem.children[0]) + "(" + parseChildren(elem).slice(1).join() + ")"
  }
  
  function SET(elem) {
    if (elem.children[0].tagName === "NAME") {
      return parseElem(elem.children[0]) + "=" + parseElem(elem.children[1]) + ";";
    } else {
      return (elem.getAttribute("_") ?? elem.attributes[0].name) + "=" + read(elem) + ";";
    }
  }
  
  function ARGUMENT(elem) {
    return elem.getAttribute("_") ?? elem.attributes[0].name;
  }
  
  function ARGUMENTS(elem) {
    return parseChildren(elem).join();
  }
  
  function FUNCTION(elem) {
    res = "function ";
    if (elem.attributes.length > 0) {
      res += elem.attributes[0].name
    }
    if (elem.children[0].tagName === "ARGUMENTS") {
      res += "(" + parseElem(elem.children[0]) + ") {" + parseChildren(elem).slice(1).join("") + "}"
    } else {
      res += "() {" + parseChildren(elem).join("") + "}"
    }
    return res;
  }
  
  function IF(elem) {
    return "if (" + parseElem(elem.children[0]) + ') {' + parseChildren(elem).slice(1).join("") + "}"
  }
  
  function ELIF(elem) {
    return "else if (" + parseElem(elem.children[0]) + ') {' + parseChildren(elem).slice(1).join("") + "}"
  }
  
  function ELSE(elem) {
    return "else {" + parseChildren(elem).slice(1).join("") + "}"
  }
  
  function WHILE(elem) {
    return "while (" + parseElem(elem.children[0]) + ') {' + parseChildren(elem).slice(1).join("") + "}"
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
    return "[" + parseElem(elem.children[0]) + "]"
  }

function getData(e) {
  content = ""
  console.log(e.tagName)
  switch (e.tagName) {
    case "SET": console.log(e, e.children[0].tagName); 
      if (e.children[0].tagName === "NAME") {console.warn(getData(e.children[0]) + "=" + getData(e.children[1]) + ";"); content += getData(e.children[0]) + "=" + getData(e.children[1]) + ";"}
      else {console.info("err"); content += e.attributes[0].name + "=" + read(e) + ";"; break}
    default: 
      content += e.childNodes.length > 0 ? read(e) : "|"; console.log(">>>", e.tagName || e.textContent, e.childNodes.length, [...e.childNodes].map(e => e.tagName))
  }

  return content;
}

function read(dom) {
  content = "" ;
  [...dom.children].forEach(e => {
      content += getData(e);
  })
  return content
}

document.querySelectorAll("do").forEach(e => e.style = "display: none;")

document.querySelectorAll("do").forEach(
    e => eval(parseChildren(e).join(""))
);
