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
  
    it ('should add a new task to div with class "task" when the add button is clicked', function(done) {
      var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
      $('#form-input').val(randomTask)
      $('.add').click();

      setTimeout(function(){
        expect($('.task ul li').last().text()).to.equal(randomTask)
        done();
      },2000)
    }); // end it()

    it ('should add the completed task to div with class "complete" when the complete button is clicked', function(done){
      var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
      $('#form-input').val(randomTask)
      
      setTimeout(function(){
      $('.add').click();

      setTimeout(function(){
      $('input#check-it').last().attr('checked','checked');
      $('.completed').click();
      
      setTimeout(function(){
      expect($('#completed-list li').last().text()).to.equal(randomTask)
      done();
      },3500);
        },3000);
          },2000);
    }); // end it()
  
    // it ('should change the "isComplete" property to true in Parse when the complete button is cicked', function(done){
    //   var result;
    //   var randomTask = 'Task #'+ Math.floor(Math.random()*10000000)
    //   $('#form-input').val(randomTask)
    //   setTimeout(function(){
    //   $('.add').click();

    //   setTimeout(function(){
    //   $('input#check-it').last().attr('checked','checked');
    //   $('.completed').click();
      
    //   setTimeout(function(){

    //   var query = new Parse.Query(TaskClass);
    //   query.equalTo('isComplete', randomTask);
    //   query.find({
    //     success: function(results) {
    //       result = results[0];
    //       expect(result.get('isComplete').to.equal(true));
    //       done();
    //     },
    //     error: function (results, error) {
    //       done(error.description)
    //     }
    //   }); 
    //   },3500);
    //     },3000);
    //       },2000);
    // });


  }); // end of describe ()
})();



