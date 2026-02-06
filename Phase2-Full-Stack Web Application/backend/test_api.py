import requests
import json

base_url = "http://127.0.0.1:8888/api"
email = "test@example.com"
password = "password123"

def test_flow():
    # 1. Signin
    print("--- Testing Signin ---")
    response = requests.post(f"{base_url}/auth/signin", json={"email": email, "password": password})
    print(f"Signin Status: {response.status_code}")
    if response.status_code != 200:
        print(f"Signin Failed: {response.text}")
        return
    
    data = response.json()
    token = data["token"]
    print(f"Signin Success! Token obtained: {token[:10]}...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # 2. Create Task
    print("\n--- Testing Create Task ---")
    task_data = {"title": "Test Task from Script", "description": "This is a test"}
    response = requests.post(f"{base_url}/tasks", json=task_data, headers=headers)
    print(f"Create Task Status: {response.status_code}")
    if response.status_code == 201:
        task = response.json()
        print(f"Task Created! ID: {task['id']}, Title: {task['title']}")
        task_id = task['id']
    else:
        print(f"Create Task Failed: {response.text}")
        return

    # 3. List Tasks
    print("\n--- Testing List Tasks ---")
    response = requests.get(f"{base_url}/tasks", headers=headers)
    print(f"List Tasks Status: {response.status_code}")
    if response.status_code == 200:
        tasks = response.json()
        print(f"Found {len(tasks)} tasks.")
        for t in tasks:
            print(f"- [{ 'x' if t['is_complete'] else ' ' }] #{t['id']}: {t['title']}")
    else:
        print(f"List Tasks Failed: {response.text}")

    # 4. Toggle Complete
    print("\n--- Testing Toggle Complete ---")
    response = requests.patch(f"{base_url}/tasks/{task_id}/complete", headers=headers)
    print(f"Toggle Status: {response.status_code}")
    if response.status_code == 200:
        task = response.json()
        print(f"Task #{task['id']} is now { 'complete' if task['is_complete'] else 'pending' }")
    else:
        print(f"Toggle Failed: {response.text}")

if __name__ == "__main__":
    test_flow()
