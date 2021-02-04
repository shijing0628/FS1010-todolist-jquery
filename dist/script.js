// display list

function display(index, task) {
 $(".todo-list").append(
  '<li><div class="left-cont"><input type="checkbox" id="check-' +
  index +
  '" name="" /><label for="check-' +
  index +
  '"></label><span>' +
  task +
  '</span></div><span class="remove"><i class="fas fa-trash-alt"></i></span></li>'
 );
}

// INSERT CODE HERE

$(document).ready(function () {
 $(".form-control").focus();
 let count = 0;
 const localStorageContent = localStorage.getItem("tasks");
 let tasks = [];
 if (localStorageContent === null) {
  tasks = [];
 } else {
  tasks = JSON.parse(localStorageContent);
  $.each(tasks, function (index, task) {
   display(index, task);
  });
 }

 // add item to the list
 $('input[type="text"]').keypress(function (e) {
  if (e.which === 13) {
   e.preventDefault();
   let inputVal = $(this).val();
   if (inputVal !== "") {
    count++;
    display(count, inputVal);
    tasks.push(inputVal);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    $(this).val("");
    $(".form-control")
     .parent().next().removeClass('alert').addClass('hide-alert');
   }
   else {
    $(".form-control")
     .parent().next().removeClass('hide-alert').addClass('alert');
   }
  }
 });

 // change checkbox: task color turn to grey, display trash bin, auto move to the bottom
 $(document).on("change", 'input[type="checkbox"]', function () {
  if ($(this).is(":checked")) {
   $(this).closest("li").children(".remove").addClass("active");
   $(this).next().next().addClass("text-disable");
   $(this).closest("li").appendTo("ul");
  } else {
   $(this).closest("li").children(".remove").removeClass("active");
   $(this).next().next().removeClass("text-disable");
  }
 });

 // remove single item, only remove the last item once click trash bin icon
 $(document).on("click", ".remove", function () {
  let currentTask = $("ul li:last-child").text();
  let upDateTasks = [];
  upDateTasks = tasks.filter(function (task) {
   return task !== currentTask;
  });
  localStorage.setItem("tasks", JSON.stringify(upDateTasks));
  $(this).parent().remove();
  location.reload();
 });

 // delete all tasks in the list
 $(document).on("click", ".btn", function () {
  $(".todo-list").remove();
  localStorage.setItem("tasks", JSON.stringify([]));
  location.reload();
 });

 // sortable item
 $("#sortable").sortable();
 $("#sortable").disableSelection();
});