import { expect, test } from "@playwright/test"
import { AuthenticationApiPage } from "../pom/01-pom-login.pom";
import { AuthorApiPage } from "../pom/02-pom-author.pom";

test("06 - authenticated with pom", async ({ request }) => {
    const authPOM = new AuthenticationApiPage(request);

    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
    console.log(token);
});
