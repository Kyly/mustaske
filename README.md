
Mustaske
=======

FAQS
---
+ _Why are the top question on my computer different then the ones on my
naighbors?_ Due to server badwidth _top questions_, although correctly accounted on the
backend, are not guaranteed to be the same on all displays. We call
_Near Real Time_ updates. Over a given period of time polls across all desktops.

+ Why do I have to use a room ID and not room name? The room ids are your rooms
unique identifier. These are required because more
one user might want "Joes Meat Shack" and well that's fine, who are we to judge.
So name your room whatever you like and it will show up in the sites topbar but
to join the room you will need to use the unique room id.

Requirements
---
You need to install **npm**, **node**, and a few other goodies to install
Mustaske on your server. First you need to install python software properties.
```
sudo apt-get install python-software-properties
```
You can install the node stuff.
```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
Now you should have the most up to date version of node.js. Lets move on to
the good stuff.

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
 Now your up and rolling! Open up your browser and make a room. If you are on
 local host go to `localhost:3000`.

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
should look check out the test in ```roomstest.js```. We have a lot more
assertion available to us so look up the documentation if you want to do
something more complex.

### Run all test ###
To run all tests simply run:
```
  npm test
```
You will need to have _all dependencies installed_. For instruction follow the
installation instruction.


Our Story
---
[![Mustaske Dev Story](http://img.youtube.com/vi/-QMxtmNfIBI/0.jpg)](http://www.youtube.com/watch?v=-QMxtmNfIBI)

[Watch on YouTube](http://www.youtube.com/watch?v=-QMxtmNfIBI)

#### The MIT License (MIT)
Copyright (c) 2015 Kyly Vass, Brandon Falk, Tanner Turner, Crystal Kwok,
Daniel Lee, Jose Valdez, Chris Tetreault, Nick Gibson, Robert Kronebusch.

[See license details here.](LICENSE.md)
