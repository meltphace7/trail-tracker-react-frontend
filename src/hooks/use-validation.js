import { useState } from 'react';

const useValidation = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [valueWasTouched, setValueWasTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && valueWasTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

      const setValueHandler = (value) => {
        setEnteredValue(value);
      };

    const valueBlurHandler = (event) => {
        setValueWasTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setValueWasTouched(false);
    }

    return {
        enteredValue,
        valueIsValid,
        hasError,
        valueChangeHandler,
        setValueHandler,
        valueBlurHandler,
        reset
    }
}

export default useValidation
