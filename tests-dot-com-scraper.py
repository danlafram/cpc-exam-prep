import time
import requests

from selenium import webdriver 
from selenium.webdriver import Chrome 
from selenium.webdriver.common.by import By


# Define the Chrome webdriver options
options = webdriver.ChromeOptions() 
# options.add_argument("--headless") # Set the Chrome webdriver to run in headless mode for scalability

# By default, Selenium waits for all resources to download before taking actions.
# However, we don't need it as the page is populated with dynamically generated JavaScript code.
options.page_load_strategy = "normal"

# Pass the defined options objects to initialize the web driver 
driver = Chrome(options=options) 

# Set an implicit wait of 5 seconds to allow time for elements to appear before throwing an exception
driver.implicitly_wait(5)

driver.get('https://www.tests.com/practice/Medical-Billing-Practice-Test')

time.sleep(1)

table = driver.find_element(By.TAG_NAME, "table")

# Get the questions:
questions = table.find_elements(By.CLASS_NAME, "q-details")
  
# for q in questions:
#     print(q.text)
    
# Get the answers: qanswer-text
answers = table.find_elements(By.CLASS_NAME, "qanswer-text")

# for a in answers:
#     print(a.text)


answer_index = 0
# Now send the information to the certification engine
questions_url = 'http://localhost:8000/api/question'
answers_url = 'http://localhost:8000/api/answer'
for q in questions:
    myobj = {'question': q.text}
    response = requests.post(questions_url, json = myobj)
    created_question = response.json()
    counter = 0
    # Once question is posted, use return value to create answers. 4 answers per question
    while counter < 4:
         answer_obj = {
            'answer_text': answers[answer_index].text,
            'is_answer': 1,
            'question_id': created_question['id']
        }
         x = requests.post(answers_url, json = answer_obj)
         counter += 1
         answer_index +=1
    
