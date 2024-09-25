import { IValid } from "../validate";

export default function validateAddress (value: string): IValid {
    const regex = /^[a-zA-Z0-9\d@$!%*\-.,#?&\s]{20,}$/;
    const isValid = regex.test(value);
    let result: IValid = {valid: isValid}
    if (!isValid) {
        result = {valid: isValid, message: "Please enter a valid address"}
    }
    return result;
}