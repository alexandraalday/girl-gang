const app = angular.module('girlGang', []);

    app.controller('UserController', ['$http', function($http){
      const controller = this;

      this.getUsers = function(){
        $http({
          method: 'GET',
          url: '/users'
        }).then(
          function(response){
            controller.users = response.data;
          },
          function(error){

          }
        );
      }

      this.createUser = function(){
        $http({
          method: 'POST',
          url: '/users',
          data: {
            name: this.name,
            image: this.image,
            bio: this.bio,
            author: this.author
          }
        }).then(
          function(response){
            controller.getUsers();
          },
          function(error){
          }
        );
      }

      this.updateUser = function(id) {
      	console.log('update function called')
        $http({
          method: 'PUT',
          url: '/users/' + id
        }).then(
          function(response){
          	console.log(response)
            controller.getUsers();
          },
          function(error){
          	console.log(error)
          });
      }


      this.deleteUser = function(id){
        $http({
          method: 'DELETE',
          url: '/users/' + id
        }).then(
          function(response){
            controller.getUsers();
          },
          function(error){
          }
        );
      }

      this.getUsers();
}])
