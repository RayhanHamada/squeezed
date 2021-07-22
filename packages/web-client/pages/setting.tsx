import { UserSettingForm } from '@/components/UserSettingForm';
import { Box, Container, Divider, Text } from '@chakra-ui/react';
import React from 'react';

export default function Setting() {
  return (
    <Container
      maxW="full"
      h={{ base: '120vh', md: '100vh', lg: '100vh' }}
      px="16"
      py="8"
      //   marginX="0"
      bgColor="black"
    >
      <Text textColor="white" fontSize="2xl">
        User Setting
      </Text>
      <Divider color="white" />
      <Box h="8" />
      <UserSettingForm />
    </Container>
  );
}
