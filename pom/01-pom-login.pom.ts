import { APIRequestContext } from "@playwright/test";

export class AuthenticationApiPage {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(username: string, password: string) {
        const response = await this.request.post('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login', {
            data: {
                "username": "admin@betterbytesvn.com",
                "password": "123@123A"
              }
        });

        const responseJson = await response.json();
        return responseJson.data.accessToken;
    }
}