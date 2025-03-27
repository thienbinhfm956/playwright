import { expect, test } from "@playwright/test"
import { AuthenticationApiPage } from "../pom/01-pom-login.pom";
import { AuthorApiPage } from "../pom/02-pom-author.pom";

test("06 - authenticated with pom", async ({ request }) => {
    const authPOM = new AuthenticationApiPage(request);

    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
    console.log(token);
});
test("07 - register new author with random username and verify response", async ({ request }) => {
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const authorPOM = new AuthorApiPage(request, token);
  
    const result = await authorPOM.registerAuthorAccount("John Doe", "password123");
  
    const data = result.data;
  
    console.log("✅ Đăng ký thành công. Username:", result.generatedUsername);
  
    expect(data).toBeTruthy(); // Có data trả về
    //expect(data.username).toBe(result.generatedUsername); // Đúng username random đã gửi
    //expect(data.name).toBe("John Doe"); // Đúng tên đã đăng ký
    expect(result.message).toMatch(/success/i); // Message chứa "success"
  });
  test("08 - create new author with random name and verify response", async ({ request }) => {
    // Bước 1: Đăng nhập để lấy access token
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    // Bước 2: Khởi tạo POM cho tác giả
    const authorPOM = new AuthorApiPage(request, token);
  
    // ✅ Tạo name random
    const randomName = "Author_" + Math.random().toString(36).substring(2, 8);
  
    // Dữ liệu mẫu
    const description = "Tác giả thử nghiệm";
    const birthDate = new Date().toISOString();
    const deathDate = new Date().toISOString();
    const nationality = "Vietnamese";
  
    // Bước 3: Gọi API tạo tác giả
    const result = await authorPOM.createAuthor(randomName, description, birthDate, deathDate, nationality);
  
    console.log("✅ Tác giả đã được tạo:", result);
  
    // ✅ Bước 4: Xác minh dữ liệu trả về
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.name).toBe(randomName);
    //expect(result.data.nationality).toBe(nationality);
  });
  test("09 - get authors with pagination and verify response", async ({ request }) => {
    // Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const authorPOM = new AuthorApiPage(request, token);
  
    // Gọi API lấy danh sách tác giả
    const result = await authorPOM.getAuthorsWithPagination(1, 10);
  
    console.log("✅ Danh sách tác giả (page 1):", result);
  
    // Xác minh dữ liệu trả về
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeLessThanOrEqual(10);
  });

  test("10 - get author by ID and verify response", async ({ request }) => {
    // Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const authorPOM = new AuthorApiPage(request, token);
  
    // ID mẫu để test, bạn có thể dùng ID vừa tạo từ test trước
    const authorId = 2;
  
    const result = await authorPOM.getAuthorById(authorId);
  
    console.log("✅ Tác giả với ID 2:", result);
  
    // ✅ Kiểm tra phản hồi
    expect(result).toBeTruthy();
    //expect(result.data).toBeDefined();
    //expect(result.data.id).toBe(authorId);
    //expect(result.data.name).toBeDefined();
  });

  test("11 - update author by ID and verify", async ({ request }) => {
    // Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const authorPOM = new AuthorApiPage(request, token);
  
    // ID giả định để cập nhật 
    const authorId = 1;
  
    // Dữ liệu cập nhật
    const name = "Author Updated";
    const description = "Updated description";
    const birthDate = new Date().toISOString();
    const deathDate = new Date().toISOString();
    const nationality = "Updated Nationality";
  
    const result = await authorPOM.updateAuthorById(
      authorId,
      name,
      description,
      birthDate,
      deathDate,
      nationality
    );
  
    console.log("✅ Cập nhật thành công:", result);
  
    // ✅ Kiểm tra phản hồi
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(authorId);
    expect(result.data.name).toBe(name);
  });

  test("12 - delete author by ID and verify", async ({ request }) => {
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const authorPOM = new AuthorApiPage(request, token);
  
    // ✅ Bước 1: Tạo author để test xóa (tránh xóa nhầm dữ liệu gốc)
    const created = await authorPOM.createAuthor(
      "AuthorToDelete",
      "This author will be deleted",
      new Date().toISOString(),
      new Date().toISOString(),
      "Temporary"
    );
  
    const authorId = created.data.id;
    console.log(`🛠 Đã tạo tác giả ID ${authorId} để kiểm tra xóa`);
  
    // ✅ Bước 2: Gọi API xóa
    const result = await authorPOM.deleteAuthorById(authorId);
    console.log("✅", result.message);
  
    // ✅ Bước 3: Gọi lại getById để xác nhận đã xóa
    let getError;
    try {
      await authorPOM.getAuthorById(authorId);
    } catch (error) {
      getError = error;
    }
  
    expect(getError).toBeDefined(); // Chắc chắn không còn tìm thấy tác giả đã xóa
  });
