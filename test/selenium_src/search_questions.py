# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class SearchQuestions(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:3000/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_search_questions(self):
        driver = self.driver
        driver.get(self.base_url + "/")
        driver.find_element_by_css_selector("input.form-control").clear()
        driver.find_element_by_css_selector("input.form-control").send_keys("Bla")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_id("add-question-text").clear()
        driver.find_element_by_id("add-question-text").send_keys("Stuff")
        driver.find_element_by_id("add-question-btn").click()
        driver.find_element_by_id("add-question-text").clear()
        driver.find_element_by_id("add-question-text").send_keys("Things")
        driver.find_element_by_id("add-question-btn").click()
        driver.find_element_by_id("add-question-text").clear()
        driver.find_element_by_id("add-question-text").send_keys("stuff")
        driver.find_element_by_id("add-question-btn").click()
        driver.find_element_by_id("add-question-text").clear()
        driver.find_element_by_id("add-question-text").send_keys("cat")
        driver.find_element_by_id("add-question-btn").click()
        driver.find_element_by_id("add-question-text").clear()
        driver.find_element_by_id("add-question-text").send_keys("dog")
        driver.find_element_by_xpath("//div[@id='recent-questions-container']/div[2]/div/div/a[2]/i").click()
        driver.find_element_by_id("add-question-btn").click()
        driver.find_element_by_id("search-question-text").clear()
        driver.find_element_by_id("search-question-text").send_keys("stuff")
        driver.find_element_by_css_selector("div.input-group.form-group > span.input-group-btn > button.btn.btn-default").click()
        driver.find_element_by_id("search-question-text").clear()
        driver.find_element_by_id("search-question-text").send_keys("dog")
        driver.find_element_by_css_selector("div.input-group.form-group > span.input-group-btn > button.btn.btn-default").click()
        driver.find_element_by_id("search-question-text").clear()
        driver.find_element_by_id("search-question-text").send_keys("")
        driver.find_element_by_css_selector("div.input-group.form-group > span.input-group-btn > button.btn.btn-default").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
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
