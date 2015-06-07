# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
import random

class PostPoll(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:3000"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_post_poll(self):
        
        # Preparing the variables for this tests
        print("Preparing the variables")
        driver = self.driver
        driver.get(self.base_url)
        
        # Name of the room
        room = "Test_Room"
        
        # Options of the poll
        options = "ABCDE"
        
        #Number of "audience" in the room.
        audience = 6
        
        print("Creating a room")
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(room)
        driver.find_element_by_id("make-room").click()
        driver.find_element_by_css_selector("span.fa.fa-cogs").click()
        roomID = driver.find_element_by_class_name("drop-down-room-id").text
        
        print("Accessing a Room as an Audience member")
        for x in range(1, audience):
            driver.execute_script("$(window.open('"+self.base_url+"'))")
            driver.switch_to_window(driver.window_handles[-1])
            driver.find_element_by_css_selector("input.form-control").clear()
            driver.find_element_by_css_selector("input.form-control").send_keys(roomID)
            driver.find_element_by_id("join-room").click()
            
            
        print("Switching to Owner view in order to start the poll");
        driver.switch_to_window(driver.window_handles[0])
        driver.find_element_by_css_selector("span.start-poll-text").click()
        
        
        print("Switching to Audience view in order to answer poll")
        for x in range(1, audience):
            print("Answering poll")
            driver.switch_to_window(driver.window_handles[x])
            time.sleep(2)
        
        time.sleep(2)
        
        print("End of Test")

    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
