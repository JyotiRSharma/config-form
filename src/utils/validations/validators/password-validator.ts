import { IValid } from "../validate";

export default function validatePassword (value: string): IValid {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = regex.test(value);
    let result: IValid = {valid: isValid}
    if (!isValid) {
        result = {valid: isValid, message: "Please enter a valid password"}
    }
    return result;
}