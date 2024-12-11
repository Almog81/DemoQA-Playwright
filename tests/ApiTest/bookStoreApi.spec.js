import { test, expect } from '@playwright/test';

test.describe('Book Store API Tests', () => {
  const baseUrl = 'https://demoqa.com';
  let token;
  let userId;
  const testUser = {
    userName: `testUser${Math.random()}`,
    password: 'Test123!'
  };

  async function makeRequest(request, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await request(options);
        if (response.status() !== 502) {
          return response;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  test.beforeAll(async ({ request }) => {
    // בדיקת זמינות השרת
    const healthCheck = async () => {
      try {
        const response = await request.get('https://demoqa.com/swagger/');
        return response.status() === 200;
      } catch {
        return false;
      }
    };

    const isAvailable = await healthCheck();
    if (!isAvailable) {
      console.warn('Warning: DemoQA API might be unstable or unavailable');
    }
  });

  test('Test 1: should create a new user', async ({ request }) => {
    const response = await makeRequest(() => 
      request.post(`${baseUrl}/Account/v1/User`, {
        data: testUser,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('userID');
    expect(responseBody).toHaveProperty('username', testUser.userName);
    userId = responseBody.userID;
  });

  test('Test 2: should generate token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/Account/v1/GenerateToken`, {
      data: testUser
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('result');
    token = responseBody.token;
  });

  test('Test 3: should authorize user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/Account/v1/Authorized`, {
      data: testUser
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toBe(true);
  });

  test('Test 4: should get user details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/Account/v1/User/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('username', testUser.userName);
    expect(responseBody).toHaveProperty('books');
  });

  test('Test 5: should delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/Account/v1/User/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(response.status()).toBe(204);
  });

  test('Test 6: should handle invalid login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/Account/v1/Authorized`, {
      data: {
        userName: 'invalidUser',
        password: 'invalidPass'
      }
    });
    
    expect(response.status()).toBe(404);
  });

  test.afterEach(async () => {
    // השהייה של 1 שנייה בין הטסטים
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
}); 