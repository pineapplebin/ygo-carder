import requests
from bs4 import BeautifulSoup

CONSTANTS = dict(
    headers={
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }
)


def fetch_list():
    response = requests.get(
        'https://yugioh.wikia.com/wiki/Category:OCG_cards',
        verify=False)
    soup = BeautifulSoup(response.text, features='html.parser')
    return soup


def find_all_items(soup):
    arr = soup.find_all(class_='category-page__member')
    rst = []
    for item in arr:
        a = item.find('a')
        i = dict(url=a.get('href', None), name=a.string.strip())
        rst.append(i)
    return rst


if __name__ == "__main__":
    soup = fetch_list()
    rst = find_all_items(soup)
    print(rst)
