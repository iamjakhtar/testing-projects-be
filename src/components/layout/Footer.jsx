import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      bg="teal.500"
      p={4}
      pos="absolute"
      bottom={0}
      right={0}
      left={0}
      w="98%"
      align="center"
      mt={4}
      mx="auto"
    >
      <Text color="white">Copy Righted Stuff</Text>
    </Flex>
  );
};
export default Footer;
