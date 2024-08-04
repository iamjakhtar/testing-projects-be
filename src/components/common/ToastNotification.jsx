import { CheckCircleIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Heading, useToast, Text } from "@chakra-ui/react";

const ToastNotification = ({
  title,
  description,
  status = "info",
  position = "bottom-left",
}) => {
  const toast = useToast();
  toast({
    //@ts-ignore
    position: position,
    render: () => (
      <Box
        color={"white"}
        bg={status === "info" || status === "success" ? "green.500" : "red.500"}
        p={2}
      >
        <Heading size="m" color="white">
          {" "}
          {status === "info" || status === "success" ? (
            <CheckCircleIcon mr={2} mt={-1} color="white" />
          ) : (
            <InfoOutlineIcon mr={2} mt={-1} />
          )}
        {title}
        </Heading>
        <Text>{`${description}`}</Text>
      </Box>
    ),
    isClosable: true,
    duration: 4000,
  });
  return null;
};
export default ToastNotification;
