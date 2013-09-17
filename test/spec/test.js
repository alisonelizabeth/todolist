/*global describe, it */
'use strict';
(function () {
  describe('The task form', function(){
    this.timeout(15000);
 
    it('should save a new task and that task should be returned from Parse', function(done){
      var result;
      var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
      $('#form-input').val(randomTask)
      $('.add').click();
 
      setTimeout(function(){
 
        var query = new Parse.Query(TaskClass);
        query.equalTo('task', randomTask);
        query.find({
          success: function(results) {
            result = results[0];
            expect(result.get('task')).to.equal(randomTask);
            done();
          },
          error: function(results, error) {
            done(error.description);
          }
        });
 
      }, 2000)
    }); // end it()

    it ('should add completed task to div with the class "completed"', function(done) {
      var result;
      var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
      $('#form-input').val(randomTask)
      $('.add').click();
      $('input#check-it').click();
      $('.completed').click();

      setTimeout(function(){
        var query = new Parse.Query(TaskClass);
        query.equalTo('task', randomTask);
        query.find({
          success: function(results) {
            result = results [0];
            var li = $('<li>'+ '<span class="glyphicon glyphicon-thumbs-up">' + '</span>' + result[0].get('task') + '</li>');
            if (result.get('isComplete') === true) {
              expect(randomTask).to.equal(li);
              done();
            }
            },
          error: function(results, error) {
            done(error.description);
          }
        })
      })
    }, 2000)
  });

  // it('should delete a task and that task should be deleted from Parse', function(done) {
  //   var result;
  //   var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
  //   $('#form-input').val(randomTask)
  //   $('.add').click();
  //   $('input:checked');
  //   $('.delete').click();

  //   setTimeout(function() {
  //     var query = new Parse.Query(TaskClass);
  //     query.equalTo('task', randomTask);
  //     query.find({
  //       success: function(results){
  //         var deleteWorked = true 
  //         result = results[0];
  //         if (result.get('task') ==== false) {
  //           expect(deleteWorked).to.equal(true);
  //           done();
  //         }   
  //       },
  //       error: function (results, error) {
  //         done(error.description);
  //       } 
  //     });
  //   }, 2000)
  // })
// end it 

})();


  
