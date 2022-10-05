import { Input, Textarea, Legend, Error, Box } from './inputStyles';

export const InputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
      <Input id={id} type={type} placeholder={placeholder} />
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
