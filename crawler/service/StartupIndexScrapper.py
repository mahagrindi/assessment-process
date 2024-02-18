from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import time

class StartupIndexScraper:
    def __init__(self, url):
        self.url = url
        options = webdriver.EdgeOptions()
        # options.add_argument('--headless')
        self.driver = webdriver.Edge(options=options)
        self.driver.get(url)
        try:
            # Wait for the startup table to load
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'startup-table')))
        except TimeoutException:
            print("Timeout waiting for startup table to load")
            self.driver.quit()

    def scrape(self):
        all_startups = []
        while True:
            # Wait for the load more button to be clickable
            try:
                load_more_button = WebDriverWait(self.driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, '#startup-table_next')))
                soup = BeautifulSoup(self.driver.page_source, 'html.parser')
                startups = soup.select('.css-gsweeu')  # Selecting the specific div containing the data
                for startup in startups:
                    # Extract the desired information
                    name = startup.find('p', {'class': 'chakra-text css-119cf4i'}).text.strip()
                    description = startup.find('p', {'class': 'chakra-text css-1lc8rtz'}).text.strip()
                    industry = startup.find('span', {'class': 'css-18wissm'}).text.strip()
                    # Append the extracted information to the list
                    all_startups.append({'Name': name, 'Description': description, 'Industry': industry})
                load_more_button.click()
                time.sleep(1)  # Adjust timing based on the response of your target site
            except TimeoutException:
                print("No more pages to load or button not found.")
                break
            except Exception as e:
                print(f"An error occurred: {e}")
                break

        self.driver.quit()
        return all_startups