import { useState, useEffect, useRef } from 'react';
import './App.css';

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

function App() {
  const [config, setConfig] = useState<IForm>();
  const [values, setValues] = useState<{ [x: string]: string }[] | undefined>();
  const [output, setOutput] = useState<any>();

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
      // const textFields = Object.values(formRef.current).filter(
      //   (item) => item?.localname == 'input'
      // );
      // console.log({ textFields });
      // console.log({ form: formRef.current });
    }
  };
  console.log(config);
  if (config?.form) {
    return (
      <>
        <form
          ref={formRef}
          className="config-forms"
          onSubmit={(event) => handleSubmit(event)}
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
      </>
    );
  }
  return <h1>Yellow</h1>;
}

export default App;
