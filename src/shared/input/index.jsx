import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormatCardNumber,
  FormatExpirationDate,
} from '../../helpers/debitCardValidator';
import { setFirstname, setLastname } from '../../store/reducers/auth';
import {
  setCardCvv,
  setCardExpiry,
  setCardNumber,
} from '../../store/reducers/helper';
import {
  Input,
  InputCheck,
  OtpInput,
  StyledImage,
  Textarea,
  Select,
  Error,
  Box,
  BoxRow,
  Prefix,
  Label,
} from './inputStyles';

export const InputContainer = ({
  maxlength,
  name,
  type,
  placeholder,
  id,
  legend,
  prefix,
  onChange,
  error,
  //value,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  function ONChange(value) {
    if (id == 'first_name') {
      setInput(value);
      dispatch(setFirstname(value));
      return;
    }
    if (id == 'last_name') {
      setInput(value);
      dispatch(setLastname(value));
      return;
    }
  }

  return (
    <Box>
      <Label htmlFor={id}>{legend}</Label>
      <BoxRow error={error}>
        {prefix && <Prefix>{prefix}</Prefix>}
        <Input
          error={error}
          id={id}
          //value={input}
          type={type}
          name={name}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={(e) => {
            if (id == 'first_name' || id == 'last_name') {
              ONChange(e.target.value);
            } else {
              setInput(e.target.value);
              onChange(e);
            }
          }}
        />
      </BoxRow>
      <Error>{error}</Error>
    </Box>
  );
};

export const TextAreaContainer = ({
  id,
  legend,
  placeholder,
  rows,
  cols,
  disabled,
}) => {
  return (
    <Box>
      <Label htmlFor={id}>{legend}</Label>
      <Textarea
        disabled
        rows={rows ? rows : 10}
        resi
        cols={cols ? cols : 5}
        id={id}
        placeholder={placeholder}
      />
    </Box>
  );
};

export const PhoneInputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Label htmlFor={id}>{legend}</Label>
      <BoxRow>
        <Prefix>+234</Prefix>
        <Input id={id} type={type} placeholder={placeholder} />
      </BoxRow>
      {/* <Error>{error}</Error> */}
    </Box>
  );
};

export const CardInputContainer = ({
  type,
  src,
  placeholder,
  id,
  legend,
  name,
  maxlength,
  error,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  function onChange(value) {
    if (id == 'card_number') {
      setInput(FormatCardNumber(value));
      dispatch(setCardNumber(FormatCardNumber(value)));
    }
    if (id == 'card_expiry') {
      setInput(FormatExpirationDate(value));
      dispatch(setCardExpiry(FormatExpirationDate(value)));
    }
    if (id == 'card_cvv') {
      setInput(value);
      dispatch(setCardCvv(value));
    }
  }

  return (
    <Box>
      <Label htmlFor={id}>{legend}</Label>
      <BoxRow error={error}>
        <StyledImage>
          <Image src={src} width={25} height={25} alt="card-image" />
        </StyledImage>
        <Input
          id={id}
          value={input}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxlength}
        />
      </BoxRow>
      <Error>{error}</Error>
    </Box>
  );
};

export const SelectContainer = ({ options, placeholder, id, legend }) => {
  return (
    <Box>
      <Label htmlFor={id}>{legend}</Label>
      <Select id={id} name={placeholder}>
        {options.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
      {/* <Error>{error}</Error> */}
    </Box>
  );
};

export const Checker = ({ content, check }) => {
  return (
    <label className="container">
      {content}
      <input onClick={check} type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
};

export const OtpInputContainer = ({ onChange, id, name }) => {
  return (
    <OtpInput
      type="text"
      id={id}
      name={name}
      maxLength={1}
      onChange={onChange}
    />
  );
};
