---
title: Fundamental ingredient for website development
description: The fundamental ingredient for the website development are HTML, CSS, and JavaScript. We build an FAQ drop down example to explain the key ingredients for website development.
date: 2021-01-31T00:37:09.804Z
tags:
  - HTML
  - CSS
  - JavaScript
featuredpost: false
---

The fundamental ingredient for website development are HTML, CSS and JavaScript. Let's understand what each stand for...

_HTML_ is the markup language used to display content in the website like heading, paragraph, etc.. It defines the skeleton of the website.

_CSS_ is used for styling the HTML elements. It is used to style HTML elements by targeting their class, id. **HTML is just like the skeleton and CSS is the skin or outer shape/look of the body.**

_JavaScript_ is used for dynamic content appearing without refreshing the page. JavaScript was designed to add interactivity to HTML pages. **Just like, JavaScript defines the movement, behavior and action of the body.**

## What we build?

We build FAQ dropdown list with HTML, CSS, and JavaScript. For FAQ dropdown list, following features we are going to implement.

- Expand the FAQ when the user clicks and close all the other FAQs
- Count the total number of FAQ on the page
- Structure and Style the FAQ Form

You can preview for the FAQ dropdown list as below:

<video controls>
  <source src="https://storage.googleapis.com/masterpro/code/responsive-design/general/faq-dropdown.mp4" type="video/mp4">
</video>

You can view the full source code at CodePen. Link below:

https://codepen.io/taimoorsattar/pen/WNxxYYp

👆👆👆

## Tools and Software required

Before we start, we have to configure the system (PC) and install necessary tool for development. You can view people's setups for development [at this URL](https://uses.tech).

There are different editors for website development available on the internet. Each of them provide their own comfortable zone. So, let's suppose two scenario.

- Small Projects
- Public websites

For **small projects** means building projects for university or to showcase with your friends and family. For small projects, we recommend using the following online editors. We have listed popular online editor as below:

- [codepen.io](https://codepen.io)
- [jsfiddle.net](https://jsfiddle.net)
- [glitch.com](https://glitch.com)
- [repl.it](https://repl.it)

For public websites, online editors might not be the best options. You can install a code editor on your system. Few of the recommended options are as below.

- [VScode](https://code.visualstudio.com)
- [SublimeText](https://www.sublimetext.com)

For the FAQ Dropdown list, we use online editor, [codepen](https://codepen.io). CodePen Editor is split into 3 sections HTML, CSS and JavaScript. It will give you a live preview of your code and also you can customize your editor.

## Example: FAQ Dropdown List

To get started, we need to create a new pen at codepen as below...

![](https://storage.googleapis.com/masterpro/code/responsive-design/FAQ/codepen-new.gif)

To save your pen with `ctrl+s`, you need to register into codepen. You can register at codepen by providing the credential like email, name, and password etc.

In the HTML tab of codepen, write the below code and we will understand what below code means.

```html
<div class="wrapper">
  <h2 class="headline" id="main-headline">
    Frequent Questions about HTML, CSS and Javascript
  </h2>
  <p class="headline headline__text">
    Click the below tabs to expand the questionnaire.
  </p>

  <div id="FAQ">
    <div class="oneFAQ">
      <div class="question">
        <span class="headline headline__med headline--bold">
          First Question?
        </span>
      </div>

      <div class="answer">
        <p class="headline headline__text">Your answere here...</p>
      </div>
    </div>

    <div class="oneFAQ">
      <div class="question">
        <span class="headline headline__med"> Second Question </span>
      </div>

      <div class="answer show">
        <p class="headline headline__text">Your Answere here...</p>
      </div>
    </div>
  </div>
  <!-- FAQ -->
</div>
<!-- wrapper -->
```

In the above HTML, we have defined the markup for page. We use HTML elements to structure the content. Some of HTML elements are listed below.

- `<h1>` is the heading of the page. You can define up to 6 level of heading from `<h1>` to `<h6>`
- <p> define the paragraph in HTML
- <div> is a block-level element. It takes 100% of available width space.
- <span> is an inline element. It take space as per the content width.

Above mentioned is the default styling of HTML elements. We can customize these styling by targeting their `class` and `id` attribute in HTML elements. `class` and `id` are used to by CSS to style the HTML elements. We will discuss about the CSS styling later in this chapter.

The structure of HTML in the above code is as below.

```html
.wrapper └── .FAQ | └──.oneFAQ | ├── .question | └── .answer .show | └──.oneFAQ
| ├── .question | └── .answer . . .
```

We use the '.show` class in CSS to reveal the answer of FAQ's.

## Styling for the Website

We use `class` and `id` in the HTML elements. `class` and `id` are both the same thing but... the main difference is `id` with a unique name can reflected to a single HTML element but class can be attached to multiple HTML elements.

This `class` is the reference for CSS to style HTML elements. We can use these `class` names and assign specific styles property.

To understand about CSS styling, we need to understand the concept of **box model in CSS**.

Box Model in CSS is one of the most important concepts in CSS. Box Model consist of three main concepts as below:

- Padding
- Border
- Margin

In CSS, we can define margin, padding and border as below.

```css
/* example */
.box-model {
  /* Define the border of the box */
  border: 1px solid grey;

  /* Define the corner of the box */
  border-radius: 4px;

  padding: 8px 15px;

  margin: 15px;
  /* margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px; */
}
```

Box Model describe how you can adjust the spacing of HTML element using margin, padding and border properties.

The below image describe how margin, padding, and border adjust the spacing of HTML element.

![box Model](https://storage.googleapis.com/masterpro/code/responsive-design/box-model.jpg)

In the above HTML code, we can target the `.wrapper` class in CSS to adjust the width and .

```css
.wrapper {
  max-width: 960px;
  margin: 10px auto; /*  Center the content */
}
```

`.oneFAQ` class wraps the single item of FAQ.

```
.oneFAQ
  ├── .question
  └── .answer .show
```

`.show` class is added dynamically when the single item of HTML is clicked **using javascript**. It is used to reveal and hide the answer.

We use `.oneFAQ` class to adjust the spacing and styling of single FAQ list in CSS.

```css
.oneFAQ {
  margin: 0;
  border-radius: 4px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
```

`.question` classis used to adjust styling of question of FAQ.

```css
.question {
  background-color: #ececec;
  padding: 7px 15px;
  cursor: pointer;
}
```

`.answer` class, **by default hides** the HTML element and reveals when the `.show` class is added dynamically using JavaScript.

```css
.answer {
  background-color: #fbfbfb;
  position: absolute;
  visibility: hidden; /*  hides the content by default */

  padding: 7px 15px;
}
```

We use margin, padding and border to give some space for the HTML element.

### Hide and Reveal HTML elements in CSS

As we have mentioned above, `.show` class is used to hide and reveal the answer.

We have used JavaScript to add and remove `show` classes when an FAQ item is clicked. We need to define the styling of the `.show` class in CSS for hiding and revealing the answer.

There are several properties you can use in CSS to hide an object. Below are some of the properties in CSS to hide an object in CSS.

- `width: 0; height: 0;`
- `visibility: hidden;`
- `opacity: 0;`
- `position: absolute; top: -9999px; left: -9999px;`
- `display: none;`
- overflow: hidden

In CSS, display property hides the HTML element and removes the element completely from the document (DOM). while `visibility: hidden` hides the element, but it still takes up space of the HTML element in the layout.

We use the following CSS property to hide the answer of the FAQ item as below.

```css
.show {
  position: relative;
  visibility: visible;
}
```

## What Javascript can do?

The Javascript is the programming language of **browser**. Javascript is used for dynamic content appearing without refreshing the page. JavaScript was designed to add interactivity to HTML pages. Javascript could be used to:

- Add multimedia elements such as showing, hiding, changing, creating an image, do something on user action etc.
- Form processing such as modifying the contents of the form, user input validation etc.
- JavaScript makes it possible to create dynamic page contents.

From my point of view, javascript is used to add CSS style (classes and id) based on the user's actions.

In order for JavaScript to dynamically do something, we need to have the reference of that HTML element. You can get the reference of HTML for the command as below.

- `getElementById()` used to target ID of the HTML elements.
- `getElementsByTagName()`
- `getElementsByClassName()`
- `querySelectorAll()` used to target both ID and class names.

## What remaining task to complete using Javascript?

Using Javascript, we want to add following task in our FAQ dropdown list:

- Count the number of FAQ items when the DOM loads
- Show and hide the FAQ answer

For the **#1 task**, we need to count the number FAQ items. In Javascript, we use `DOMContentLoaded` event listener and get the reference to the FAQ items to count the number on the screen.

In Javascript, there are two ways to listen to the event using **addEventListener** and **on handler**. Event handler listen to certain action being perform and when the event is called, then it execute the callback function. We use `DOMContentLoaded` to listen when the DOM is loaded.

```javascript
document.addEventListener("DOMContentLoaded", event => {
  let headline = document.getElementById("main-headline")
  let FAQs = document.querySelectorAll(".oneFAQ")
  const FAQsArr = Array.from(FAQs)

  headline.innerHTML = `${headline.innerHTML} (${FAQsArr.length})`
})
```

As in the above code, we get the reference of the headline using `getElementById` and set it's inner HTML to the FAQ list count. Each FAQ item has a unique `.oneFAQ` class unique as we can get the reference to get the count.

For **task #2**, we need to show the answer of the FAQ item when it's clicked and collapse the other FAQ answer.

When the FAQ item is clicked, `toggleOff(this)` function is called. `toggleOff(this)` function contains all the logic for showing and hiding of FAQ's. `.oneFAQ` class is wrapped in a single FAQ item, so we can call this HTML element when it's clicked.

In the HTML code, we have to add event listener **onclick** on all HTML elements having the class of `.oneFAQ`.

```html
<div onclick="toggleOff(this)" class="oneFAQ"></div>
```

We have passed `this` parameter in the function `toggleOff(this)`. `this` in JavaScript actually refers to the instance what is actually calling it. There are multiple FAQ items with same class `.oneFAQ`, so to get the reference of clicked FAQ item we use `this` parameter. `this` parameter will pass the reference of the FAQ item which is clicked.

For example, if "Taimoor" is calling the function then the reference object passed is "Taimoor". In our FAQ websites, there are multiple FAQ with the same class names. If we want to add the `.show` class to the FAQ item to reveal the answer, then we have to get the reference using `this` parameter.

Also, in our function, we need to add some logical statement. The purpose of logical operation is to execute certain operations based on logic. In Javascript, we can perform logical operation using three ways:

- ternary operator
- if / else logic
- switch statement

```javascript
let isMember = true
let price

// ternary operator
price = isMember ? "$2.00" : "$10.00"

// if / else logic
if (isMember) {
  price = "$2.00"
} else {
  price = "$10.00"
}

// switch statement
switch (isMember) {
  case true:
    price = "$2.00"
    break
  case y:
    price = "$10.00"
    break
  default:
    price = "$2.00"
}
```

For add or remove class `.show`, we can use the following logical operation as below.

```js
// example
let answer = e.querySelector(".answer").classList
answer.contains("show") ? answer.remove("show") : answer.add("show")
```

In the Javascript code, we need to define `toggleOff` function as below:

```javascript
function toggleOff(e) {
  // Collapsing all the FAQs items
  let AllAnswer = document.querySelectorAll(".answer")
  AllAnswer.forEach(answer => {
    if (answer !== e) {
      answer = answer.classList
      answer.remove("show")
    }
  })

  // Showing only the clicked FAQ item
  let answer = e.querySelector(".answer").classList
  answer.contains("show") ? answer.remove("show") : answer.add("show")
}
```

Now, we have completed our basic FAQ app 🎉🎉🎉
