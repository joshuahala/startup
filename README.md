
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

+ done - Prerequisite: Simon JavaScript deployed to your production environment
+ done -  Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
+ Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review + the voter app as an example.
+ done -  Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
+ done - Significant use of JavaScript to create a viable working application
+ done - 20% JavaScript support for future login.
+ done - 20% JavaScript support for future database data.
+ done - 20% JavaScript support for future WebSocket.
+ done - 40% JavaScript support for your application's interaction logic.

