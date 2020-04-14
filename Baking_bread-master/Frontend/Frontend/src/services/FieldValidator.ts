export default class FieldValidator {
  static isNotEmpty(value: any) {
    return value !== "";
  }
  static isNumber(value: any) {
    return typeof value === "number" && isFinite(value);
  }
  static isInteger(value: any) {
    return Number.isInteger(value);
  }
}
