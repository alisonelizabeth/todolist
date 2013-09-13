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
	var li = $('<div class="checkbox">' + '<input id="check-it" value='+test+' type="checkbox">' + '<li>' + task.get('task') + '</li>' + '</div>')
	$('#task-list').append(li)
}



$('.completed').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	query.equalTo("objectId", id);
	query.find({
		success: function(results) {
			$('#completed-list').append(results[0].get('task'));
			results[0].set("isComplete", true); 
			results[0].save();
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
		},
		error: function(results, error) {
			console.log(error.description)
		}
	})	

})

$('.edit').click(function(){
	var id = $("input:checked").val()
	var query = new Parse.Query(TaskClass);
	var inputVal = $('#form-input').val()
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


// $('.completed').click(function(){
// 	var self = this;
// 	console.log(self)
// 	var boxes = $('input:checked').val()
// 	$('#completed-list').append(boxes)
// })





// $('.completed').click(function(){
// 	// var boxes = $("input:checked") 
// 	var self = this;
// 	query = new Parse.Query(TaskClass);
// 		query.get(self.one('input').get('id'), {
// 			success: function(item) {
// 				item.set('isComplete', true)
// 				item.save();
// 				item.remove()
// 			}
// 		}
	
// 	$('#completed-list').append(boxes)
// })


// query = new Parse.Query(ListItem);
// 		query.get(self.one('input').get('id'), {
// 			success: function(item) {
// 			item.set('isComplete', true);
// 			item.save();
// 			self.remove();



// $( "#log" ).html( $( "input:checked" ).val() + " is checked!" );

// $('.delete').click(function(){
// 	if 

// })




