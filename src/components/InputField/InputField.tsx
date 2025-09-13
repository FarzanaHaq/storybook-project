import { useState, type ChangeEvent } from "react";
import {
  SIZE_CLASSES,
  VARIANT_CLASSES,
  STATE_CLASSES,
} from "./InputField.constants";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

export interface InputFieldStyleProps {
  variant: "filled" | "outlined" | "ghost";
  size: "sm" | "md" | "lg";
  invalid: boolean;
  disabled: boolean;
  loading: boolean;
  hasValue: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  showPasswordToggle = false,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [inputType, setInputType] = useState(type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue("");
    // Create a synthetic event to call onChange with empty value
    const syntheticEvent = {
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const hasValue = inputValue.length > 0;
  const isPasswordType = type === "password";
  const displayType = isPasswordType ? inputType : type;

  // Base classes
  let inputClasses = `block w-full rounded-md transition-colors duration-200 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}`;

  // State classes
  if (invalid) inputClasses += ` ${STATE_CLASSES.invalid}`;
  if (disabled) inputClasses += ` ${STATE_CLASSES.disabled}`;
  if (loading) inputClasses += ` ${STATE_CLASSES.loading}`;

  // Focus styles (not disabled or loading)
  if (!disabled && !loading) {
    inputClasses += " focus:outline-none focus:ring-2 focus:ring-blue-500/20";
  }

  return (
    <div className={`relative mt-2 ${className}`}>
      {label && (
        <label
          htmlFor={label}
          className={`block mb-1 font-medium ${
            invalid ? "text-red-600" : "text-gray-900"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={label}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          type={displayType}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={
            helperText || errorMessage ? `${label}-help` : undefined
          }
        />

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Clear button */}
        {showClearButton && hasValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            aria-label="Clear input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Password toggle */}
        {showPasswordToggle && isPasswordType && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {inputType === "password" ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p
          id={`${label}-help`}
          className={`mt-1 text-sm ${
            invalid ? "text-red-600" : "text-gray-500"
          }`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
