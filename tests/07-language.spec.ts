import { test, expect } from "@playwright/test";
import { AuthenticationApiPage } from "../pom/01-pom-login.pom";
import { LanguageApiPage } from "../pom/03-language.pom";

test("13 - post admin languages", async ({ request }) => {
  // Bước 1: Đăng nhập để lấy token
  const authPOM = new AuthenticationApiPage(request);
  const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");

  // Bước 2: Tạo POM cho language
  const languagePOM = new LanguageApiPage(request, token);

  // ✅ Dữ liệu với name random
  const randomName = "Lang_" + Math.random().toString(36).substring(2, 6);
  const description = "Language created via automation";

  const result = await languagePOM.createLanguage(randomName, description);

  console.log("✅ Ngôn ngữ đã tạo:", result);

  // ✅ Xác minh phản hồi
  expect(result).toBeTruthy();
  expect(result.data).toBeDefined();
  expect(result.data.name).toBe(randomName);
});
test("14 - get admin languages with page 1 limit 10", async ({ request }) => {
    // Bước 1: Đăng nhập để lấy token
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    // Bước 2: Khởi tạo POM cho Language
    const languagePOM = new LanguageApiPage(request, token);
  
    // Bước 3: Gọi API lấy danh sách ngôn ngữ
    const result = await languagePOM.getLanguagesWithPagination(1, 10);
  
    console.log("✅ Danh sách ngôn ngữ:", result);
  
    // ✅ Xác minh phản hồi
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeLessThanOrEqual(10);
  });

  test("15 - get admin languages id 10", async ({ request }) => {
    // Bước 1: Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const languagePOM = new LanguageApiPage(request, token);
  
    // ID của ngôn ngữ muốn lấy
    const languageId = 10;
  
    const result = await languagePOM.getLanguageById(languageId);
  
    console.log(`✅ Chi tiết ngôn ngữ ID ${languageId}:`, result);
  
    // ✅ Xác minh phản hồi
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(languageId);
    expect(result.data.name).toBeDefined();
  });

  test("16 - patch admin languages id 9", async ({ request }) => {
    // Bước 1: Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    // Bước 2: Khởi tạo Language API Page
    const languagePOM = new LanguageApiPage(request, token);
  
    // Bước 3: ID ngôn ngữ cần cập nhật
    const languageId = 9;
  
    // Dữ liệu cập nhật
    const updatedName = "English";
    const updatedDescription = "English language books";
  
    // Bước 4: Gửi request cập nhật
    const result = await languagePOM.updateLanguageById(languageId, updatedName, updatedDescription);
  
    console.log(`✅ Ngôn ngữ ID ${languageId} đã được cập nhật:`, result);
  
    // ✅ Xác minh kết quả
    expect(result).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(languageId);
    expect(result.data.name).toBe(updatedName);
    expect(result.data.description).toBe(updatedDescription);
  });

  test("17 - delete language by ID and verify", async ({ request }) => {
    // Bước 1: Đăng nhập
    const authPOM = new AuthenticationApiPage(request);
    const token = await authPOM.login("admin@betterbytesvn.com", "123@123A");
  
    const languagePOM = new LanguageApiPage(request, token);
  
    // Bước 2: Tạo ngôn ngữ tạm để test xóa
    const created = await languagePOM.createLanguage(
      "LangToDelete_" + Math.random().toString(36).substring(2, 6),
      "This language will be deleted"
    );
  
    const languageId = created.data.id;
    console.log("🛠 Đã tạo ngôn ngữ ID:", languageId);
  
    // Bước 3: Gọi API xóa
    const result = await languagePOM.deleteLanguageById(languageId);
    console.log("✅", result.message);
  
    // Bước 4: Gọi lại getById để xác minh đã bị xóa
    let getError;
    try {
      await languagePOM.getLanguageById(languageId);
    } catch (error) {
      getError = error;
    }
  
    expect(getError).toBeDefined();
  });
