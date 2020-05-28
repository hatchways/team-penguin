import { useState, useEffect } from 'react';


const useForm = (submitCallback, validate) => {
  const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '', language: 'english'});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = event => {
    const { name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmitting) {
      submitCallback();
    }
  }, [formErrors]);

  return {
    handleChange,
    handleSubmit,
    formValues,
    formErrors
  }
}

export default useForm;