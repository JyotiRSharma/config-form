import validateAddress from "./validators/address-validator";
import validateEmail from "./validators/email-validator";
import validatePassword from "./validators/password-validator";
import validateUserName from "./validators/user-name-validator";

export interface IValid {
    valid: boolean;
    message?: string
}

export default function validate({name, value}: {name: string; value: string}): IValid {
    let result: IValid = {valid: true};
    switch(name) {
        case "email-id":
            result = validateEmail(value);
            break;
        case "user-name":
            result = validateUserName(value);
            break;
        case "password":
            result = validatePassword(value);
            break;
        case "address":
            result = validateAddress(value);
    }
    return result;
}