import { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";

// import "./Form.style.css";
import "./Form.style.v2.css";

type TForm = {
  children: ReactNode;
  className?: string;
  onSubmit: () => void;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, className, onSubmit, ...props }: TForm) => {
  return (
    <form
      className={`form ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      {...props}
    >
      {children}
    </form>
  );
};

type TInput = {
  label: string | ReactNode;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, name, ...props }: TInput) => {
  const ctx = useFormContext();

  let errors = {};
  let combinedProps = { ...props, name };

  if (ctx) {
    const { register, formState } = ctx;

    errors = formState.errors;
    combinedProps = {
      ...props,
      ...register(name),
    };
  }

  return (
    <Wrapper elementName={name} errors={errors}>
      <label htmlFor={props.id}>{label}</label>
      <input {...combinedProps} />
    </Wrapper>
  );
};
Form.Input = Input;

type TSelect = {
  children: ReactNode;
  name: string;
  label: string;
} & InputHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, name, label, ...props }: TSelect) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper elementName={name} errors={errors}>
      <label htmlFor={props.id}>{label}</label>
      <select {...register(name)} {...props}>
        {children}
      </select>
    </Wrapper>
  );
};

Form.Select = Select;

type TGroup = {
  children: ReactNode;
  noBorder?: boolean;
};

const Group = ({ children, noBorder = false }: TGroup) => {
  return (
    <fieldset className={`form__group ${noBorder ? "no-border" : ""}`}>
      {children}
    </fieldset>
  );
};

Form.Group = Group;

interface Wrapper {
  elementName: string | undefined;
  errors: FieldErrors;
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ elementName, errors, children }: Wrapper) => {
  if (!elementName) return <>{children}</>;

  const errMessage = extractError({ stringPath: elementName, errors });

  return (
    <div className="form__element">
      {children}
      {errMessage && <div className="my-2 text-error">{errMessage}</div>}
    </div>
  );
};

function extractError({
  stringPath,
  errors,
}: {
  stringPath: string;
  errors: FieldErrors;
}) {
  const message = stringPath.split(".").reduce((acc: any, key) => {
    if (acc === undefined) return undefined;
    return acc[key];
  }, errors)?.message;

  return message;
}

export default Form;
