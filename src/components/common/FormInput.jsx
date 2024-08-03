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
  styles = {},
  ...rest
}) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      width="100%"
      boxShadow={shadow}
    >
      <FormLabel color="teal.500" fontWeight="bold" bg="gray.100">{label}</FormLabel>
      {textArea ? (
        <Textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
          {...styles}
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value === "file" ? undefined : value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
          {...styles}
          {...(type === "file" && { accept: "image/*" })}
        />
      )}
    </FormControl>
  );
};
export default FormInput