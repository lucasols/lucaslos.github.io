import React, { useState, useRef, ChangeEvent, FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ellipsis } from 'polished';
import { css } from '@emotion/core';

export type HandleChange = (
  value: string | number,
  isValid: boolean,
  id?: string,
) => void;

type Props = {
  label?: string;
  handleChange: HandleChange;
  handleIsValidChange?: (isValid: boolean, id?: string) => void;
  value: string | number;
  validations?: {
    regex?: RegExp;
    showErrorIfMatch?: boolean;
    errorMsg: string;
    validator?: (value: string) => boolean;
  }[];
  id?: string;
  width?: string;
  multiLine?: boolean;
  required?: boolean;
  hideErrors?: boolean;
  usePlaceholder?: boolean;
  maxlength?: number;
  additionalLeftPadding?: number;
  className?: string;
  autocomplete?: string;
  max?: number;
  lines?: number;
  step?: number;
  min?: number;
  type?: 'number' | 'text' | 'date' | 'password' | 'email';
  timeout?: number;
  forceRequiredErrorMsg?: boolean;
  requiredErrorMsg?: string;
  minErrorMsg?: string;
  maxErrorMsg?: string;
};

const Container = styled.div`
  width: 140px;

  * {
    transition: 160ms;
  }
`;

const labelOnTop = css`
  font-size: 14px;
  top: -7px;
  left: 7px;
`;

const Label = styled.label<{ notEmpty: boolean }>`
  position: absolute;
  top: 12px;
  left: 9px;
  padding: 0 6px;
  height: 18px;

  font-size: 16px;
  letter-spacing: 0.0125em;
  color: rgba(45, 58, 64, 0.3);

  background: #fff;
  ${ellipsis()};
  pointer-events: none;

  ${p => p.notEmpty && labelOnTop};

  input:focus + & {
    ${labelOnTop};

    color: #2d3a40;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;

  color: #2d3a40;
  font-size: 16px;
  letter-spacing: 0.0125em;

  background-color: #fff;
  border-radius: 3px;
  border: 1px solid rgba(116, 130, 150, 0.2);
  outline: none;

  &:focus {
    border: 1px solid #326fff;
  }
`;

const ValidationError = styled.div<{ show: boolean }>`
  height: 24px;
  width: 225px;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  margin-top: -3px;
  padding-left: 15px;
  padding-top: 8px;
  background: #f0175c;
  opacity: ${p => (p.show ? 1 : 0)};
  letter-spacing: 0.0125em;
  border-radius: 0px 0px 4px 4px;
`;

const TextField: FunctionComponent<Props> = ({
  label,
  max,
  id,
  min,
  step,
  value = '',
  required,
  validations,
  handleChange,
  maxlength = 300,
  hideErrors,
  forceRequiredErrorMsg,
  width = '280px',
  type = 'text',
  autocomplete,
  usePlaceholder = false,
  requiredErrorMsg = `This field can't be blank!`,
  minErrorMsg = 'The value must be higher than',
  maxErrorMsg = 'The value must be less than',
}) => {
  const [isValid, setIsValid] = useState(true);
  const [displayError, setDisplayError] = useState<string[]>([]);
  const inputId = useRef(`${Date.now() + Math.random()}`);

  function checkIfIsValid(inputValue: string | number) {
    const inputLenght = `${inputValue}`.trim().length;
    let fieldIsValid = true;
    let errorMsg: typeof displayError = [];

    if (required && inputLenght === 0) {
      fieldIsValid = false;
      errorMsg = [requiredErrorMsg];
    } else if (max && inputLenght > max) {
      fieldIsValid = false;
      errorMsg = [maxErrorMsg];
    } else if (min && inputLenght < min) {
      fieldIsValid = false;
      errorMsg = [minErrorMsg];
    } else if (validations) {
      errorMsg = validations
        .filter(item => {
          const matched = item.regex
            ? item.regex.test(`${inputValue}`)
            : item.validator && item.validator(`${inputValue}`);

          return item.showErrorIfMatch ? matched : !matched;
        })
        .map(elem => elem.errorMsg);

      fieldIsValid = errorMsg.length === 0;
    }

    setDisplayError(errorMsg);
    setIsValid(fieldIsValid);

    return fieldIsValid;
  }

  function updateValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value: inputValue } = event.target;
    const parsedInputValue =
      type === 'number' ? parseFloat(inputValue) : inputValue;
    const newValueIsValid = checkIfIsValid(parsedInputValue);

    handleChange(parsedInputValue, newValueIsValid, id);
  }

  const errors = [
    ...displayError,
    ...(forceRequiredErrorMsg && !displayError.includes(requiredErrorMsg)
      ? [requiredErrorMsg]
      : []),
  ];

  return (
    <Container css={{ width }} className="text-field-container">
      <div css={{ position: 'relative', zIndex: 5 }}>
        <Input
          type={type}
          max={max}
          min={min}
          step={step}
          id={inputId.current}
          value={value}
          autoComplete={autocomplete}
          onBlur={updateValue}
          onChange={updateValue}
          maxLength={maxlength}
          placeholder={usePlaceholder && label ? label : undefined}
        />
        {label && !usePlaceholder && (
          <Label
            htmlFor={inputId.current}
            notEmpty={value !== ''}
          >
            {label}
          </Label>
        )}
      </div>
      <ValidationError
        show={!hideErrors && (forceRequiredErrorMsg || !isValid)}
      >
        {errors
          ? errors.map((error, i) => [
            <span key={i}>{error}</span>,
              i < errors.length ? <br key={i} /> : undefined,
            ])
          : undefined}
      </ValidationError>
    </Container>
  );
};

export default TextField;
