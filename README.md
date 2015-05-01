SUP BRA!
=======

Features
-------
- [ ] _Some_ feature
- [x] **Some** bold text

Tests
-----
First you will need to download mocha to your workstation.
```
  sudo npm install -g mocha
```
Notice we are using ```-g``` which global installs _mocha_ on you workstatio.

Then to run the test simply enter the following from the projects root directory.

```
  npm test
```

You see something like the:
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
