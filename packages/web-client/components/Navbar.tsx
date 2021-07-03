import { Box, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';
import { SqueezedLogo } from './SqueezedLogo';

export const Navbar: React.FC = (_props) => {
  return (
    <Flex
      w="full"
      bgColor="black"
      height="16"
      borderBottom="1px"
      borderColor="white"
      paddingX="8"
      position="fixed"
      zIndex="10"
    >
      <Center>
        <Flex alignItems="flex-end">
          <SqueezedLogo fontSize="2xl" />
          <Box w="2" />
          <Text textColor="white" fontSize="x-small">
            Shorten your URL within a second !
          </Text>
        </Flex>
      </Center>
      <Spacer />
      <Center>
        <SignInButton />
      </Center>
      <Center pl="4">
        <SignUpButton />
      </Center>
    </Flex>
  );
};
