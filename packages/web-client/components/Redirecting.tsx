import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

export const Redirecting: React.FC = (props) => {
  return (
    <Container
      maxW="full"
      h={{ base: '120vh', md: 'full', lg: '100vh' }}
      p="0"
      marginX="0"
      bgColor="black"
    >
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Text textColor="white" textAlign="center">
          Redirecting...
        </Text>
        <Spinner color="white" />
      </Flex>
    </Container>
  );
};
