import { Box, keyframes } from "@chakra-ui/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box position="relative" width="100px" height="100px">
        {/* Outer Circle */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="50%"
          border="8px solid rgba(0, 255, 255, 0.3)"
          borderTopColor="teal.500"
          animation={`${spin} 1.5s linear infinite`}
        />

        {/* Inner Circle */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="50%"
          border="8px solid rgba(255, 105, 180, 0.3)"
          borderTopColor="pink.500"
          animation={`${spin} 1.5s linear infinite reverse`}
        />
      </Box>
    </Box>
  );
};

export default Spinner;
