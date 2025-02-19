const assert = require("assert");
const { Builder, Browser } = require("selenium-webdriver");
const FormPage = require("./formPage");

describe("Validación de formulario", () => {
  let driver;
  let formPage;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://127.0.0.1:3000/contacto.html");

    // Crear instancia de FormPage
    formPage = new FormPage(driver);
    await formPage.waitForForm(); 
  });

  after(async () => {
    await driver.quit();  
  });

  it("Validar las advertencias al enviar el formulario", async () => {
    await formPage.submitForm();

    const errorName = await formPage.getErrorMessage("name");
    const errorEmail = await formPage.getErrorMessage("email");
    const errorMessage = await formPage.getErrorMessage("message");

    assert.equal(errorName, "El nombre es requerido");
    assert.equal(errorEmail, "El email es requerido");
    assert.equal(errorMessage, "El mensaje es requerido");
  });
});