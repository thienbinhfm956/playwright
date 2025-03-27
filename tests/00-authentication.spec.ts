import test from "@playwright/test";
import { json } from "stream/consumers";

test("test post login", async ({ request }) => {
    const response = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/auth/login",
        {
            data: {
                "username": "admin@betterbytesvn.com",
                "password": "123@123A"
              }
        }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    const accessToken = responseJson.data.accessToken;
    console.log(accessToken);

    // Create Admin User 
    const response1 = await request.post("https://bblib-dev-api.betterbytesvn.cloud/v2/admin/users", {
        data: {
            "name": "Binh",
            "username": "johndoe1",
            "password": "password1231",
            "role": "user",
            "status": "active"
        },
        headers: {
            "Authorization":  ' Bearer ' + accessToken
        }
    })
    console.log(response1);

});
