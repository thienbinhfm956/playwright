import { APIRequestContext } from "@playwright/test";

export class LanguageApiPage {
    request: APIRequestContext;
    accessToken: string;

    constructor(request: APIRequestContext, accessToken: string) {
        this.request = request;
        this.accessToken = accessToken;
    }

    async createLanguage(name: string, description: string) {
        const response = await this.request.post(
            'https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages',
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                },
                data: {
                    name,
                    description
                }
            }
        );

        if (response.status() !== 200 && response.status() !== 201) {
            throw new Error(`Tạo ngôn ngữ thất bại: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }

    async getLanguagesWithPagination(page: number = 1, limit: number = 10) {
        const response = await this.request.get(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages?page=${page}&limit=${limit}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Lấy danh sách ngôn ngữ thất bại: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }
    async getLanguageById(id: number) {
        const response = await this.request.get(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/${id}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Không tìm thấy ngôn ngữ ID ${id}: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }

    async updateLanguageById(id: number, name: string, description: string) {
        const response = await this.request.patch(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/${id}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken
                },
                data: {
                    name,
                    description
                }
            }
        );

        if (response.status() !== 200) {
            throw new Error(`Cập nhật ngôn ngữ thất bại: ${response.status()} - ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    }
    async deleteLanguageById(id: number) {
        const response = await this.request.delete(
            `https://bblib-dev-api.betterbytesvn.cloud/v2/admin/languages/${id}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );

        if (response.status() !== 200 && response.status() !== 204) {
            throw new Error(`Xóa ngôn ngữ thất bại: ${response.status()} - ${await response.text()}`);
        }

        return {
            status: response.status(),
            message: `Đã xóa ngôn ngữ ID ${id}`
        };
    }

}
