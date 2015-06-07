# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Tmp(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(50)
        self.base_url = "http://localhost:3000"
        self.verificationErrors = []
        self.accept_next_alert = True
         

    
    def test_tmp(self):
        driver = self.driver
        driver.get(self.base_url)
        
        # Name of the room
        room = "Test_Room"
 
        print("Creating a room")
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(room)
        driver.find_element_by_id("make-room").click()
        driver.find_element_by_css_selector("span.fa.fa-cogs").click()
        
        #Storing the ID of the room
        roomID = driver.find_element_by_class_name("drop-down-room-id").text
        
        print("Accessing a Room as an Audience member")
       
        driver.execute_script("$(window.open('"+self.base_url+"'))")
        driver.switch_to_window(driver.window_handles[-1])
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(roomID)
        driver.find_element_by_id("join-room").click()
        
        # 1st Question asked
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("CSE 110")
        driver.find_element_by_class_name("add-question-btn").click()
        
        # 2nd Question asked
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("Loops")
        driver.find_element_by_class_name("add-question-btn").click()
        
        # 3rd Question asked
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("Cluster loops")
        driver.find_element_by_class_name("add-question-btn").click()
        
        # 4th Question asked
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("Software Engineering")
        driver.find_element_by_class_name("add-question-btn").click()
        
        # 5th Question asked
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("Igny")
        driver.find_element_by_class_name("add-question-btn").click()
        
        # Searching for the word "France"
        driver.find_element_by_id("search-text-sm").clear()
        driver.find_element_by_id("search-text-sm").send_keys("France")
        driver.find_element_by_css_selector("i.fa-search").click()
        time.sleep(1)
        driver.find_element_by_css_selector("i.search-close").click()
        
        # Searching for the word "Software"
        driver.find_element_by_id("search-text-sm").clear()
        driver.find_element_by_id("search-text-sm").send_keys("Software")
        driver.find_element_by_css_selector("i.fa-search").click()
        time.sleep(1)
        driver.find_element_by_css_selector("i.search-close").click()
        
        # Searching for the word "loops"
        driver.find_element_by_id("search-text-sm").clear()
        driver.find_element_by_id("search-text-sm").send_keys("loops")
        driver.find_element_by_css_selector("i.fa-search").click()
        time.sleep(1)
        driver.find_element_by_css_selector("i.search-close").click()
        
        # Searching for the letter "c"
        driver.find_element_by_id("search-text-sm").clear()
        driver.find_element_by_id("search-text-sm").send_keys("c")
        driver.find_element_by_css_selector("i.fa-search").click()
        time.sleep(1)
        driver.find_element_by_css_selector("i.search-close").click()
        
        print("End of Test")
        time.sleep(2)
        
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
