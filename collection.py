import requests
from bs4 import BeautifulSoup
import lxml.etree as ET
from pymongo import MongoClient, errors
import base64

# Function to scrape book data from a single page
def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    books = []
    for article in soup.find_all('article', class_='product_pod'):
        title = article.h3.a['title']
        price = article.find('p', class_='price_color').text[2:]
        stock = article.find('p', class_='instock availability').text.strip()
        rating = article.p['class'][1]
        
        book = ET.Element("book")
        ET.SubElement(book, "title").text = title
        ET.SubElement(book, "price").text = price
        ET.SubElement(book, "stock").text = stock
        ET.SubElement(book, "rating").text = rating
        books.append(book)
    
    return books

# Base URL of the website
base_url = "http://books.toscrape.com/"
page_url = "catalogue/page-{}.html"

# Container for all books
all_books = []

# Scrape data from the first 5 pages (adjust the range as needed)
for page in range(1, 6):
    url = base_url + page_url.format(page)
    books = scrape_page(url)
    all_books.extend(books)

# Create the XML structure
root = ET.Element("books")
for book in all_books:
    root.append(book)

# Write the XML data to a file
tree = ET.ElementTree(root)
with open("books.xml", "wb") as file:
    tree.write(file, pretty_print=True, xml_declaration=True, encoding="UTF-8")

print("Data has been successfully scraped and saved to books.xml")

# Parse the XML and XSD files
xml_file = "books.xml"
xsd_file = "books.xsd"

# Load XML and XSD documents
xml_doc = ET.parse(xml_file)
xsd_doc = ET.parse(xsd_file)

# Create an XMLSchema object
xml_schema = ET.XMLSchema(xsd_doc)

# Validate the XML document against the schema
is_valid = xml_schema.validate(xml_doc)

# Print validation result
if is_valid:
    print("XML is valid against the XSD.")
else:
    print("XML is not valid against the XSD.")
    # Print validation errors
    log = xml_schema.error_log
    for error in log:
        print(error.message)

# MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["bookstore"]
    collection = db["books"]
    print("Connected to MongoDB successfully.")
except errors.ConnectionError as e:
    print(f"Could not connect to MongoDB: {e}")

# Read the XML data from the file
with open("books.xml", "rb") as file:
    xml_data = file.read()

# Optional: Encode the XML data using base64
encoded_data = base64.b64encode(xml_data).decode('utf-8')

# Prepare the document to be inserted
document = {
    "encoded_xml_data": encoded_data
}

# Insert the document into the collection
try:
    collection.insert_one(document)
    print("Data has been successfully encoded (if applicable) and stored in MongoDB.")
except errors.PyMongoError as e:
    print(f"An error occurred while inserting the document: {e}")
    
    # check
