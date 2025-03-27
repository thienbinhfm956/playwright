
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
    async registerAuthorAccount(name: string, password: string) {
        // Tạo username ngẫu nhiên
        const randomUsername = "user_" + Math.random().toString(36).substring(2, 8);

        const response = await this.request.post(
            'https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/register',
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                },
                data: {
                    username: randomUsername,
                    name,
                    password
                }
            }
        );

        if (response.status() !== 201) {
            throw new Error(`Đăng ký thất bại: ${response.status()} - ${await response.text()}`);
        }

        const resultJson = await response.json();
        return {
            ...resultJson,
            generatedUsername: randomUsername
        };
    }
    async createAuthor(
        name: string,
        description: string,
        birthDate: string,
        deathDate: string,
        nationality: string
    ) {
        const response = await this.request.post(
            'https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors',
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                },
                data: {
                    name,
                    description,
                    birthDate,
                    deathDate,
                    nationality
                }
            }
        );

        if (response.status() !== 200 && response.status() !== 201) {
            throw new Error(`Tạo tác giả thất bại: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }
    async getAuthorsWithPagination(page: number = 1, limit: number = 10) {
        const response = await this.request.get(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors?page=${page}&limit=${limit}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Lỗi khi lấy danh sách tác giả: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }
    async getAuthorByIdIs1(id: number) {
        const response = await this.request.get(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors/${id}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Không thể lấy tác giả ID ${id}: ${response.status()} - ${await response.text()}`);
        }

        const authorJson = await response.json();
        return authorJson;
    }
    async updateAuthorById(
        id: number,
        name: string,
        description: string,
        birthDate: string,
        deathDate: string,
        nationality: string
    ) {
        const response = await this.request.patch(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors/${id}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                },
                data: {
                    name,
                    description,
                    birthDate,
                    deathDate,
                    nationality
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Cập nhật tác giả thất bại: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }
    async deleteAuthorById(id: number) {
        const response = await this.request.delete(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/authors/${id}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200 && response.status() !== 204) {
            throw new Error(`Xóa tác giả thất bại: ${response.status()} - ${await response.text()}`);
        }

        return {
            status: response.status(),
            message: `Tác giả ID ${id} đã được xóa`
        };
    }

}


