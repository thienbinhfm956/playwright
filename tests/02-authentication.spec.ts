import { test, expect } from '@playwright/test';

const baseUrl = 'https://bblib-dev-api.betterbytesvn.cloud/v2/public';

const randomSuffix = Math.floor(Math.random() * 100000); 
const testUsername = `thienbinh${randomSuffix}`;
const testPassword = `123A@${randomSuffix}`;
const testName = `Thiên Bình ${randomSuffix}`;

test('Test 01 - Đăng ký tài khoản thienbinh1103', async ({ request }) => {
  const response = await request.post(`${baseUrl}/register`, {
    data: {
      username: testUsername,
      name: testName,
      password: testPassword,
    },
  });

  const responseBody = await response.json();

  console.log('Register response:', responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody.data).toBeTruthy();
  expect(responseBody.message).toContain('Registration successful'); // nếu backend trả thông điệp dạng này
});

test('Test 02 - Đăng nhập với tài khoản vừa đăng ký', async ({ request }) => {
  const response = await request.post(`${baseUrl}/login`, {
    data: {
      username: testUsername,
      password: testPassword,
    },
  });

  const responseBody = await response.json();

  console.log('Login response:', responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody.data?.accessToken).toBeTruthy();
});
