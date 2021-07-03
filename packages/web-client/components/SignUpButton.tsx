import { useModalData } from '@/lib/store';
import { Button, Text } from '@chakra-ui/react';
import React from 'react';

export const SignUpButton: React.FC = (_props) => {
  const onOpen = useModalData((sel) => sel.signUpOnOpen);
  return (
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
  );
};
