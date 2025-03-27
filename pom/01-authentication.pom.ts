import { APIRequestContext } from "@playwright/test";

export class AuthorApiPage {
    request: APIRequestContext;
    accessToken: string;

    constructor(request: APIRequestContext, accessToken: string) {
        this.request = request;
        this.accessToken = accessToken;
    }

    async getAllAuthors() {
        const authors = await this.request.get('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors', {
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        });

        const authorJson = await authors.json();
        return authorJson;
    }

    async getAuthorById(id: number) {
        const authors = await this.request.get('https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors' + id, {
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        });

        const authorJson = await authors.json();
        return authorJson;
    }
}