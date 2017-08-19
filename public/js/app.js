const app = angular.module('girlGang', []);

app.controller('UserController', ['$http', function($http){
  //an empty array so we can push the gifs we make into it to display on the page
  this.allGifs = [];
  //assigning this to a variable so we can use it in our functions
  const controller = this;
  //empty object so we can later use this variable to select a certain gif
  this.currentGif = {};
  //empty object we can later use this variable to edit a certain gif
  this.editGif = {};
  //ajax call to add a new User
  this.addUser = function(){
    $http({
      method: 'POST',
      url: '/users',
      data: {
        name: this.name,
        image: this.image,
        bio: this.bio
      }
    }).then(function(response){
      console.log(response.data);
      //controller.getUsers();
      //these controllers will reset the new user form
      controller.name = '',
      controller.image = '',
      controller.bio = ''
    }, function(err){
      console.log(error);
    })
  }
  //ajax call to show all  the users
  this.getUsers = function(){
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response){
      controller.allGifs = response.data;
    }, function(err){
      console.log(err);
      console.log('broke in show user call');
    })
  }

  //call the function so all the users render automagically
  this.getUsers()
}])





//controller for gifs
app.controller('GifController', ['$http', function($http){
    //an empty array so we can push the gifs we make into it to display on the page
    this.allGifs = [];
    //assigning this to a variable so we can use it in our functions
    const controller = this;
    //empty object so we can later use this variable to select a certain gif
    this.currentGif = {};
    //empty object we can later use this variable to edit a certain gif
    this.editGif = {};
    //ajax function to add a gif
    this.addGif = function(){
      $http({
        method: 'POST',
        url: '/gifs',
        data: {
          name: this.name,
          url: this.url,
          tag: this.tag
        }
      }).then(function(response){
        //this will update the gifs list with the new gif instantly
        controller.getGifs();
        //this resets the add new gif form text boxes
        controller.name = '',
        controller.url = '',
        controller.tag = ''
      }, function(err){
        console.log(err);
      })
    }
    //ajax call to display all the gifs to the page
    this.getGifs = function(){
      $http({
        method: 'GET',
        url: '/gifs'
      }).then(function(response){
        controller.allGifs = response.data;
      }, function(err) {
        console.log('WTF HAPPENED');
        console.log(err);
      })
    }
    //ajax call to identify a certain gif by id
    this.setCurrentGif = function(id){
      $http({
        method: 'GET',
        url: '/gifs/' + id
      }).then(function(response){
        //this sets the empty currentGif object to our selected gif object
        controller.currentGif = response.data[0];
        //controller.displayGif = true;
        //sets the url, not sure why this is the only one we did this with.
        controller.currentGif.url = response.data[0].url;
        console.log(controller.currentGif);
      }, function(err){
        console.log(err);
      })
    }
    //ajax call to update gifs
    this.updateGif = function(id){
      $http({
        method: 'PUT',
        url: '/gifs/' + id,
        data: this.editedGif
      }).then(function(response){
        //to update the gif in our gif list
        controller.getGifs();
        //controller.editDisplay = false;
        //controller.displayGif = false;
        //to unselect the current gif object
        controller.currentGif = {}
      }, function(err){
        console.log(err);
        console.log('error in the edit call');
      })
    }
    //ajax call to delete gifs
    this.deleteGif = function(gif){
      $http({
        method: 'DELETE',
        url: '/gifs/' + gif,
      }).then(function(response){
        controller.getGifs();
        //controller.displayGif = false;
      }, function(err) {
        console.log('error in the delete call');
        console.log(err);
      })
    }


    //call the function so all the gifs render automagically
    this.getGifs()
}])
