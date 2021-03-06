# __Squad Builder__
 
 Click Link to go to site:
  https://squad-builder-425.herokuapp.com/

 ### Installation Instructions:
 * Fork and Clone this repository
 * npm i to install dependencies in local directory where you have cloned
 * Create a .env file to store your ENC_KEY for password (add whatever string you'd like)
 * Run sequelize db:migrate
 * Run nodemon to run the application(use localhost:3000 in web browser)
 * This application uses ballislife API (API key not required)
 
 ### What's happenin
 ---
 This app will use the ballislife API (https://www.balldontlie.io/#introduction) to give user the ability to search through all NBA players in order to find team and position. On the player profile page, user will have the ability to add player to their team in the format of an NBA fantasy league. Once user teams have been created, there will be a comment section below each team where other users can make comments like in the blog lab that we had. Users will be able to delete players from their teams and add new ones as they please.
 
 ### User Stories
 ---
 * As a user, I want to search NBA players by name and see player profile pages when clicked on
 * As a user, I want to have the ability to add and delete players from my team
 * As a user, I want to be able to view other user's teams and comment on those teams

 ### Approach
 ---
 Began by getting all of my RESTful routes sorted out, tackling one model at a time. Then went on to some styling but still needs some work in that department. 
 
 ### Tech Used
 ---
 Used:
 * npm
 * axios
 * bcrypt
 * cryptjs
 * express
 * ejs
 * express-ejs-layouts
 * method override
 * css
 * html
 * bootstrap
 * dotenv

 ### Reflection
 ---
 Was feeling imposter syndrome quite a lot at the beginning of this project but towards the end of last week I started to gain a better understanding of how to make my CRUD routes function correctly. Still not great at styling so will need to put more effort into learning that.


 ![wireframe](./img/login-wireframe.jpg)
 ![wireframe](./img/signUp-wireframe.jpg)
 ![wireframe](./img/userTeam-wireframe.jpg)
 ![wireframe](./img/otherUserTeamList-wireframe.jpg)
 ![wireframe](./img/otherUserTeamPage-wireframe.jpg)
 ![wireframe](./img/playerSearch-wireframe.jpg)
 ![wireframe](./img/playerProfile-wireframe.jpg)

 ![erd](./img/ERD.jpg)
 
 ### RESTful Routing Chart
 ---
 | **VERB** | **URL Pattern** | **Action (CRUD)** | **Description** |
 | -------- | --------------- | ----------------- | --------------- |
 | GET | */users/login* | Show (Read) | renders login page |
 | POST | */users/login* | Create (Create) | authenticates user credentials against database |
 | GET | */users/new* | Show (Read) | renders sign up page |
 | POST | */users/* | Create (Create) | creates new user and redirects to yourSquad page |
 | GET | */users/logout* | Show (Read) | clears the cookie to log user out |
 | GET | */users/yourSquad* | Show (Read) | renders yourSquad page |
 | PUT | */users/yourSquad* | Update (Update) | update your squad name | 
 | GET | */users/:id* | Show (Read) | renders otherTeam page |
 | GET | */users/:id/comment/new* | New (Read) | shows a form to make a new comment |
 | POST | */users/:id/comment* | Create (Create) | creates a comment with the POST payload(form) data |
 | GET | */players* | Create(Create) | renders a form that lets user search ballIsLife API |
 | GET | */players/search* | Show (Read | takes a search from the user and renders the results for them to see |
 | POST | */players* | Create(Create) | creates new player on your team (like favorite) |
 | DELETE | */players/:id* | Destroy (Delete) | deletes the player with the specified id from your team (i.e. /players/1) | 
 | GET | */players/:id* | Show (Read) | shows a specific player profile page (has a form that POSTS to /players, creates new player in db) |

 ### MVP
 ---
 1. Create sign up, login and logout pages
 2. Create form to search for NBA players
 3. Render individual player profiles with stats and picture, in addition to 'Add to Team' (favorite) button
 4. Render user's team page (user profile page) with:
    * delete button for players
    * comment section

 ### Stretch Goals
 ---
 1. Ability to search by team
 2. Add more than five starting players to team (bench players)
 3. Add player career stats to player profile pages
 4. Some real nice CSS
 5. Usernames? (gonna just start with email's and then individual users can just name their teams)
 6. Select option drop down on Player Search bar
 
 ### Sources
 ---
 * https://www.balldontlie.io/#players
 * https://phoenixnap.com/kb/mysql-drop-table#:~:text=To%20permanently%20remove%20a%20table,the%20table%20has%20been%20removed.
 * https://sequelize.org/docs/v6/core-concepts/model-instances/
 * https://hackmd.io/XWYZzYFLSIi3QVk05bdqtg?view
 * https://www.mysqltutorial.org/mysql-delete-statement.aspx
 * RESTful creatures assignment
 * Sequelize intro
 * Pokedex assignment
