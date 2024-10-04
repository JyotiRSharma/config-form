import { useEffect, useState } from "react";
import validate from "../utils/validations/validate";

interface IField {
    label: string;
    name: string;
    type: string;
    error: boolean;
    message: string;
    value: string;
    required: boolean;
}

const Form = ({ fields }: { fields: IField[] }) => {
    const [fieldValues, setFieldValues] = useState(fields);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const checkErrors = () => {
            const errors = fieldValues.filter((field) => field.error);
            if (errors.length) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }
        }
        checkErrors();
    }, [fieldValues])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues((prev) => {
            const alteredField = prev.map((field) => {
                const validity = validate({
                    name: field.name,
                    value: e.target.value,
                });
                if (field.name == e.target.name) {
                    field.value = e.target.value;
                    field.error = !validity.valid;
                    if (validity.message) {
                        field.message = validity.message;
                    }
                }
                return field;
            });
            return alteredField;
        });
        
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = new Map<string, string>();
        fieldValues.forEach((field) => payload.set(field.name, field.value));
        console.log(JSON.stringify(Object.fromEntries(payload)));
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {fieldValues.map((field) => {
                return (
                    <div key={field.name}>
                        <label className="form-field">
                            {field.label}
                            <input
                                type={field.type}
                                name={field.name}
                                onChange={handleChange}
                            />
                        </label>
                        {field.error && (
                            <span className="error">{field.message}</span>
                        )}
                    </div>
                );
            })}
            <button disabled={isDisabled}>Submit</button>
        </form>
    );
};

export default Form;
