function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = document.getElementById('task').value;
    // var bgColor = document.getElementById('bgColor').value;

    var todos = get_todos();
    todos.push({task:task , bgColor : "#ebebeb" });
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function changeColor() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos[id].bgColor = document.querySelector( ` input[id="${id}"] ` ).value ;
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
 
    return false;
}
 
function show() {
    var todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li style="background:'+todos[i].bgColor+'"><p class="itemValue">' + todos[i].task +
        '</p><span class="myItemContainer"><button class="down">down</button><button class="up">up</button><input id="' + i  + '" type="color" class="itemColor"><button class="remove" id="' + i  + '">delete</button></span></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    var itemsColors = document.getElementsByClassName('itemColor');
    for (var i=0; i < itemsColors.length; i++) {
        itemsColors[i].addEventListener('input', changeColor); 
    };
}
 
form.addEventListener('submit', add);
show();