TODO LIST  UI  and its functionality

- Add Function

- Simple and Minimal UI

- I add a task and goes to a list

- When I click it  creates a vertical line on the paragraph

- I could edit the  list

- Clear Function

- ## Process of building the todo app

- [x] Create A UI

- [x] Submit task

- [x] I add a to do on the list

- [x] Creates a vertical line when click

- [x] Checkbox button to know If  the todo is done

- [x] Clear task

- [x] Saves on local storage

- [x] Style the Prompt (optional)

- [x] add spacing on the checbox

### How

 The `addTask` function is responsible for adding the tasks into the taskBoard. It first locates the UL element in the page, secondly creates a new li element, then it assigns and formats how the task should appear on the taskboard. 

What Process

##### So first we create a LoadEvent

 it is responsible for grouping all the events that app is going to listen, Then it calls the submit function

```javascript
function submit(e){
  e.preventDefault();
  let taskList;
  let input = document.querySelector('input');
  if (input.value != ''){
    addTask(input.value);
    input.value = '';
  }
}
```



##### The addTask function 

is rseponsible for adding the task into the taskboard

- It locates the <ul> element in the page
- creates a new <li> element
- assigns and format how the task should appear on the taskboard
- appends the new <li> element within the <ul>

```javascript
function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML =  `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
  ul.appendChild(li);
  document.querySelector('.taskBoard');
}
```



##### t**he DeleteorTick function** 

it checks the className of the element that was clicked, if it had the class name of delete > it calls the deleteTask function, else it calls the tickTask function

```javascript
function deleteOrTick (e) {

 *if*(e.target.className == 'delete'){

  deleteTask(e);

 }*else*{

  tickTask(e);

 }

}
```



##### **The deleteTask function**

it first gets the parent element of the target,which is the <li> element, then it gets the parentNode of the li which is the <ul>. it then calls the removeChild on the parent element and takes as a paremeter the li selected which is then removed from the DOM.

```Javascript
function deleteTask(e){
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);
}
```

