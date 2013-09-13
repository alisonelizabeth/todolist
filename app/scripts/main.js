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

$('.completed').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	query.equalTo("objectId", id);
	query.find({
		success: function(results) {
			$('#completed-list').append(results[0].get('task') + '<br>');
			results[0].set("isComplete", true); 
			results[0].save();
			$('input:checked').parent().remove();
		},
		error: function(results, error) {
			console.log(error.description)
		}
	})	
})

$('.delete').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	query.equalTo("objectId", id);
	query.find({
		success: function(results) {
			results[0].destroy(); 
			$('input:checked').parent().remove();
		},
		error: function(results, error) {
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
		success: function(results) {

			results[0].set("task",inputVal); 
			results[0].save();
		},
		error: function(results, error) {
			console.log(error.description)
		}
	})	
})

