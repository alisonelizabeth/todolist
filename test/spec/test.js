/*global describe, it */
'use strict';
(function () {
  describe('The add button', function(){
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
          error: function(result, error) {
            done(error.description);
          }
        });
 
      }, 2000)
    }); // end it()
  });
})();