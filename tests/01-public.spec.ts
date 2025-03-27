import { test, expect } from "@playwright/test";

test("01-public register", async ({ request }) => {
    const username = 'bin_' + Date.now();
    const password = '123';

    const responseRegister = await request.post('https://bblib-dev-api.betterbytesvn.cloud/v2/public/register', {
        data: {
            username,
            name: 'bin',
            password
        }
    });

    expect(responseRegister.status()).toBe(201);
    console.log("Register response:", await responseRegister.json());

    const responseLogin = await request.post('https://bblib-dev-api.betterbytesvn.cloud/v2/public/login', {
        data: {
            "username": "admin@betterbytesvn.com",
            "password": "123@123A"
        }
    });

    const loginJson = await responseLogin.json();
    console.log("Login response:", loginJson);

    expect(responseLogin.status()).toBe(201);
    expect(loginJson.data?.accessToken).toBeTruthy();

    const token = loginJson.data.accessToken;

    const response = await request.get('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const bodyJson = await response.json();
    console.log("Authenticated response:", bodyJson);
    expect(bodyJson.data).toBeTruthy();
});

test("02 - public login", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

    // Call API get authors with token
    const responseAuthors = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors');
    const bodyAuthors = await response.json();
    console.log(bodyAuthors);
});

test("03 - get public book id = 3", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/public/book/3');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();
});

test("05 - get public categories page 1 limit 10", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/public/categories?page=1&limit=10');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});

test("06 - get public author page 1 limit 10", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/public/authors?page=1&limit=10');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});

test("07 - get public language page 1 limit 10", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/public/languages?page=1&limit=10');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});

test("09 - get public history page 1 limit 10", async ({ request }) => {
    // Call login api
    const responseLogin = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/public/login", {
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
    const response = await sendGetRequest('https://bblib-dev-api.betterbytesvn.cloud/v2/public/history?page=1&limit=10');
    const bodyJson = await response.json();

    console.log(bodyJson);
    console.log(response.status());

    expect(response.status()).toEqual(200);
    expect(bodyJson.statusCode).toBeTruthy();
    expect(bodyJson.data).toBeTruthy();

});


