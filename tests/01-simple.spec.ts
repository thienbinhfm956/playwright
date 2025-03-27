import test from "@playwright/test";

test("test simple get", async ({ request }) => {
    const response = await request.get("https://bblib-dev-api.betterbytesvn.cloud/v2/public/authors?page=1&limit=10");
    const responseJson = await response.json();
    console.log(responseJson);
    
    console.log(responseJson.statusCode);
    console.log(responseJson.message);
    console.log(responseJson.data[0].name);
})