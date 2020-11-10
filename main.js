var todo = []; 

window.addEventListener('load',function(){ // loads window
    loadList();
    renderList('task-list'); // calls from local storage
    var form = document.getElementById('form'); // loads form/document
    form.addEventListener('submit',function(events){ // submit function is mouseclick or enter
    event.preventDefault(); // prevents window from reloading/resetting
    
            var input = document.getElementById('task-input'); // creates variable 'input' 
            var val = input.value; // input becomes a value
            createTask(val); // see lines 19+
            form.reset(); // empties form after Add
            var listitem = document.createElement('LI'); // Javascript creates HTML li's on the fly
            var listtext = document.createTextNode(val); // creates children (nodes) under HTML <ul>
            listitem.appendChild(listtext); // maybe adds new entries to list
            document.getElementById('task-list').appendChild(listitem); // brings all input lists to window
});
    document.getElementById('task-list').addEventListener('click',
    function(event){
        var clicktarget = event.target;
        var itemid = clicktarget.getAttribute('id');
        var status = clicktarget.getAttribute('data-status');
        if(status==1){
            changeStatus(itemid,0);
        }
        else{
            changeStatus(itemid,1);
        }
        renderList('task-list');
    });
});
function createTask(task){ // important for array
var timestamp = new Date().getTime(); // unique id for each li task
var item = {id:timestamp,task:task,status:0}; // task is the actual input, completion status. Each task is object in curly brackets
todo.push(item); // pushes list items to array
saveList(todo); // call to save item
}  

function saveList(list){ // If close app, will still remember task
    var objarray = JSON.stringify(list) // Need to turn into string. JSON javasc object notation - store obj
    localStorage.setItem("tasks",objarray); // saves into local storage
}

function loadList(){
    if(localStorage.getItem("tasks")){ // if check for item 'tasks' in local storage, next line if true
        todo = JSON.parse(localStorage.getItem("tasks"));
    } // reads what's in local storage and loads in to array ie. retrieves from storage and puts back into local storage screen (because deletes from local storage when refresh local storage page)
    }

function renderList(elm){
    var list = document.getElementById(elm);
    list.innerHTML='';
    var count = todo.length;
    var i=0;
    for(i=0;i<count;i++){ // for loop does something multiple times. ie how many items in to do list. Start at zero. i++ increments by 1 ie i+1.
        var li = document.createElement('LI');
        var txt = document.createTextNode(todo[i].task); // get number item i from todo list and only get property
        li.setAttribute('id',todo[i].id)
        li.setAttribute('data-status',todo[i].status);
        if(todo[i].status==1){
            li.setAttribute('class','done');
        }
        li.appendChild(txt);
        list.appendChild(li);
    }
}

function changeStatus(id,status){
    var count = todo.length;
    switch(status){
        case status=1:
            for(i=0;i<count;i++){
                if(todo[i].id==id){
                    todo[i].status=1;
                }
            }
            break;
        case status=0:
                for(i=0;i<count;i++){
                if(todo[i].id==id){
                    todo[i].status=0;
                }
            }
            break;
        default:
            break;
    }
}







