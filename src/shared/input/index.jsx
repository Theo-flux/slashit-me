import {
  Input,
  Textarea,
  Select,
  Legend,
  Error,
  Box,
  BoxRow,
  Prefix,
} from './inputStyles';

export const InputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend for={id}>{legend}</Legend>
      <Input id={id} type={type} placeholder={placeholder} />
      {/* <Error>{error}</Error> */}
    </Box>
  );
};

export const TextAreaContainer = ({ id, legend, placeholder }) => {
  return (
    <Box>
      <Legend for={id}>{legend}</Legend>
      <Textarea rows={10} resi cols={50} id={id} placeholder={placeholder} />
    </Box>
  );
};

export const PhoneInputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend for={id}>{legend}</Legend>
      <BoxRow>
        <Prefix>+234</Prefix>
        <Input id={id} type={type} placeholder={placeholder} />
      </BoxRow>
      {/* <Error>{error}</Error> */}
    </Box>
  );
};

export const SelectContainer = ({ options, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend for={id}>{legend}</Legend>
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

export const Checker = () => {
  return (
    <main class="fancy">
      <label for="Cookies">
        <input
          id="Cookies"
          name="yaybox"
          type="checkbox"
          value="Cookies"
          checked
        />
        <span>Chocolate Chip Cookies</span>
      </label>
    </main>
  );
};
