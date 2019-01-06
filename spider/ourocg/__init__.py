import requests
from bs4 import BeautifulSoup

CONSTANTS = dict(
    headers={
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        'referer': 'https://www.ourocg.cn'
    }
)


def fetch_card(card_id: str):
    response = requests.get(
        'https://www.ourocg.cn/search/{0}/'.format(card_id),
        verify=False, headers=CONSTANTS['headers'])
    if response.status_code != 200:
        raise Exception(response)
    return BeautifulSoup(response.text, features='html.parser')


def get_effect(soup, type='cn'):
    effect = soup.body.find(class_='val el-col-24 effect').find_all('template')
    if not effect:
        raise Exception(effect)
    if type == 'cn':
        return effect[0].string.strip()
    else:
        return effect[1].string.strip()


if __name__ == "__main__":
    res = fetch_card(card_id='07093411')
    rst = get_effect(res, type='nw')
    print(rst)
