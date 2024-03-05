import requests

# Base URL of your FastAPI application
BASE_URL = 'http://142.93.185.100:8084'

def test_get_candies():
    response = requests.get(f'{BASE_URL}/candies')
    assert response.status_code == 200
    print("GET /candies test passed.")

def test_get_categories():
    response = requests.get(f'{BASE_URL}/candies/category/')
    assert response.status_code == 200
    print("GET /categories test passed.")

def test_get_candies_by_category(category='chocolate'):
    response = requests.get(f'{BASE_URL}/candies/category/{category}')
    assert response.status_code == 200
    print(f"GET /candies/category/{category} test passed.")

def test_get_candies_by_keyword(keyword='sugar'):
    response = requests.get(f'{BASE_URL}/candies/{keyword}')
    assert response.status_code == 200
    print(f"GET {BASE_URL}/candies/{keyword}test passed.")

def test_get_candies_by_name(key='mars'):
    response = requests.get(f'{BASE_URL}/candies/{key}')
    assert response.status_code == 200
    print(f"GET {BASE_URL}/candies/{key} test passed.")

def test_get_candies_by_price_range(lower_price=10, upper_price=50):
    response = requests.get(f'{BASE_URL}/candies/{upper_price}/{lower_price}')
    assert response.status_code == 200
    print("GET /candies/price test passed.")

def test_get_candy_by_id(id=42688407142587):
    response = requests.get(f'{BASE_URL}/candies/id/', params={'id': id})
    assert response.status_code == 200
    print(f"GET /candies/id/ test passed.")

# def test_get_candy_image(id=1):
#     response = requests.get(f'{BASE_URL}/image/{id}')
#     assert response.status_code == 200
#     print(f"GET /image/{id} test passed.")

def test_update_candy():
    id = '42688861077691'
    key = 'price'
    val = '34.99'
    response = requests.put(f'{BASE_URL}/candies/update', params={'id': id, 'key': key, 'val': val})
    assert response.status_code == 200
    print("PUT /candies/update test passed.")

# def test_add_new_candy():
#     new_candy = {'name': 'Test Candy', 'category': 'Test Category', 'price': 1.99}
#     response = requests.post(f'{BASE_URL}/candy/', json=new_candy)
#     assert response.status_code == 200
#     print("POST /candy/ test passed.")

def test_delete_candy(candy_id='42688800915643'):
    response = requests.delete(f'{BASE_URL}/candies/', params={'candy_id': candy_id})
    assert response.status_code == 200
    print(f"DELETE /candies/ test passed.")

def run_tests():
    test_get_candies()
    test_get_categories()
    test_get_candies_by_category()
    test_get_candies_by_keyword()
    test_get_candies_by_name()
    test_get_candies_by_price_range()
    test_get_candy_by_id()
    test_update_candy()
    test_delete_candy()
    
if __name__ == '__main__':
    run_tests()