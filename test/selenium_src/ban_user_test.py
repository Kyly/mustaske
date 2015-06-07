# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class PostInProgress(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:3000/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_post_in_progress(self):
        driver = self.driver
        driver.get(self.base_url)
        room = "Test_Room"
        
        print("Creating a room")
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(room)
        driver.find_element_by_id("make-room").click()
        self.assertEqual(room, driver.find_element_by_css_selector("span.navbar-brand.room-name").text)
        driver.find_element_by_css_selector("span.fa.fa-cogs").click()
        roomID = driver.find_element_by_class_name("drop-down-room-id").text
        
        print("Accessing a Room as an Audience member")
        time.sleep(2) 
        driver.execute_script("$(window.open('"+self.base_url+"'))")
        driver.switch_to_window(driver.window_handles[-1])
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(roomID)
        driver.find_element_by_id("join-room").click()
        self.assertEqual(room, driver.find_element_by_css_selector("span.navbar-brand.room-name").text)
        time.sleep(2)
        
        driver.find_element_by_class_name("add-question-text").clear()
        driver.find_element_by_class_name("add-question-text").send_keys("Audience 1 present")
        driver.find_element_by_class_name("add-question-btn").click()
        driver.find_element_by_class_name("add-question-text").clear()
        #driver.find_element_by_class_name("add-question-text").send_keys("Audience 1")
        
        driver.switch_to_window(driver.window_handles[0])
        driver.find_element_by_css_selector("div#recent-questions-container :last-child a.warn-user").click()
        driver.switch_to_window(driver.window_handles[1])
        time.sleep(2)
        driver.find_element_by_css_selector("button.bootbox-close-button.close").click()
        
        driver.switch_to_window(driver.window_handles[0])
        driver.find_element_by_css_selector("div#recent-questions-container :last-child a.warn-user").click()
        time.sleep(0.5)
        driver.switch_to_window(driver.window_handles[1])
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(roomID)
        driver.find_element_by_id("join-room").click()
        
        time.sleep(3)
    
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
