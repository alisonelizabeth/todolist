Parse.initialize("byba0msI8fEyxF3Uu8mAdaWoO6yCicnptkuwXrGL", "IkSFu4UW9LFrYzNIwBRDZmVvkmJJ3F4wp2kvf1Ma");

var TaskClass = Parse.Object.extend("TaskClass");
var TaskClassCollection = Parse.Collection.extend({
	model: TaskClass
});

var tasks = new TaskClassCollection()

tasks.fetch({
	success: function(collection) {
		collection.each(function(task){
			addToTaskList(task)
			complete(task)
		})
	}
})

$('.add').click(function(event){
	event.preventDefault();
	var task = new TaskClass();
	var inputVal = $('#form-input').val()
	task.set('task', inputVal);
	task.set("isComplete", false);

	task.save(null, {
	success: function(result){
		console.log('it worked')
		addToTaskList(result)
		},
	error: function(result, error){
		console.log(error.description)
		}
	})
})
 


function addToTaskList(task) {
	var test = task.id 
	var li = $('<div class="checkbox">' + '<input id="check-it" value='+test+' type="checkbox">' + '<li>' + task.get('task') + '</li>')
	$('#task-list').append(li)
}


function complete (task) {
  var li = $('<li>'+ task.get('task') + '</li>')
  console.log(task)
  	if (task.get('isComplete') === true) {
  		$('#completed-list').append(li)
  }
}



$('.completed').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	query.equalTo("objectId", id);
	query.find({
		success: function(result) {
			$('input:checked').parent().remove();
			result[0].set("isComplete", true); 
			result[0].save();
			// $('#completed-list').append(result[0].get('task') + '<br>');
			complete(result[0]);

		},
		error: function(result, error) {
			console.log(error.description)
		}
	})	
})

$('.delete').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	query.equalTo("objectId", id);
	query.find({
		success: function(result) {
			result[0].destroy(); 
			$('input:checked').parent().remove();
		},
		error: function(result, error) {
			console.log(error.description)
		}
	})	

})

$('.edit').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	var inputVal = $('#form-input').val();
	query.equalTo("objectId", id);
	query.find({
		success: function(result) {

			result[0].set("task",inputVal); 
			result[0].save();
		},
		error: function(result, error) {
			console.log(error.description)
		}
	})	
})

