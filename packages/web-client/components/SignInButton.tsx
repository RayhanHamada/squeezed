import { useModalData } from '@/lib/store';
import { Button, Text } from '@chakra-ui/react';
import React from 'react';

// type Props = {
//   onOpen(): void;
// };

export const SignInButton: React.FC = () => {
  const { signInOnOpen } = useModalData();
  return (
    <Button
      variant="outline"
      ringColor="white"
      size="sm"
      _hover={{ opacity: 0.7 }}
      onClick={signInOnOpen}
    >
      <Text color="white" cursor="pointer">
        Sign In
      </Text>
    </Button>
  );
};
