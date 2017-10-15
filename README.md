## Girl Gang
http://girl-gang.herokuapp.com/

Girlgang is a shared space to celebrate and empower all things femme. Created in a one week sprint. 

Created in a one week sprint, Girl Gang is a single-page, four model CRUD app built with MVC file organization. User authentication is handled through Bcrypt. 

<img width="1440" src="https://user-images.githubusercontent.com/17508245/31582223-8d050f8c-b132-11e7-90f0-680e5c2136c4.png">

## TEAM
Alexandra Alday<br>
Brooke Baxa<br>
Jen Schumann

**Technologies Used:** 
* HTML
* CSS 
* JavaScript
* jQuery
* Node.js
* Express.js
* AngularJS
* MongoDB

**Packages Used:** 
* Bcrypt
* Express Session
* Mongoose
* angular-sanitize

**API Used:** 
* Self

**Design**
* Bootstrap

<img width="1438" src="https://user-images.githubusercontent.com/17508245/31582222-8cf140a6-b132-11e7-9fd4-4362eb19705a.png">

One challenge we faced occured when building the music section. It was really important to us that the user not have to do any of the heavy lifting to render the spotify play button iframe for the song they wanted to post. We also wanted the user to be able to listen to Spotify songs added by other users directly from the site and not have to open another window or the Spotify app. In order to do this we had to take the url input from the user, split the track id from the url, and then send it back to the client side as an angular binding into the iframe html fragment. However, Angular was not trusting the binding and we were receiving an unsafe value error. After some research on Stack Overflow and the AngularJS documentation, we were able to successfully set up a delegate for strict contextual escaping in order to whitelist the Spotify domain. 

<img width="1436" src="https://user-images.githubusercontent.com/17508245/31582221-8ccd4f66-b132-11e7-947c-b73e24d265e5.png">

### User Stories: 
The user profile of this application is twofold:

First, general users of this application are people who wish to play without saving their scores.

* Users land on the home page and given basic information about the application along with a login/register form

Another user of this application is the registered user who logs in to maintain their own profile and scores.

* Registered users can log in to manage their profile content
* Registered users can add posts and edit/delete their authored posts
* Registered users can like and leave a comment on any content
* Registered users can delete their account

<img width="1433" src="https://user-images.githubusercontent.com/17508245/31582220-8cb9cc3e-b132-11e7-9df5-cd80006f4db7.png">

### Features In Progress:
 - [ ]  Add the ability for each section to be filtered by popularity, created date, or keyword
 - [ ]  Fix bug that allows users to like an item more than once
 - [ ]  Give users the option to tag their posts by category and add as filter on landing page
 - [ ]  Users have a profile ('home') page that displays only the items they have created,liked, and/or commented on
 - [ ]  Modals are displayed in middle of user's view position
 - [ ]  Comments include the name of the author, date posted, and can be filtered by date posted (i.e., 'most recent')
 - [ ]  Create forgot password functionality that allows users passwords to be emailed to their email address on file





