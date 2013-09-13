/*global describe, it */
'use strict';
(function () {
  describe('The Note Form', function(){
    this.timeout(15000);
    // if something doesn't happen in 15 seconds, cut it off 
    // applies to everything

    it('should save a new note and that note should be returned from Parse', function(done){
      var result;

      // fill out the form
      var form = $('.form')
      // make a random title with which we can query
      var randomTitle = 'A Test Post #'+ Math.floor(Math.random()*10000000)
      form.find('#title').val(randomTitle)
      form.find('#content').val('This is a really great post! I loved writing it!')

      // submit it
      $('.save').click()

      setTimeout((function(){

        var query = new Parse.Query(NoteClass);
        query.equalTo("title", randomTitle);
        query.find({
          success: function(results) {
            result = results[0]
            console.log(results)
            expect(result.get('title')).to.equal(randomTitle)
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });

      }), 2000)
    }); // end it()


    // second test 
    it ('should populate the sidebar with a new note upon save', function(done){
      
      // fill out the form (store reference to it)
      var form = $('.form')
      // make a random title with which we can query, create a unique title each time
      // guarantees that you're always looking for the new thing you just created
      // use .find -- inside the form find the title, set the value to a random title
      var randomTitle = 'A Great Post #'+ Math.floor(Math.random()*10000000)
      form.find('#title').val(randomTitle)
      form.find('#content').val('This is a really great post! I loved writing it!')

      // submit it
      $('.save').click()

      // setTimeout is built into Javascript
      setTimeout(function(){
        var lastSidebarItem = $('.sidebar .notes li').last().text()
        expect(lastSidebarItem).to.equal(randomTitle)
        done()
      }, 3000)

      // wait three seconds and then check the sidebar 

    }) 
    // end it 

  })
})();


