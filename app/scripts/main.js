Parse.initialize('byba0msI8fEyxF3Uu8mAdaWoO6yCicnptkuwXrGL', 'IkSFu4UW9LFrYzNIwBRDZmVvkmJJ3F4wp2kvf1Ma');

var TaskClass = Parse.Object.extend('TaskClass');
var TaskClassCollection = Parse.Collection.extend({
	model: TaskClass
});

var tasks = new TaskClassCollection();


$('document').ready(function() {
	$('.complete h1').hide();
	fetchTaskCollection(tasks);
	addTask();	
	completeTask();
	deleteTask();	
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
	var task = new TaskClass();
	var inputVal = $('#form-input').val();
	task.set('task', inputVal);
	task.set('isComplete', false);

	task.save(null, {
		success: function(result){
			console.log('it worked');
			addToTaskList(result);
			$('#form-input').val('');
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
  				$('.complete h1').show();
  				$('#completed-list').append(li);
  				$('input:checked').parent().remove();

  }
}


$('.save-edit').click(function(){	
	var id = $('input:checked').val()
	var query = new Parse.Query(TaskClass);
	var inputVal = $('#edit-text').val();
	query.equalTo('objectId', id);
	query.find({
		success: function(result) {
			result[0].set('task',inputVal); 
			result[0].save();
		},
		error: function(result, error) {
			console.log(error.description)
		}
	})	
})




// function addTask () {
// 	$('.add').click(function(event){
// 	event.preventDefault();
// 	var task = new TaskClass();
// 	var inputVal = $('#form-input').val();
// 	task.set('task', inputVal);
// 	task.set('isComplete', false);

// 	task.save(null, {
// 		success: function(result){
// 			console.log('it worked');
// 			addToTaskList(result);
// 			$('#form-input').val('');
// 		},
// 		error: function(result, error){
// 			console.log(error.description);
// 		}
// 	});
// });

// }







