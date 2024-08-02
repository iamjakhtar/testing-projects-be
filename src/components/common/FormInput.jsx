import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

const FormInput = ({
  id,
  label,
  type = "text",
  textArea = false,
  name,
  value = undefined,
  placeholder = "",
  handleChange,
  isRequired = false,
  shadow,
  ...rest
}) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      width="100%"
      boxShadow={shadow}
    >
      <FormLabel >{label}</FormLabel>
      {textArea ? (
        <Textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value === 'file' ? undefined : value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
          { ...(type === 'file' && { accept: "image/*"})}
        />
      )}
    </FormControl>
  );
};
export default FormInput