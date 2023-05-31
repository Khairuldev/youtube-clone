import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Spiner = () => {
  return (
    <Flex alignItems="center" w="full" justifyContent="center" py={3}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red"
        size="xl"
      />
    </Flex>
  );
};

export default Spiner;
