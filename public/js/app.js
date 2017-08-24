//Whoever wrote it probably didn't think anyone would ever see it?
const app = angular.module('girlGang', []);
  angular.module('app', ['ngSanitize']);


///////////////////////
// USERS CONTROLLER
///////////////////////


app.controller('UserController', ['$http', '$scope', function($http, $scope){
  const controller = this;
  this.currentUser = {};
  this.editUser = {};
  this.editDisplay = false;
  this.modal = false;
  this.loggedIn = false;
  this.loginForm = true;
  this.registerForm = false;
  this.message = '';
  this.profileUpdate = {};
  this.toggleEdit = function(){
    this.editDisplay = !this.editDisplay;
    this.reset = function() {
      this.addForm.reset();
    }
  }
  this.toggleModal = function(){
    this.modal = !this.modal;
  }
  this.toggleForms = function(){
    this.registerForm = !this.registerForm
    this.loginForm = !this.loginForm
  }
  this.register = function(email, password){
    $http({
      method: 'POST',
      url: '/users/register',
      data: {
        email: this.registeredEmail,
        password: this.registeredPassword,
        image: this.registeredImage,
        bio: this.registeredBio
      }
    }).then(function(response){
      controller.loggedIn = response.data;
      controller.registerForm = false;
      console.log('You go Glen Coco!!');
    }, function(err){
      console.log(err);
    })
  }
  this.goToRegister = function(){
    this.registerForm = true;
    this.loginForm = false;
  }
  this.goToLogin = function(){
    this.loginForm = true;
    this.registerForm = false;
  }
  //ajax call to login
  this.login = function(email, password){
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        email: this.loginEmail,
        password: this.loginPassword
      }
    }).then(function(response){
      if(response.data === true){
      controller.loginForm = false;
      controller.loggedIn = response.data;
      controller.checkLogin()


    } else {
      controller.message = response.data
    }
    }, function(err){
      console.log(err);
    })
  }
  //ajax call to logout a session
  this.logOut = function(){
    $http({
      method: 'GET',
      url: '/users/logout'
    }).then(function(response){
      controller.loggedIn = response.data
      controller.loginForm = true;
    })
  }
  //ajax call to show all  the users
  this.getUsers = function(){
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response){
      controller.allUsers = response.data;
    }, function(err){
      console.log(err);
    })
  }
  this.checkLogin = function(){
    $http({
      method: 'GET',
      url: '/users/checkLogin'
    }).then(function(response){
      $scope.checkPlz = response.data; //this is our current users

    }, function(err){
      console.log(err);
    })
  }
  //ajax call to identify a certain user by id
  this.setCurrentUser = function(id){
    $http({
      method: 'GET',
      url: '/users/' + id
    }).then(function(response){
      controller.currentUser = response.data[0]
      $scope.input = '';
    }, function(err){
      console.log(err);
    })
  }
  //ajax call to update the user
  this.updateUser = function(id){
    $http({
      method: 'PUT',
      // + id from line 153
      url: '/users/' + id,
      data: this.editedUser
    }).then(function(response){
      controller.getUsers();
      controller.currentUser = {};
      controller.user = {};
      // adding this to see if I can grab user modal input
      controller.editedUser = {};
      // controller.editedUser._id = {};
    }, function(err){
      console.log(err);
      // console.log('error in update route');
    })
  }
  //ajax call to delete the user
  this.deleteUser = function(user){
    $http({
      method: 'DELETE',
      url: '/users/' + user,
    }).then(function(response){
      controller.getUsers()
      controller.modal = false;
      //delete user needs LOGOUT FUNCTION?  SEEMS LOGICAL
      controller.logOut()
    }, function(err){
      console.log('err in delete route');
      console.log(err);
    })
  }
  this.getUsers()
}])


///////////////////////
// GIFS CONTROLLER
///////////////////////

app.controller('GifController', ['$http', '$scope', function($http, $scope){
    const controller = this;
    this.allGifs = [];
    this.newDisplay = false;
    this.editDisplay = false;
    this.modal = false;
    this.regina = "I wanna lose five pounds";
    this.currentGif = {};
    this.editGif = {};
    this.addGif = function(){
      $http({
        method: 'POST',
        url: '/gifs',
        data: {
          url: this.url,
          tag: this.tag,
          author: this.author
        }
      }).then(function(response){
        controller.newDisplay = false;
        controller.getGifs();
        controller.url = '',
        controller.tag = ''
      }, function(err){
        console.log(err);
      })
    }
    this.toggleNew = function(){
      this.newDisplay = !this.newDisplay;
      this.reset = function() {
        this.addForm.reset();
      }
    }
    this.toggleEdit = function(){
      this.editDisplay = !this.editDisplay;
      //when edit button is pushed form will dropdown and be empty
    }
    this.toggleModal = function(){
      this.modal = !this.modal;
      //when edit button is pushed form will dropdown and be empty
    }
    this.toggleComment = function(){
      this.commentDisplay = !this.commentDisplay;
    };
    this.likeGif = function(id){
      $http({
        method: 'PUT',
        url: '/gifs/like/' + id
      }).then(function(response){
        controller.getGifs();
      }, function(err){
          console.log(err);
      })
    }
    this.addComment = function(id){
      $http({
        method: 'PUT',
        url: '/gifs/comment/' + id,
        data: this.commentedGif
      }).then(function(response){
          controller.commentDisplay = false;
          controller.commentedMusic = {};
          controller.getGifs();
      }, function(err){
          console.log(err);
      })
    }
    this.upComment = function(id){
      $http({
        method: 'PUT',
        url: '/gifs/comment/up/' + id,
      }).then(function(response){
          console.log(response)
          controller.commentDisplay = false;
          controller.getGifs();
      }, function(err){
          console.log(err);
      })
    }
    this.getGifs = function(){
      $http({
        method: 'GET',
        url: '/gifs'
      }).then(function(response){
        controller.allGifs = response.data;
      }, function(err) {
        console.log(err);
      })
    }
    this.setCurrentGif = function(id){
      $http({
        method: 'GET',
        url: '/gifs/' + id
      }).then(function(response){
        controller.currentGif = response.data[0];
        controller.currentGif.url = response.data[0].url;
        $scope.input = '';
        if($scope.checkPlz.email !== controller.currentGif.author) {
           document.getElementById("gifedit").style.visibility = "hidden";
         }
      }, function(err){
        console.log(err);
      })
    }
    this.updateGif = function(id){
      $http({
        method: 'PUT',
        url: '/gifs/' + id,
        data: this.editedGif
      }).then(function(response){
        controller.getGifs();
        controller.currentGif = {};
        controller.gif = {};
        controller.editedGif = {};
      }, function(err){
        console.log(err);
      })
    }
    this.deleteGif = function(gif){
      $http({
        method: 'DELETE',
        url: '/gifs/' + gif,
      }).then(function(response){
        controller.getGifs();
        controller.modal = false;
      }, function(err) {
        console.log(err);
            }
        );
      }
      this.getGifs();
}])

///////////////////////
// MUSIC CONTROLLER
///////////////////////

//I'm sorry that people are so jealous of me.
app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://open.spotify.com/embed/**'
    ]);
}]);

//Four for you Glen Coco, 
app.controller('MusicController', ['$http', '$scope', function($http, $scope){
    const controller = this;
    this.allMusic = [];
    this.currentMusic = {};
    this.editMusic = {};
    this.editDisplay = false;
    this.newDisplay = false;
    this.commentDisplay = false;
    this.modal = false;

    //You GO Glen Coco! 
    this.addMusic = function(){
      const spotifyId = this.link.split('.com/')[1]
      $http({
        method: 'POST',
        url: '/music',
        data: {
          link: this.link.split('.com/')[1],
          embed: 'https://open.spotify.com/embed/' + spotifyId,
          likes: this.likes,
          tag: this.tag,
          author: this.author,
          commentCount: this.commentCount,
          comments: this.comments
        }
      }).then(function(response){
        controller.getMusic();
        // reset form
        controller.newDisplay = false;
        controller.link = '',
        controller.tag = '',
        controller.author = ''
      }, function(err){
        console.log(err);
      })
    }
    
    //....And none for Gretchen Weiners.Bye
    this.likeMusic = function(id){
        $http({
          method: 'PUT',
          url: '/music/like/' + id
        }).then(function(response){
          controller.getMusic();
        }, function(err){
            console.log(err);
        })
    }

    //Whatever. I'm getting cheese fries.
    this.addComment = function(id){
      $http({
        method: 'PUT',
        url: '/music/comment/' + id,
        data: this.commentedMusic
      }).then(function(response){
          controller.commentDisplay = false;
          controller.commentedMusic = {};
          controller.getMusic();
      }, function(err){
          console.log(err);
      })
    }

    //I'm only eating foods with less than 30% calories of fat.
    this.upComment = function(id){
      $http({
        method: 'PUT',
        url: '/music/comment/up/' + id,
      }).then(function(response){
          controller.commentDisplay = false;
          controller.getMusic();
      }, function(err){
          console.log(err);
      })
    }

    //I mean, she's really failing me on purpose 
    this.getMusic = function(){
      $http({
        method: 'GET',
        url: '/music'
      }).then(function(response){
        controller.allMusic = response.data;
      }, function(err) {
        console.log(err);
      })
    }

    ///just because I didn't join that stupid Mathletes!
    this.setCurrentMusic = function(id){ 
      $http({
        method: 'GET',
        url: '/music/' + id
      }).then(function(response){
        controller.currentMusic = response.data[0];
        //may take this out:
        $scope.input = '';
          if($scope.checkPlz.email !== controller.currentMusic.author) {
           document.getElementById("musicedit").style.visibility = "hidden";
         }
      }, function(err){
        console.log(err);
      })
    }

    //You wanna do something fun?
    this.updateMusic = function(id){
      $http({
        method: 'PUT',
        url: '/music/' + id,
        data: this.editedMusic
      }).then(function(response){
        controller.getMusic();
        controller.currentMusic = {};
        controller.music = {};
        controller.editedMusic = {};
        controller.editDisplay = false;
      }, function(err){
        console.log(err);
      })
    }

    // You wanna go to Taco Bell?
    this.deleteMusic = function(music){
      $http({
        method: 'DELETE',
        url: '/music/' + music,
      }).then(function(response){
        controller.getMusic();
        controller.modal = false;
      }, function(err) {
        console.log(err);
      })
    }

    //I can't go to Taco Bell!
    this.toggleNew = function(){
      this.newDisplay = !this.newDisplay;
      this.reset = function() {
        this.addForm.reset();
      }
    }

    //I'm on an all-carb diet!
    this.toggleEdit = function(){
    	this.editDisplay = !this.editDisplay;
    }

    //God, Karen, you are so stupid!
    this.toggleModal = function(){
      this.modal = !this.modal;
    }
    
    //YOU CAN'T SIT WITH US!
    this.toggleComment = function(){
      this.commentDisplay = !this.commentDisplay;
    };

    this.getMusic()
}])


///////////////////////
// LIT CONTROLLER
///////////////////////

app.controller('LitController', ['$http', '$scope', function($http, $scope){
    const controller = this;
    this.allLits = [];
    this.currentLit = {};
    this.editLit = {};
    this.newDisplay = false;
    this.editDisplay = false;
    this.modal = false;

    this.addLit = function(){
      $http({
        method: 'POST',
        url: '/lits',
        data: {
          postTitle: this.postTitle,
          author: this.author,
          url: this.url,
          description: this.description,
          tag: this.tag
        }
      }).then(function(response){
        //this will update the lit list with the new lit instantly
        // console.log(response.data);
        controller.getLits();
        // reset form
        controller.newDisplay = false;
        controller.postTitle = '',
        controller.author = '',
        controller.url = '',
        controller.description = '',
        controller.tag = ''
      }, function(err){
        console.log(err);
      })
    }
    this.toggleNew = function(){
      this.newDisplay = !this.newDisplay;
    }
    this.toggleEdit = function(){
      this.editDisplay = !this.editDisplay;
    }
    this.toggleModal = function(){
      this.modal = !this.modal;
      console.log('trying to get one lit post accessed through this');
    }
    this.toggleComment = function(){
      this.commentDisplay = !this.commentDisplay;
    };

    this.reset = function() {
      this.addForm.reset();
    }

    this.likeLit = function(id){
      $http({
        method: 'PUT',
        url: '/lits/like/' + id
      }).then(function(response){
          console.log(response)
        controller.getLits();
      }, function(err){
          console.log(err);
      })
    }

    this.addComment = function(id){
      $http({
        method: 'PUT',
        url: '/lits/comment/' + id,
        data: this.commentedLit
      }).then(function(response){
          console.log(response)
          controller.commentDisplay = false;
          controller.commentedLit = {};
          controller.getLits();
      }, function(err){
          console.log(err);
      })
    }

     this.upComment = function(id){
      $http({
        method: 'PUT',
        url: '/lits/comment/up/' + id,
      }).then(function(response){
          console.log(response)
          controller.commentDisplay = false;
          controller.getLits();
      }, function(err){
          console.log(err);
      })
    }

  //ajax call to display all the lit posts to the page
    this.getLits = function(){
      $http({
        method: 'GET',
        url: '/lits'
      }).then(function(response){
        controller.allLits = response.data;
      }, function(err) {
        console.log('we are women who run with the wolves');
        console.log(err);
      })
    }

    this.setCurrentLit = function(id){ //so we can edit it in the next function
      $http({
        method: 'GET',
        url: '/lits/' + id
      }).then(function(response){
        controller.currentLit = response.data[0];
        // controller.currentLit.url = response.data[0].url;
        console.log(controller.currentLit);
        // controller.modal = true;
        // controller.currentLit.url = response.data[0].url;
        console.log($scope.checkPlz.email)
        console.log(controller.currentLit.author)
          if($scope.checkPlz.email !== controller.currentLit.author) {
           document.getElementById("litedit").style.visibility = "hidden";
         }

      }, function(err){
        console.log(err);
        console.log('is one lit post showing yet');
      })
    }
    //ajax call to update lit
    this.updateLit = function(id){
      $http({
        method: 'PUT',
        url: '/lits/' + id,
        data: this.editedLit
      }).then(function(response){
        controller.getLits();
        controller.editDisplay = false;
        controller.editedLit = {};
      }, function(err){
        console.log(err);
        console.log('is there still an error in the edit call');
      })
    }

    this.deleteLit = function(lit){
      $http({
        method: 'DELETE',
        url: '/lits/' + lit,
      }).then(function(response){
        controller.getLits();
        controller.modal = false;
      }, function(err) {
        console.log('error in the delete call');
        console.log(err);
      });
  }


    this.getLits();
}])
