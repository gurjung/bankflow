export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: T;
}

export function validateLoginForm(
  email: string,
  password: string,
): ValidationResult<LoginFormErrors> {
  const errors: LoginFormErrors = {};

  const trimmedEmail = email ? email.trim() : "";

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
