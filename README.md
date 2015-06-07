
Mustaske
=======
FAQS
---
+ My homie slice got dif top questions, Wat up that?
Due to server badwidth _top questions_, although correctly accounted on the
backend, are not guaranteed to be the same on all displays. We call
_Near Real Time_ updates. Over a given period of time polls across all desktops.
+ Shit! whyz we gots puts wack room idz? The room ids are your rooms unique
identifier. These are required because more one user might want "Joes Meat Shack" and
well that's fine, who are we to judge. So name your room whatever you like and
it will show up in the sites topbar but to join the room you will need to use
the unique room id.

Desktop
---
#### Create Room
+ Once the user has accessed mustaske.com, they will be prompted with the front page which allows them to Make a room as well as Join a room.
+ Making a room consists of the user typing in their desired room name and clicking ‘Make’
+ The user must share the ‘Room id’, which is found in the top right corner of your fullscreen page under ‘Room Options’.
+ On a minimized screen it is found on the top corner of your screen which consists of three horizontal white bars.

#### Join Room
+ Once the user has accessed mustaske.com, they will be prompted with the front page which allows them to Make a room as well as Join a room.
+ The user needs to enter in the ‘Room id’, that is shared by the creator of the room, and click ‘Join’ in order to join the room.

#### Delete Room (Owner)
+  Click on the ‘Room Options’ which is found on the top right corner of the screen and click ‘Delete Room’. This feature allows the owner to get rid of the room and close the session.

#### Leave Room (Audience)
+  Click on the ‘Room Options’ which is found on the top right corner of the screen and click ‘Leave Room’. This feature allows the owner to get rid of the room and close the session.

#### Top Questions (Owner)
+ These are displayed on the left side of the owner screen. This feature shows you the upvoted questions.

#### Recent Questions (Owner)
+ These are displayed on the right side of the owner screen. This feature shows you the recent questions that have been added by the users of the group.

#### Start Poll (Owner)
+ Click on the ‘Start Poll’ button which is located on the top right part of the owner page. This feature allows the owner to start a poll for the audience members.

#### Stop Poll (Owner)
+ Click on the ‘Stop Poll’ button which is located on the top right part of the owner page. This feature allows the owner to stop the poll for the audience members.

#### Poll Results (Owner)
+ Click on the ‘Poll Results’ button which is located on the top right part of the owner page. This feature allows the the owner to view the poll results from the audience input.

#### Search Questions (Owner)
+  Click on the text field with the grayed out text ‘Search all questions’ and search your desired question.

#### Dismiss Question (Owner)
+ Click the ‘Dismiss Question’ button  on the appropriate question they need to dismiss.

#### Warn User (Owner)
+ Click on the ‘Warn User’ button which then shows the user a warning message.

#### Ban User (Owner)
+ If the user has been warned twice they will then be banned. Refer to Warn User (Owner) for further details.

#### Ask Question (Audience)
+ Click on the text field with the grayed out ‘ask a question!’ and ask your desired question by clicking enter once done typing or by clicking the mail icon at the end of the text box.

#### Format Question (Audience)
+ The user may modify their text by following the sample text formatting tips below the text field.

#### Vote on Poll (Audience)
+ If your voting screen went away, click on the ‘Vote on Poll’ button at the top right of your screen and your answers choices will appear again.
+ It turns green if you have voted, and turns red if you have not yet voted.



Mobile
---

#### Create Room
+ Once the user has accessed mustaske.com, they will be prompted with the front page which allows them to Make a room as well as Join a room.
+ Making a room consists of the user typing in their desired room name and clicking ‘Make’
+ The user must share the ‘Room id’, which is found in the dropdown menu in the top left corner of the screen.
+ The dropdown menu will then become the ‘Room Options’ button when you enter fullscreen.

#### Join Room
+ Once the user has accessed mustaske.com, they will be prompted with the front page which allows them to Make a room as well as Join a room.
+ The user needs to enter in the ‘Room id’, that is shared by the creator of the room, and click ‘Join’.

#### Delete Room (Owner)
+  Click on the dropdown menu in the top left corner of the screen and click ‘Delete Room’ which is found under the “Room Options” tab. This feature allows the owner to get rid of the room and close the session.

#### Leave Room (Owner)
+  Click on the dropdown menu in the top left corner of the screen and click ‘Leave Room’ which is found under the “Room Options” tab. This feature allows the owner to get rid of the room and close the session.

#### Top Questions (Owner)
+ Click on the dropdown menu and click ‘Top Questions’ which is found under the “Questions Options” tab. This feature shows you the upvoted questions.

#### Recent Questions (Owner)
+ Click on the dropdown menu and click ‘Recent Questions’ which is found under the “Questions Options” tab. This feature shows you the recent questions that have been added by the users of the group.

#### Start Poll (Owner)
+ Click on the dropdown menu and click ‘Start Poll’ which is found under the “Poll Options” tab. This feature allows the owner to start a poll for the audience members.

#### Stop Poll (Owner)
+ Click on the dropdown menu and click ‘Stop Poll’ which is found under the “Poll Options” tab. This feature allows the owner to stop the poll for the audience members.

#### Poll Results (Owner)
+ Click on the dropdown menu and click ‘Poll Results’ which is found under the “Poll Options” tab. This feature allows the the owner to view the poll results from the audience input.

#### Search Questions (Owner)
+  Click on the dropdown menu and click the text field with the grayed out text ‘Search all questions’ which is found under the “Questions Options” tab. This feature allows the owner to search all of the questions.

#### Dismiss Question (Owner)
+ Click the ‘Dismiss Question’ button  on the appropriate question they need to dismiss.

#### Warn User (Owner)
+ Click on the ‘Warn User’ button which then shows the user a warning message.

#### Ban User (Owner)
+ If the user has been warned twice they will then be banned. Refer to Warn User (Owner) for further details.

#### Ask Question (Audience)
+ Click on the text field with the grayed out ‘ask a question!’ and ask your desired question by clicking enter once done typing or by clicking the mail icon at the end of the text box.

#### Format Question (Audience)
+ The user may modify their text by following the sample text formatting tips below the text field.

#### Vote on Poll (Audience)
+ If your voting screen went away, click on the ‘Vote on Poll’ button at the bottom of the dropdown menu and your answers choices will appear again.
+ It turns green if you have voted, and turns red if you have not yet voted.

Requirements
---
You need to install **npm**, **node**, and a few other goodies to install Mustaske on your server. First you need to install python software properties.
```
sudo apt-get install python-software-properties
```
You can install the node stuff.
```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
Now you should have the most up to date version of node.js. Lets move on to the good stuff.

Installation
---
1. Clone the repository to your local directory.
```
git clone https://github.com/Kyly/mustaske.git
```
2. To install the dependencies run the following.
```
cd mustaske
npm install
```
3. Now you can start the app with.
```
npm start
```
 Now your up and rolling! Open up your browser and make a room. If you are on local host go to `localhost:3000`.


Debugging
-----
To set the log level for socket.io you can run the app with:
```
  DEBUG=* npm start
```
This allows you to see fine grain what request and responses the server is making
along with details about things like who is in a room.

Tests
-----
### Front end tests with Selenium and Python ###
To run frontend test you will need to have selenium, pyhton selenium webdriver,
and Firefox browser.

+ [Download Selenium](http://www.seleniumhq.org/projects/ide/).
+ To install python selenium webdriver on linux run `pip install selenium` for
 more information see [selenium python](http://selenium-python.readthedocs.org/en/latest/installation.html).

Then run the following script:
```
  npm run-script test-front
```
If this is your first time running the script you will need to make it executable
by entering the following:
```
  sudo chmod +x test/runscripts.sh
```
Add your own python selenium tests to `test/selenium_src/` directory.
### Server side tests with Mocha ###

First you will need to download mocha to your workstation.
```
  sudo npm install -g mocha
```
Notice we are using ```-g``` which global installs _mocha_ on you workstation.

Then to run the test simply enter the following from the projects root directory.

```
  npm run-script test-back
```

You see something like:
```
> supapp@0.0.0 test /home/kyly/GDrive/sp15/cse110/supapp
> mocha ./test/*.js



  Rooms
    #addRoom()
      ✓ should have room in questionrepo after addRoom is called.
    #hasRoom()
      ✓ should have room in questionrepo after addRoom is called.
    #purgeRoom()
      ✓ should have room in questionrepo after addRoom is called.


  3 passing (5ms)
```
Add your test to the *test* directory. If you need an example of how these
should look check out the test in ```roomstest.js```. We have a lot more assertion available to us so look up the documentation if you want to do something more complex.

### Run all test ###
To run all tests simply run:
```
  npm test
```
You will need to have _all dependencies installed_. For instruction follow the steps
above.


Our Story
---
[![Mustaske Dev Story](http://img.youtube.com/vi/https://youtu.be/-QMxtmNfIBI/0.jpg)](http://www.youtube.com/watch?v=https://youtu.be/-QMxtmNfIBI)

###### The MIT License (MIT)
Copyright (c) 2015 Kyly Vass, Brandon Falk, Tanner Turner, Crystal Kwok, Daniel Lee, Jose Valdez, Chris Tetreault, Nick Gibson, Robert Kronebusch.

[See license details here.](LICENSE.md)
