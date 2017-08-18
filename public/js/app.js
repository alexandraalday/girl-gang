const app = angular.module('girlGang', []);

    app.controller('UserController', ['$http', function($http){
      const controller = this;
      this.users = [];

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

      this.updateUser = function(user) {
        $http({
          method: 'PUT',
          url: '/users/' + user._id,
          data: editedObject

        }).then(
          function(response){
            controller.getUsers();
          },
          function(error){

          }
        );
      }

      this.deleteUser = function(user){
        $http({
          method: 'DELETE',
          url: '/users/' + user._id
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
