import { CSSFormElement, CSSFormElementLabel } from "@/app/styles";
import { ReactNode } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";

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
  autocomplete?: string;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  type,
  name,
  label,
  autocomplete = "off",
  disabled,
  className,
}: Input) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper id={name} errors={errors} className={className}>
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder=" "
        autoComplete={autocomplete}
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
    <FieldWrapper id={name} errors={errors}>
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
    <FieldWrapper id={name} errors={errors}>
      <select
        {...register(name)}
        id={name}
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

interface Checkbox {
  name: string;
  label: string;
  autocomplete?: string;
  disabled?: boolean;
  className?: string;
}

const Checkbox = ({
  name,
  label,
  autocomplete = "off",
  disabled,
  className,
}: Checkbox) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper id={name} errors={errors} className={className}>
      <div className="flex gap-2 items-center">
        <input
          {...register(name)}
          id={name}
          type="checkbox"
          placeholder=" "
          autoComplete={autocomplete}
          className=""
          disabled={disabled}
        />
        <label htmlFor={name} className="">
          {label}
        </label>
      </div>
    </FieldWrapper>
  );
};
Form.Checkbox = Checkbox;

interface Textarea {
  name: string;
  label: string;
  rows?: number;
  disabled?: boolean;
}

interface FieldWrapper {
  id: string;
  errors: FieldErrors;
  children: ReactNode;
  className?: string;
}

const FieldWrapper = ({
  id,
  errors,
  children,
  className = "",
}: FieldWrapper) => {
  const errMessage = extractError({ stringPath: id, errors });

  return (
    <div className={`relative z-0 ${className}`}>
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
