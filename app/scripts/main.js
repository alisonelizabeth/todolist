Parse.initialize('byba0msI8fEyxF3Uu8mAdaWoO6yCicnptkuwXrGL', 'IkSFu4UW9LFrYzNIwBRDZmVvkmJJ3F4wp2kvf1Ma');

var TaskClass = Parse.Object.extend('TaskClass');
var TaskClassCollection = Parse.Collection.extend({
	model: TaskClass
});

var tasks = new TaskClassCollection();

$('document').ready(function() {
	$('.complete').hide();
	fetchTaskCollection(tasks);
	addTask();
	$('.edit').click(function() {
		if ($('#check-it:checked').length !== 0){
		$('#myModal').modal();
	}
	});
	completeTask();
	deleteTask();
	editTask();	
		
	// });
}); 
// end of document ready 

// functions begin 
// fetches TaskCollection 
function fetchTaskCollection(tasks) {
	tasks.fetch({
		success: function(collection) {
			collection.each(function(task){
				addToTaskList(task);
				complete(task);
				disableClick();
		});
	},
		error: function(collection, error) {
			console.log(error.description);
	}
});
};

// saves task  
function addTask () {
	$('.add').click(function(event){
	event.preventDefault();
	if (validateForm()) 
	var task = new TaskClass();
	var inputVal = $('#form-input').val();
	task.set('task', inputVal);
	task.set('isComplete', false);

	task.save(null, {
		success: function(result){
			console.log('it worked');
			addToTaskList(result);
			$('#form-input').val('');
			disableClick();
		},
		error: function(result, error){
			console.log(error.description);
		}
	});
});
}

// complete task and saves sets property isComplete to true  
function completeTask() {
$('.completed').click(function(){
		var id = $('input:checked').val();
		var query = new Parse.Query(TaskClass);
		query.equalTo('objectId', id);
		query.find({
			success: function(result) {
				result[0].set('isComplete', true);
				result[0].save();
				complete(result[0]);
			},
			error: function(result, error) {
				console.log(error.description);
			}
		});
	});
}

// deletes task from Parse 
function deleteTask () {
	$('.delete').click(function() {
		var id = $('input:checked').val();
		var query = new Parse.Query(TaskClass);
		query.equalTo('objectId', id);
		query.find({
			success: function(result) {
				result[0].destroy();
				$('input:checked').parent().remove();
			},
			error: function(result, error) {
				console.log(error.description);
			}
		});
	});
}

// edits task and updates the li 
function editTask () {
	$('.save-edit').click(function(){
		if (validateModalForm ())
		var id = $('input:checked').val()
		var query = new Parse.Query(TaskClass);
		var inputVal = $('#edit-text').val();
		query.equalTo('objectId', id);
		query.find({
			success: function(result) {
				$('#edit-text').val('');
				result[0].set('task',inputVal); 
				result[0].save();
				$('input:checked').parent().remove();
				var test = result[0].id;
				var li = $('<div class="checkbox">' + '<input id="check-it" value='+test+' type="checkbox">' + '<li>' + result[0].get('task') + '</li>');
				$('#task-list').append(li);

			},
			error: function(result, error) {
				console.log(error.description)
			}
		});	
	});
}

// validates task input form 
function validateForm () {
			var valid = true;
			$('#form-input').removeClass("highlight")
			$('.message').html('<p> </p>')
			$('#form-input').each(function(){
				if ($(this).val() == "") {
					valid = false
					$(this).addClass("highlight")
					$('.message').html('<p>*Please enter a task.</p>')
				}
			});
			 return valid
		}

// validates input on modal 
function validateModalForm () {
			var valid = true;
			$('#edit-text').removeClass("highlight")
			$('.modal-message').html('<p> </p>')
			$('#edit-text').each(function(){
				if ($(this).val() == "") {
					valid = false
					$(this).addClass("highlight")
					$('.modal-message').html('<p>*Please enter a task.</p>')
				}
			});
			 return valid
		}

// adds incompleted tasks to task list 
function addToTaskList(task) {
	var test = task.id;
	if (task.get('isComplete') === false) {
		var li = $('<div class="checkbox">' + '<input id="check-it" value='+test+' type="checkbox">' + '<li>' + task.get('task') + '</li>');
		$('#task-list').append(li);
		}
	}
	
// adds completed tasks to #completed-list div 
function complete (task) {
  	var li = $('<li>'+ '<span class="glyphicon glyphicon-thumbs-up">' + '</span>' + task.get('task') + '</li>');
  		console.log(task);
  			if (task.get('isComplete') === true) {
  				$('.complete').show();
  				$('#completed-list').append(li);
  				$('input:checked').parent().remove();

  }
}

// allows user to only click one checkbox at a time 
function disableClick () {
 	var checkboxes = $('input#check-it')
	checkboxes.click(function(){
 		var self = this;
 		checkboxes.each(function(){
 			if (this!==self) this.checked = ''
 		});
 	});
}
