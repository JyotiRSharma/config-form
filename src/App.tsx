import { useState, useEffect, useRef } from 'react';
import './App.css';
import validateEmail from './utils/validations/validators/email-validator';
import validate from './utils/validations/validate';

interface IForm {
  form: {
    fields: { label: string; type: string; required: boolean; name: string }[];
    buttons: {
      label: string;
      type: 'button' | 'reset' | 'submit' | undefined;
      disabled: boolean;
      name: string;
    }[];
  };
}

interface IErrors {
  fields: { name: string; test: {valid: boolean; message?: string} }[]
}

function App() {
  const [config, setConfig] = useState<IForm>();
  const [values, setValues] = useState<{ [x: string]: string }[] | undefined>();
  const [output, setOutput] = useState<any>();
  const [errors, setErrors] = useState<IErrors>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch('/config.json')
      .then((response) => response.json())
      .then((data) => setConfig(data));
  }, []);
  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (formRef.current) {
      const payload: any = {};
      const names = config?.form.fields.map((item) => {
        // payload(item);
        const name = item.name;
        payload[name] = formRef.current && formRef.current[name].value;
        return item.name;
      });
      const values = names?.map((name) => ({
        [name]: formRef.current && formRef.current[name].value,
      }));
      console.log({ payload });
      setOutput(payload);
      setValues(values);
    }
  };

  const handleChange = (formEvent: React.BaseSyntheticEvent) => {
    const fieldName = formEvent.target.name;
    const isValid = validate({name: fieldName, value: formEvent.target.value});

    setErrors((prev) => {
      if (prev) {
      const updatedFields = prev.fields.map((field) => {
        const obj = field.name == fieldName ? {...field, test: isValid} : field;
        return obj;
      })
      const fieldExists = prev.fields.some((field) => field.name == fieldName)
      if(!fieldExists) {
        updatedFields.push({name: fieldName, test: isValid})
      }
      return {fields: updatedFields}
    }
    return {fields: [{name: fieldName, test: isValid}]}
    })
  }

  console.log(config);
  if (config?.form) {
    return (
      <>
        <form
          ref={formRef}
          className="config-forms"
          onSubmit={(event) => handleSubmit(event)}
          onChange={(event) => handleChange(event)}
        >
          {config.form.fields.map((field, index) => (
            <label
              key={index}
              htmlFor={field.name}
              className="config-form-label"
            >
              {field.label} &nbsp;
              <input
                type={field.type}
                name={field.name}
                required={field.required}
              />
            </label>
          ))}
          {config.form.buttons.map((button, index) => (
            <button
              key={index}
              name={button.name}
              type={button.type}
              disabled={button.disabled}
            >
              {button.label}
            </button>
          ))}
        </form>
        {values && <pre>{JSON.stringify(values)}</pre>}
        {output && <pre>{JSON.stringify(output)}</pre>}
        {errors && <pre>{JSON.stringify(errors)}</pre>}
      </>
    );
  }
  return <h1>Yellow</h1>;
}

export default App;
