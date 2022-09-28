import { Input, Legend, Error, Box } from './inputStyles';

export const InputContainer = ({ type, placeholder, id, legend }) => {
  return (
    <Box>
      <Legend htmlFor={id}>{legend}</Legend>
      <Input id={id} type={type} placeholder={placeholder} />
      {/* <Error>{error}</Error> */}
    </Box>
  );
};
