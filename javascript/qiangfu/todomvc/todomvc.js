$(document).ready(function() {
  var $input_todo = $('#input_todo');
  var $ul_todolist = $('#ul_todolist');
  var localStorage = window.localStorage;
  var intID = localStorage.getItem('ID');
  var arrTodoList = JSON.parse(localStorage.getItem('TodoList'));
  var deleteID = '';

  //初始化时，从localstorage里面读取所有任务
  if (arrTodoList !== null) {
    for (var i = 0; i < arrTodoList.length; i++) {
      var item = arrTodoList[i];
      if (item.IsCompleted) {
        $ul_todolist.append("<li>" +
          "<label id=\"ID\">" + item.ID + "</label>" +
          "<i class=\"fa fa-circle-thin iCompleted\" aria-hidden=\"true\"></i>" +
          "<label>" + item.ToDoItem + "</label>" +
          "<i class=\"fa fa-remove pull-right ideleteTodo\" aria-hidden=\"true\"></i></li>");
      } else {
        $ul_todolist.append("<li>" +
          "<label id=\"ID\">" + item.ID + "</label>" +
          "<i class=\"fa fa-circle-thin iUnCompleted\" aria-hidden=\"true\"></i>" +
          "<label>" + item.ToDoItem + "</label>" +
          "<i class=\"fa fa-remove pull-right ideleteTodo\" aria-hidden=\"true\"></i></li>");
      }
    }
  }

  //输入框回车的事件，向ul内append li，并清空输入框
  $input_todo.keydown(function(event) {
    var inputVal = $input_todo.val();
    if (event.which === 13 && inputVal !== '') {
      intID++;
      $ul_todolist.append("<li>" +
        "<label id=\"ID\">" + intID + "</label>" +
        "<i class=\"fa fa-circle-thin iUnCompleted\" aria-hidden=\"true\"></i>" +
        "<label>" + inputVal + "</label>" +
        "<i class=\"fa fa-remove pull-right ideleteTodo\" aria-hidden=\"true\"></i></li>");

      //新增todo list，保存到Local Storage内
      addNewTodoItem(inputVal);

      $input_todo.val("");
    }
  });

  //todo list中图标点击事件
  //通过判断i标签类名确定需要做的事情是完成还是激活或删除
  $ul_todolist.on('click', 'i', function(e) {
    var $this = $(this);
    deleteID = $this.parent().find('#ID').text();
    if ($this.hasClass('ideleteTodo')) {
      deleteTodoItem();
      $this.parent().remove();
    } else if ($this.hasClass('iUnCompleted')) {
      $this.removeClass('iUnCompleted fa-circle-thin');
      $this.addClass('fa-check-circle iCompleted');
      $this.next().addClass('labelDeletedTodo');
    } else if ($this.hasClass('iCompleted')) {
      $this.removeClass('iCompleted fa-check-circle');
      $this.addClass('fa-circle-thin iUnCompleted');
      $this.next().removeClass('labelDeletedTodo');
    }
  });

  $('#todo_all').on('click', '', function() {
    $(this).addClass('labelselected');
  })

  //新增todolist item
  //1. 更新ID
  //2. 更新ToDoList
  function addNewTodoItem(inputVal) {
    localStorage.setItem('ID', intID);
    if (arrTodoList === null) {
      arrTodoList = [];
    }
    var todoListItem = {
      ID: intID,
      ToDoItem: inputVal,
      IsCompleted: false
    }
    arrTodoList.push(todoListItem);
    localStorage.setItem('TodoList', JSON.stringify(arrTodoList));
  }

  //删除todo item
  //清除localstorage
  function deleteTodoItem() {
    if (deleteID === null) {
      alert('删除任务项失败');
    } else {
      arrTodoList = arrTodoList.filter(filterByID);
      localStorage.setItem('TodoList', JSON.stringify(arrTodoList));
    }
  }

  function filterByID(item) {
    return item.ID != deleteID;
  }
});