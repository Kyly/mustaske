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
        self.base_url = "http://localhost:3000/"
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
        
        # The number of audience members that will be on the test. Increse by
        # by one in order to keep the 0 index for the owner member
        audience = int(input("How many audience members are in the room? "))
        audience = audience + 1
        
        # Setting if we want the distribution of the answers to be equal or random
        distribution = str(input("Should poll answers be given in equal or random distribution? "))
        while distribution[0] != 'e' and distribution[0] != 'E' and distribution[0] != 'r' and distribution != 'R':
            distribution = str(input("Should poll answers be given in equal or random distribution?"))
        
        random_distr = True
        if(distribution[0] == 'e' or distribution == 'E'):
            random_distr = False
        
        print("Creating a room")
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(room)
        driver.find_element_by_id("make-room").click()
        self.assertEqual(room, driver.find_element_by_css_selector("span.navbar-brand.room-name").text)
        #driver.find_element_by_css_selector("span.fa.fa-cogs").click()
        roomID = driver.find_element_by_class_name("drop-down-room-id").text
        
        print("Accessing a Room as an Audience member")
        time.sleep(2)
        
        for x in range(1, audience): 
            driver.execute_script("$(window.open('"+self.base_url+"'))")
            driver.switch_to_window(driver.window_handles[-1])
            driver.find_element_by_css_selector("input.form-control").clear()
            driver.find_element_by_css_selector("input.form-control").send_keys(roomID)
            driver.find_element_by_id("join-room").click()
            self.assertEqual(room, driver.find_element_by_css_selector("span.navbar-brand.room-name").text)
        
        print("Switching to Owner view in order to start the poll");
        time.sleep(2)
        driver.switch_to_window(driver.window_handles[0])
        driver.find_element_by_css_selector("span.start-poll-text").click()
        
        print("Switching to Audience view in order to answer poll")
        time.sleep(2)
        
        # If we select the random distribution option:
        if random_distr:
            for x in range(1, audience):
                print("Answering poll")
                driver.switch_to_window(driver.window_handles[x])
                driver.find_element_by_link_text(random.choice(options)).click()
                time.sleep(3)
                driver.find_element_by_css_selector("#clicker-modal > div.modal-dialog > div.modal-content > div.modal-footer > button.btn.btn-default")
        
        # Else, if we select the equal distribution        
        else:
            equal_distr = audience / 5    
            for x in range(1, audience):
                driver.switch_to_window(driver.window_handles[x])
                
                print("Answering poll")
                if(x <= equal_distr):
                    driver.find_element_by_link_text("A").click()
                elif (x <= equal_distr * 2):
                    driver.find_element_by_link_text("B").click()
                elif (x <= equal_distr * 3):
                    driver.find_element_by_link_text("C").click()
                elif (x <= equal_distr * 4):
                    driver.find_element_by_link_text("D").click()
                else:
                    driver.find_element_by_link_text("E").click()
                    
                time.sleep(3)
                driver.find_element_by_css_selector("#clicker-modal > div.modal-dialog > div.modal-content > div.modal-footer > button.btn.btn-default")
        
        print("Switching to Owner view to see the results")
        time.sleep(2)
        driver.switch_to_window(driver.window_handles[0])
        driver.find_element_by_class_name("show-graph-btn").click()
        time.sleep(10)
        driver.find_element_by_css_selector("div.modal-footer > button.btn.btn-default").click()
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
