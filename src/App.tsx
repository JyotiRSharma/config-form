import { useEffect, useState } from "react";
import "./App.css";
import Form from "./features/Form";

interface IForm {
    form: {
        fields: {
            label: string;
            name: string;
            type: string;
            error: boolean;
            message: string;
            value: string;
            required: boolean;
        }[];
        buttons: {
            label: string;
            type: "button" | "reset" | "submit" | undefined;
            disabled: boolean;
            name: string;
        }[];
    };
}

function App() {
    const [config, setConfig] = useState<IForm>();

    useEffect(() => {
        fetch("src/config/form.json")
            .then((response) => response.json())
            .then((data) => setConfig(data));
    }, []);

    if (config?.form) {
        return (
            <>
                <Form fields={config.form.fields} />
            </>
        );
    }
    return <h1>Yellow</h1>;
}

export default App;
