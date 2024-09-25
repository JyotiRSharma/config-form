import { IValid } from "../validate";

export default function validateUserName (value: string): IValid {
    const regex = /^[a-zA-Z0-9]{5,}$/;
    const isValid = regex.test(value);
    let result: IValid = {valid: isValid}
    if (!isValid) {
        result = {valid: isValid, message: "Please enter a valid username"}
    }
    return result;
}