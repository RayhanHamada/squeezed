import { Button, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { SignUpModal } from './SignUpModal';

export const SignUpButton: React.FC = () => {
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
          Sign Up
        </Text>
      </Button>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
