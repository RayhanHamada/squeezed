import { PasswordChangeModal } from '@/components/PasswordChangeModal';
import { fb } from '@/lib/firebase-client';
import type { UserSettingSchema } from '@/lib/formResolvers';
import { userSettingResolver as resolver } from '@/lib/formResolvers';
import { useUserDataStore } from '@/lib/store';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

export const UserSettingForm = () => {
  const [user, authLoading] = useAuthState(fb.auth());

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<UserSettingSchema>({
    resolver,
  });

  const { updateUsername } = useUserDataStore();

  const onSubmit = handleSubmit(
    async ({ username }) => {
      await updateUsername(username);
    },
    (errors) => {
      console.log(errors);
    }
  );

  if (authLoading) {
    return <div></div>;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <VStack spacing="4" alignItems="self-start">
          <FormControl
            w={{ base: 'full', md: '50%', lg: '30%' }}
            isDisabled={isSubmitting}
            isInvalid={Boolean(errors.username)}
          >
            <FormLabel textColor="white">Username</FormLabel>
            <Input
              type="text"
              textColor="white"
              defaultValue={user?.displayName ?? ''}
              {...register('username')}
            />
            <FormErrorMessage textColor="red">
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl w={{ base: 'full', md: '50%', lg: '30%' }} isReadOnly>
            <FormLabel textColor="white">Email</FormLabel>
            <Input
              type="text"
              textColor="white"
              value={user?.email ?? ''}
              isDisabled
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl w={{ base: 'full', md: '50%', lg: '30%' }} isReadOnly>
            <FormLabel textColor="white">UID</FormLabel>
            <Input
              type="text"
              textColor="white"
              value={user?.uid ?? ''}
              isDisabled
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            w={{ base: 'full', md: '50%', lg: '30%' }}
            isLoading={isSubmitting}
            _hover={{ opacity: 0.7 }}
            disabled={isSubmitting}
          >
            Save
          </Button>
          <Box w={{ base: 'full', md: '50%', lg: '30%' }}>
            <PasswordChangeModal isDisabled={isSubmitting} />
          </Box>
        </VStack>
      </form>
    </>
  );
};
