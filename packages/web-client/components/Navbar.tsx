import { Center, Flex, Spacer } from '@chakra-ui/react';
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
        <SqueezedLogo fontSize="2xl" />
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
