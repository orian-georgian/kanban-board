import { useState, useEffect } from "react";

export default function useForm(initialValues, callback, validate) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    mutateFormState(initialValues);
  }, [initialValues]);

  function mutateFormState(values) {
    setValues((prevState) => ({ ...prevState, ...values }));
  }

  function clearError(key) {
    if (!!errors[key]) {
      const { [key]: _, ...currentErrors } = errors;

      setErrors(currentErrors);
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  }

  function handleChange({ persist, target: { name, value } }) {
    persist();
    mutateFormState({ [name]: value });
    clearError(name);
  }

  function handleListItemChange({ persist, target: { name, value } }, id) {
    persist();

    setValues((prevState) => ({
      ...prevState,
      [name]: prevState[name].map((item) =>
        item.id === id ? { ...item, name: value } : item
      ),
    }));

    clearError(`${name}${id}`);
  }

  function resetForm() {
    setValues({});
    setErrors({});
    setIsSubmitting(false);
  }

  return {
    errors,
    values,
    handleChange,
    handleListItemChange,
    handleSubmit,
    mutateFormState,
    clearError,
    resetForm,
  };
}
