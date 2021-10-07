import { useTheme } from '@/lib/store';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { SignUpModal } from './SignUpModal';

export const SignUpButton: React.FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { isDark } = useTheme();
  return (
    <React.Fragment>
      <Button
        variant="outline"
        ringColor={isDark ? 'white' : 'black'}
        size="sm"
        _hover={{ opacity: 0.7 }}
        onClick={onOpen}
      >
        <Text color={isDark ? 'white' : 'black'} cursor="pointer">
          Sign Up
        </Text>
      </Button>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
