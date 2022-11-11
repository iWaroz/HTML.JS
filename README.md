
# HTML.JS

Sponsored by [Hostinger](https://hostinger.com/abyteofcode), get 10% off at checkout with code `ABYTEOFCODE`.

HTML.JS is a full stack javascript framework in which you don't need to write any javascript.

## Contributing

This demo was made mainly as satire, and as such is incomplete and does not provide any debugging help. If you want to make changes to improve the framework, go ahead lol

## Setup

Download the repository files into a node.js project and make sure to run the `index.js` file on execution. This will run your `script.html` file which is to contain your backend code.

## The Syntax

### Literals

Use `<int>12</int>` or `<str>hello world</str>` to create literal integers or strings. You also have `<true></true>` or `<false></false>` literal booleans. To create a list, use `<array></array>` with each tag inside of array being its own value of the list.

  

### Functions

Use 
```html

<function name>
  <arguments>
    <argument arg1></argument>
    <argument arg2></argument>
  </arguments>
  
  <block>
    ... code here
  </block>
</function>
``` 

to create a function. The name attribute and arguments are optional but not the block. A function without any name can be used directly as a value, with functions being first class citizens.

  

### Accessing Values

Use `<val name></val>` to get the value of a variable. If you need a property of it, add `<dot somethingElse></dot>` at the end of it (Eg. `<val console></val><dot log></dot>`)

  

### Assigning Values

Use `<set  foo>...</set>` to set the value of foo. To set a property or other runtime value, use

```html

<set>
  <name>
    ... composite name eg. <val  console></val><dot  log></dot>
  </name>

  ... value
</set>

```

In the case the value requires multiple tags, use `<group>... value</group>`.

  

### Functions & Operators

Call a function with `<call>[function][arg1][arg2][arg...]</call>`. In case the function or any argument is a composite value, be sure to use group. Similarily, operators work with `<op +>[arg1][arg2][arg...]</op>` with whatever operator you want to use instead of +.

  

### Conditionals

Use 

```html

<if>
  [condition]

  [code]
  [more code...]
</if>
```

for conditionals, then simply string on as many `<elif>` tags as you want with the same internal structure and finally an optional `<else>` tag without conditions.

  

### Looping

Use 
```html

<while>
  [condition]

  [code]
  [more code...]
</while>
```

The condition will be evaluated every iteration of the loop, and if it returns a falsy value, the loop will terminate. Otherwise, it will run the rest of the block.

  

## Behind the scenes

All the "framework" is doing is taking your HTML which looks very similar to how javascript is structured, and it converts the HTML into javascript and runs that. This means you can write code more efficiently by writing it in javascript first and then converting it to HTML.JS (that's what I did to make the code in the video lol)
