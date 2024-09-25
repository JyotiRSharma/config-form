import { IValid } from "../validate";


export default function validateEmail (value: string): IValid {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(value);
    let result: IValid = {valid: isValid}
    if (!isValid) {
        result = {valid: isValid, message: "Please enter a valid email address"}
    }
    return result;
}