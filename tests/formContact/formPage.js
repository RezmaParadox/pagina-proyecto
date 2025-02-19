const { By, until } = require("selenium-webdriver");

class FormPage {
  constructor(driver) {
    this.driver = driver;
    this.submitButton = By.id("enviar");
    this.errorName = By.id("name-error");
    this.errorEmail = By.id("email-error");
    this.errorMessage = By.id("message-error");
  }

  // Esperar que el formulario esté listo
  async waitForForm() {
    await this.driver.wait(until.elementLocated(this.submitButton), 10000);
  }

  // Hacer clic en el botón de enviar
  async submitForm() {
    const button = await this.driver.findElement(this.submitButton);
    await button.click();
  }

  // Obtener mensajes de error
  async getErrorMessage(field) {
    let errorField;
    switch (field) {
      case "name":
        errorField = this.errorName;
        break;
      case "email":
        errorField = this.errorEmail;
        break;
      case "message":
        errorField = this.errorMessage;
        break;
      default:
        throw new Error("Campo no reconocido");
    }
    const errorElement = await this.driver.findElement(errorField);
    return await errorElement.getText();
  }
}

module.exports = FormPage;