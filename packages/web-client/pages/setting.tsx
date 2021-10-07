import { UserSettingForm } from '@/components/UserSettingForm';
import { useTheme } from '@/lib/store';
import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { MouseEventHandler } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export default function Setting() {
  const router = useRouter();

  const onClickBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.back();
  };

  const { isDark } = useTheme();

  return (
    <Container
      maxW="full"
      h={{ base: '120vh', md: '100vh', lg: '100vh' }}
      px="16"
      py="8"
      bgColor={isDark ? 'black' : 'orange.500'}
    >
      <HStack>
        <Button
          leftIcon={<AiOutlineArrowLeft />}
          bgColor="transparent"
          borderColor="white"
          borderWidth="thin"
          textColor="white"
          variant="solid"
          _hover={{ opacity: 0.7 }}
          onClick={onClickBack}
        >
          Back
        </Button>
      </HStack>
      <Box h="8" />
      <Text textColor="white" fontSize="2xl">
        User Setting
      </Text>
      <Divider color="white" />
      <Box h="8" />
      <UserSettingForm />
    </Container>
  );
}
