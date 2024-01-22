import { ReactNode } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";
import { CSSFormElement, CSSFormElementLabel } from "../styles";

interface Form {
  onSubmit: () => void;
  children: ReactNode;
  className?: string;
  ariaHidden?: boolean;
}

const Form = ({ onSubmit, children, className, ariaHidden }: Form) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </form>
  );
};

interface Input {
  type: "text" | "number";
  name: string;
  label: string;
  disabled?: boolean;
}

const Input = ({ type, name, label, disabled }: Input) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const err = errors[name];

  return (
    <FieldWrapper error={errors[name]}>
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder=" "
        className={CSSFormElement}
        disabled={disabled}
      />
      <label htmlFor={name} className={CSSFormElementLabel}>
        {label}
      </label>
    </FieldWrapper>
  );
};
Form.Input = Input;

interface Textarea {
  name: string;
  label: string;
  rows?: number;
  disabled?: boolean;
}

const Textarea = ({ name, label, rows, disabled }: Textarea) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper error={errors[name]}>
      <textarea
        {...register(name)}
        id={name}
        rows={rows || 3}
        placeholder=" "
        className={CSSFormElement}
        disabled={disabled}
      />
      <label htmlFor={name} className={CSSFormElementLabel}>
        {label}
      </label>
    </FieldWrapper>
  );
};
Form.Textarea = Textarea;

interface Select {
  name: string;
  label: string;
  options: {
    value: string;
    option: string;
  }[];
  disabled?: boolean;
}

const Select = ({ name, label, options, disabled }: Select) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper error={errors[name]}>
      <select
        {...register(name)}
        id={name}
        placeholder=" "
        defaultValue={""}
        className={CSSFormElement}
        disabled={disabled}
      >
        <option value="" hidden>
          Select an option
        </option>
        {options.map(({ value, option }) => (
          <option key={value} value={value}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor={name} className={CSSFormElementLabel}>
        {label}
      </label>
    </FieldWrapper>
  );
};
Form.Select = Select;

interface FieldWrapper {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  children: ReactNode;
}

const FieldWrapper = ({ error, children }: FieldWrapper) => (
  <div className="relative z-0 mb-5">
    {children}
    {error && (
      <div className="my-2 text-error">{error.message?.toString()}</div>
    )}
  </div>
);

export default Form;
