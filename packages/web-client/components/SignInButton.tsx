import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export const SignInButton: React.FC = (_props) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      ringColor="white"
      size="sm"
      _hover={{ opacity: 0.7 }}
      onClick={(e) => {
        e.preventDefault();

        router.push('/signin');
      }}
    >
      <Text color="white" cursor="pointer">
        Sign In
      </Text>
    </Button>
  );
};
