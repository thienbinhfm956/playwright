import { test, expect } from '@playwright/test';

test("01 - post admin language", async ({ request }) => {
    // Step 1: Login admin to get token
    const loginRes = await request.post('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login', {
        data: {
            username: 'admin@betterbytesvn.com',
            password: '123@123A'
        }
    });

    const loginJson = await loginRes.json();
    const token = loginJson.data?.accessToken;

    expect(token).toBeTruthy(); // ensure token is valid

    // Step 2: Prepare test data
    const name = 'English';
    const description = 'English language books';

    // Step 3: Call create language API with token
    const responseRegister = await request.post('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            name,
            description
        }
    });

    // Step 4: Validate response
    const responseBody = await responseRegister.json();
    console.log("Register response:", responseBody);

    expect(responseRegister.status()).toBe(201);
    expect(responseBody.data).toBeTruthy();
});

test("02 - get admin languages page 1 limit 10", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login", {
        data: {
            "username": "admin@betterbytesvn.com",
            "password": "123@123A"
        }
    });

    const responseLoginJson = await responseLogin.json();

    // Get token
    const token = responseLoginJson.data.accessToken;
    const sendGetRequest = async (url: string) => {
        const response = await request.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response;
    }

    // Call API get languages with token
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages?page=1&limit=10');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});

test("03 - get admin language id = 1", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login", {
        data: {
            "username": "admin@betterbytesvn.com",
            "password": "123@123A"
        }
    });

    const responseLoginJson = await responseLogin.json();

    // Get token
    const token = responseLoginJson.data.accessToken;
    const sendGetRequest = async (url: string) => {
        const response = await request.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response;
    }

    // Call API get languages with token
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/1');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});

test("04 - patch admin languages id = 1", async ({ request }) => {
    // Step 1: Login admin to get token
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login", {
        data: {
            username: "admin@betterbytesvn.com",
            password: "123@123A"
        }
    });

    const responseLoginJson = await responseLogin.json();
    const token = responseLoginJson.data.accessToken;

    // Step 2: Prepare updated data
    const updatedData = {
        "name": "English",
        "description": "English language books"
    };

    // Step 3: Call PATCH API
    const response = await request.patch('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/1', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: updatedData
    });

    const bodyJson = await response.json();
    console.log("PATCH response:", bodyJson);
    console.log("Status:", response.status());

    // Step 4: Validate
    expect(response.status()).toBe(200);
    expect(bodyJson.data).toBeTruthy();
    expect(bodyJson.data.name).toBe(updatedData.name);
});

test("05 - delete admin languages id = 4", async ({ request }) => {
    // Step 1: Login admin to get token
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login", {
        data: {
            username: "admin@betterbytesvn.com",
            password: "123@123A"
        }
    });

    const responseLoginJson = await responseLogin.json();
    const token = responseLoginJson.data.accessToken;

    expect(token).toBeTruthy();

    // Step 2: Call DELETE API
    const response = await request.delete('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/4', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': '*/*',
        },
    });

    const bodyJson = await response.json();

    console.log("DELETE response:", bodyJson);
    console.log("Status:", response.status());

    // Step 3: Validate
    expect(response.status()).toBe(200);
    expect(bodyJson.message).toBeTruthy();
});