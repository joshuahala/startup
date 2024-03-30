
# Bit Hero
My CS260 Startup Project
created by Josh Burgoyne

Bit Hero is an arcade style game that is rendered on a 20 X 20 grid. The user controls a Hero on the screen and guides him towards a reward placed randomly on the grid. He must avoid being hit by dangerous hazards that are also moving on the grid. The player has three lives and the longer he plays, the harder the game gets. The player starts out with one Hero, but can level up and steal Heroes from other players. 

<img src="game.png" width=50% height=50%>
<img src="heroes.png" width=50% height=50%>
<img src="challenge.png" width=50% height=50%>



## Key Features:

+ Point system that keeps track of all players and their scores, and Heroes. 
+ Interaction between players.
+ Players can steal Heroes from other players.
+ Try to collect all the heroes. 

## Technologies:

#### **HTML, CSS, JavaScript:** 
The game will be rendered using HTML and CSS. There will be multiple pages including: Login, the main game page, my Heroes, and a page to see other players. The game logic uses JavaScript.

#### **Login Authentication:** 
Users will create accounts where they will keep track of their Heroes and scores. 

#### **Web Servers and Data Bases:**
 All user data will be stored on web servers.

#### **Web Sockets:** 
Users will be able to see other players scores. They will receive notifications about the status of other Players. Users can steal Heroes from other players and will be notified when they have that option.

# HTML Deliverable
Below is a summary of the html that makes up the structure of my startup website.

### 5 pages including: Login, My Heroes, Play, Scores, and Challenge.
### Login Authentication
The index.html page is the login page where the user will create a new account or sign into an existing account. User information will be stored on server database.
### Data base data
On the Scores page, there is a placeholder element in the middle that displays the top scores of all players. The data base will also keep track of each player's scores, heroes, and other data.
### Websockets
On the play.html page, on the left side, there is a placeholder element that will display real time info about other players who are currently playing.
On the scores.html page, on the left side, this placeholder element will notify the player when another player's character is vulnerable and can be challenged.
### Third Party Service Calls
On the Play.html page, an inspirational quote will be displayed after everytime the player loses a round. This quote will be fetched from a third party api.
### Other
I added images, buttons, links, headers, footers, and other elements necessary for the website.

# CSS Deliverable
index.html is the login page. Press the login button to get to the other pages.
+ done - Prerequisite: Simon CSS deployed to your production environment
+  done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+  done - Prerequisite: Notes in your startup Git repository README.md file
+  done - 30% Header, footer, and main content body. Used flex to layout sections.
+  done - 20% Navigation elements. Links highlight on hover.
+  done - 10% Responsive to window resizing. Looks great on iPad, desktop, and iPhone.
+  done - 20% Application elements. Buttons are styled and have hover animations. 
+  done - 10% Application text content. I used the Pixelify Sans font for headers and buttons. Roboto light for regular text.
+  done - 10% Application images. The images have borders and backgrouond colors. They also animate on hover. They also have dropshadows.

# Javascript Deliverable
### New Stuff
The index login page lets you create a new username and password which are stored in localstorage for now.
Upon creating an account you are given a character. You can use that character to play the game. You can name the character.
Characters are stored in local storage.
Scores are stored in local storage for now and are read into the scores table.
On the scores page, you will recieve a notification that you can challenge another user's character. If you win the challenge you get a new character.
### WebSocket
The play.html page has a placeholder that represents notifications based on other players' interactions with the game. 
The scores.html page simulates a challenge notification that tells you when another player's character is susceptible to attack. This is based on if the player recently lost a game.
### Database
Right now i use local storage to simulate database. I store player characters, scores, selected characters, usernames, passwords, etc. These will eventually become data in the database.
### 3rd Party API
after you lose a round, it will display an inspirational quote. This simulates the use of a call to a 3rd party application call.

+ done - Prerequisite: Simon JavaScript deployed to your production environment
+ done -  Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+ Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. 
+ done -  Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ done - Significant use of JavaScript to create a viable working application
+ done - 20% JavaScript support for future login.
+ done - 20% JavaScript support for future database data.
+ done - 20% JavaScript support for future WebSocket.
+ done - 40% JavaScript support for your application's interaction logic.

# Startup Service Deliverable
### Notes
The application makes posts and get requests on each page for things such as User Login data, user heroes data, and score data.
The play.json calls a third party quote service and displays the quote evertyime a user loses a game.
You can look through the js files for each of the pages and search for get or post functions that interact with the backend(index.js). 

+ done - Prerequisite: Simon Service deployed to your production environment
+ done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+ done - Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. 
+ done - Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ done - Backend web service support and interaction
+ done - 40% - Create an HTTP service using Node.js and Express
+ done - 10% - Frontend served up using Express static middleware
+ done - 10% - Your frontend calls third party service endpoints. 
+ done - 20% - Your backend provides service endpoints.
+ done - 20% - Your frontend calls your service endpoints.

# Startup Login Deliverable
### Notes
In this deliverable I added support for storing and retrieving data using Mongodb. The login page encrypts passwords and stores user credentials in the DataBase. It also checks to see if a username exists for authorization. In the heroes page, we store user info regarding their hero collection. The play page accesses info on the user's hero collection and also stores score info. The scores page retrieves all the scores from players. Each of the pages also checks to see if the user has a username stored in local storage. If there is no username stored, then they are redirected to the login page.

+ done Prerequisite: Simon Login deployed to your production environment with your dbConfig.json credentials
+ done Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+ done Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the voter app as an example.
+ done Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ done Application authentication and authorization
+ done 20% - Supports new user registration
+ done 20% - Supports existing user authentication
+ done 0% - Stores application data in MongoDB
+ done 20% - Stores and retrieves credentials in MongoDB
+ done 20% - Restricts application functionality based upon authentication

# Websocket Deliverable
### Notes
My application now uses websocket to handle communication between players. The Play.html page shows notifications of when other players are starting a game and what they score when they end a game. It also notifies you when another player has lost three times in a row and their character is vulnerable to attack. It shows a pop-up message that gives you the option to try to steal their character. 

+ done Prerequisite: Simon WebSocket deployed to your production environment
+ done Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+ done Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the voter app as an example.
+ done Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ done WebSocket support for data pushed from the backend
+ done 20% - Backend listens for WebSocket connection
+ done 20% - Frontend makes WebSocket connection
+ done 30% - Data sent over WebSocket connection
+ done 30% - WebSocket data displayed in the application interface



