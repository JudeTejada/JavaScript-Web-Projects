The Problem

One of the things that I learned from this small project is targeting specific style on an input. The key here is that whenever we add a listener for each of the event we want the value to only work on a specific CSS property

How did I manage to target a specific CSS property

Essentiallly on solving this problem we need to declare variables in the css for each property of the border
border-top: calc(var(--border-Left) \* 1px)
....

We will use css variables on targeting each specific css property in the input

We then target all of the input and add a listener

Afterwards, we will target the root element of the style
document.documentElement.style

//returns "--tleft" --> value

//note that the css variables and the name property has all the same name

AFter we got the css variables for the element

// set variable on inline style
document.documentElement.style.setProperty(
`--${e.target.name}`,
e.target.value,
);

where --\${e.target.name} refers to the name
where e.target.value refers to the value of the input
