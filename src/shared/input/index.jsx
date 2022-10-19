import Image from 'next/image';
import {
  Input,
  InputCheck,
  OtpInput,
  StyledImage,
  Textarea,
  Select,
  Legend,
  Error,
  Box,
  BoxRow,
  Prefix,
  FormGroup,
  FormCheck,
  Label,
} from './inputStyles';

export const InputContainer = ({ maxlength, type, placeholder, id, legend, error }) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
      <Input id={id} type={type} placeholder={placeholder} maxLength={maxlength}/>
      {/* <Error>{error}</Error> */}
    </Box>
  );
};

export const TextAreaContainer = ({ id, legend, placeholder }) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
      <Textarea rows={10} resi cols={50} id={id} placeholder={placeholder} />
    </Box>
  );
};

export const PhoneInputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
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
  value,
  onChange,
  maxlength,
  error,
}) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
      <BoxRow error={error}>
        <StyledImage>
          <Image src={src} width={40} height={40} alt="card-image" />
        </StyledImage>
        <Input
          id={id}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
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
      <Legend htmlFor={id}>{legend}</Legend>
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

export const Checker = ({ content }) => {
  return (
    <label class="container">
      {content}
      <input type="checkbox" />
      <span class="checkmark"></span>
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
