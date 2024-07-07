import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import dicttoxml
from lxml import etree
import json
import base64

def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # print(soup)
    books = []
    for article in soup.find_all('article', class_='product_pod'):
        title = article.h3.a['title']
        price = article.find('p', class_='price_color').text[2:]
        stock = article.find('p', class_='instock availability').text.strip()
        rating = article.p['class'][1]
        image = url + article.a.img['src']
        book = {
            'title':title,
            'price':price,
            'stock':stock,
            'rating':rating,
            'image':image,
        }  
        books.append(book)
    return books

# Base URL of the website
base_url = "http://books.toscrape.com/"
page_url = "catalogue/page-{}.html"

# Container for all books

def scrape_all_books():
    # Scrape data from the first 5 pages (adjust the range as needed)
    all_books = []
    for page in range(1, 50):
        url = base_url + page_url.format(page)
        books = scrape_page(url)
        all_books.extend(books)
        
    return all_books

def encode_data(data):
    # Encode the string data to bytes, then to base64, and back to a string
    return base64.b64encode(data.encode()).decode()


def store_books_in_mongodb(books):
    client = MongoClient('localhost', 27017)
    db = client['books_db']
    collection = db['books']
    encoded_books = []
    for book in books:
        encoded_book = {
            'title':encode_data(book['title']),
            'price':encode_data(book['price']),
            'stock':encode_data(book['stock']),
            'rating':encode_data(book['rating']),
            'image':encode_data(book['image']),
        }
        encoded_books.append(encoded_book)

    collection.insert_many(encoded_books)
    client.close()

def convert_books_to_xml(books):
    xml = dicttoxml.dicttoxml(books, custom_root='books', attr_type=False)
    with open('books.xml', 'wb') as f:
        f.write(xml)

def validate_xml_with_xsd(xml_path, xsd_path):
    xml_doc = etree.parse(xml_path)
    with open(xsd_path, 'rb') as f:
        xmlschema_doc = etree.parse(f)
        xmlschema = etree.XMLSchema(xmlschema_doc)
        result = xmlschema.validate(xml_doc)
        if result:
            print("XML is valid")
            return True
        else:
            print("XML is not valid")
            print(xmlschema.error_log)
            return False

if __name__ == '__main__':
    books_data = scrape_all_books()
    convert_books_to_xml(books_data)
    valid = validate_xml_with_xsd('books.xml', 'books.xsd')
    if(valid == True):
        store_books_in_mongodb(books_data)
    else:
        print("Data not valid and not stored!")
