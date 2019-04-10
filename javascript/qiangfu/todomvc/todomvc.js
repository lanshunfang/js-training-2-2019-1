$(document).ready(function() {
  var $inputTodo = $('#input_todo');
  var $ulTodoList = $('#ul_todolist');
  var $summaryZone = $('.summaryzone');
  var localStorage = window.localStorage;
  var intTodoItemID = localStorage.getItem('TodoItemID');
  var arrTodoList = JSON.parse(localStorage.getItem('TodoList')).sort(function(a, b) { return b.TodoItemID - a.TodoItemID });
  var selectedID = '';

  //初始化时，从localstorage里面读取所有任务
  showTodoList(arrTodoList);

  //根据传入的待办任务数组，显示待办事项
  //根据是否完成IsCompleted，设置完成/未完成样式
  function showTodoList(arrShowedTodoList) {
    $ulTodoList.empty();
    if (arrShowedTodoList !== null) {
      for (var i = 0; i < arrShowedTodoList.length; i++) {
        var item = arrShowedTodoList[i];

        $ulTodoList.append('<li>' +
          '<label id="TodoItemID">' + item.TodoItemID + '</label>' +
          (item.IsCompleted ? '<i class="fa fa-check-circle iCompleted' : '<i class="fa fa-circle-thin iUnCompleted') +
          '" aria-hidden="true"></i>' +
          (item.IsCompleted ? '<label class="labelDeletedTodo">' : '<label>') + item.ToDoItem + '</label>' +
          '<i class="fa fa-remove pull-right ideleteTodo" aria-hidden="true"></i></li>');
      }
      refreshTodoListCount();
    }
  }

  //输入框回车的事件，向ul内append li，并清空输入框
  $inputTodo.keydown(function(event) {
    var inputVal = $inputTodo.val().trim();
    if (event.which === 13 && inputVal) {
      intTodoItemID++;
      $ulTodoList.append('<li>' +
        '<label id="TodoItemID">' + intTodoItemID + '</label>' +
        '<i class="fa fa-circle-thin iUnCompleted" aria-hidden="true"></i>' +
        '<label>' + inputVal + '</label>' +
        '<i class="fa fa-remove pull-right ideleteTodo" aria-hidden="true"></i></li>');

      //新增todo list，保存到Local Storage内
      addNewTodoItem(inputVal);

      $inputTodo.val("");
    }
  });

  //todo list中图标点击事件
  //通过判断i标签类名确定需要做的事情是完成还是激活或删除
  $ulTodoList.on('click', 'i', function(e) {
    var $this = $(this);
    selectedID = $this.parent().find('#TodoItemID').text();
    if ($this.hasClass('ideleteTodo')) {
      deleteTodoItem();
      $this.parent().remove();
    } else if ($this.hasClass('iUnCompleted')) {
      $this.removeClass('iUnCompleted fa-circle-thin');
      $this.addClass('fa-check-circle iCompleted');
      $this.next().addClass('labelDeletedTodo');
      setTodoItemCompleted(true);
    } else if ($this.hasClass('iCompleted')) {
      $this.removeClass('iCompleted fa-check-circle');
      $this.addClass('fa-circle-thin iUnCompleted');
      $this.next().removeClass('labelDeletedTodo');
      setTodoItemCompleted(false);
    }
  });

  //状态栏点击链接，切换查询不同状态的数据
  $summaryZone.on('click', 'a', function(e) {
    var $this = $(this);
    $this.siblings('a').removeClass('selected');
    $this.addClass('selected');
    showTodoListByStatus($this.attr('id'));
  })

  //新增todolist item
  //1. 更新TodoItemID
  //2. 更新ToDoList
  function addNewTodoItem(inputVal) {
    localStorage.setItem('TodoItemID', intTodoItemID);
    if (arrTodoList === null) {
      arrTodoList = [];
    }
    var todoListItem = {
      TodoItemID: intTodoItemID,
      ToDoItem: inputVal,
      IsCompleted: false
    }
    arrTodoList.push(todoListItem);
    localStorage.setItem('TodoList', JSON.stringify(arrTodoList));
  }

  //删除todo item
  //清除localstorage
  function deleteTodoItem() {
    if (selectedID === null) {
      alert('没找到任务项！');
    } else {
      arrTodoList = arrTodoList.filter(filterByID);
      localStorage.setItem('TodoList', JSON.stringify(arrTodoList));
      refreshTodoListCount();
    }
  }

  function filterByID(item) {
    return item.TodoItemID != selectedID;
  }

  //设置完成、未完成
  //土方法：对数组遍历，找到对象后，设置为已完成或未完成，更新localstorage
  function setTodoItemCompleted(isCompleted) {
    var item;
    if (selectedID === null) {
      alert('没找到任务项！');
    } else {
      for (item in arrTodoList) {
        if (arrTodoList[item].TodoItemID == selectedID) {
          arrTodoList[item].IsCompleted = isCompleted;
          localStorage.setItem('TodoList', JSON.stringify(arrTodoList));
          break;
        }
      }
      refreshTodoListCount();
    }
  }

  //计算并显示未完成的待办事项数量
  //土方法：遍历数组，计算未完成任务的总数
  function refreshTodoListCount() {
    var item;
    var countOfTodoList = 0;
    for (item in arrTodoList) {
      if (!arrTodoList[item].IsCompleted) {
        countOfTodoList++;
      }
    }
    $('#todo_count').text(countOfTodoList + ' items left');
  }

  //根据状态对数组进行filter，并将filter之后的数组交给showTodoList函数展现
  function showTodoListByStatus(status) {
    if (status == 'all') {
      showTodoList(arrTodoList);
    } else if (status == 'active') {
      showTodoList(arrTodoList.filter(filterActiveItems));
    } else if (status == 'completed') {
      showTodoList(arrTodoList.filter(filterCompletedItems));
    } else { alert('状态错误！') }
  }

  function filterActiveItems(item) {
    return item.IsCompleted === false;
  }

  function filterCompletedItems(item) {
    return item.IsCompleted === true;
  }
});