# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class DismissQuestion(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:3000/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_dismiss_question(self):
        driver = self.driver
        driver.get(self.base_url)
        owner = driver.window_handles[0]
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys("Test_Room")
        driver.find_element_by_id("make-room").click()

        ownerRoomName = driver.find_element_by_css_selector("span.navbar-brand.room-name").text
        self.assertEqual("Test_Room",ownerRoomName)
        driver.find_element_by_css_selector("span.fa.fa-cogs").click()
        ownerRoomID = driver.find_element_by_class_name("drop-down-room-id").text
        driver.find_element_by_css_selector("span.fa.fa-cogs").click()

        driver.execute_script("$(window.open('"+self.base_url+"'))")
        user = driver.window_handles[-1]
        driver.switch_to_window(user)
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys(ownerRoomID)
        driver.find_element_by_id("join-room").click()

        q1 = "Test_Question1"
        driver.find_element_by_css_selector("input.form-control.add-question-text").clear()
        driver.find_element_by_css_selector("input.form-control.add-question-text").send_keys(q1)
        driver.find_element_by_css_selector("button.btn.btn-default.add-question-btn").click()
        q2 = "Test_Question2"
        driver.find_element_by_css_selector("input.form-control.add-question-text").clear()
        driver.find_element_by_css_selector("input.form-control.add-question-text").send_keys(q2)
        driver.find_element_by_css_selector("button.btn.btn-default.add-question-btn").click()

        driver.switch_to_window(owner)
        driver.find_element_by_link_text("Dismiss Question").click()

        try: self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.top-questions-container.fail"))
        except AssertionError as e: self.verificationErrors.append(str(e))
        self.assertEqual(q1, driver.find_element_by_css_selector("div.question-content > p").text)

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
