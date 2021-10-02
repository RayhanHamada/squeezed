import { Button, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { SignInModal } from './SignInModal';

export const SignInButton: React.FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <React.Fragment>
      <Button
        variant="outline"
        ringColor="white"
        size="sm"
        _hover={{ opacity: 0.7 }}
        onClick={onOpen}
      >
        <Text color="white" cursor="pointer">
          Sign In
        </Text>
      </Button>
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
