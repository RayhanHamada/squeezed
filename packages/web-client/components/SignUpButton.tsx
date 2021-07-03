import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export const SignUpButton: React.FC = (_props) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      ringColor="white"
      size="sm"
      _hover={{ opacity: 0.7 }}
      onClick={(e) => {
        e.preventDefault();

        router.push('/signup');
      }}
    >
      <Text color="white" cursor="pointer">
        Sign Up
      </Text>
    </Button>
  );
};
