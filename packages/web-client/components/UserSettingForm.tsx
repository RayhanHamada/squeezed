import { fb } from '@/lib/firebase-client';
import { useUserDataStore } from '@/lib/store';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormField = {
  username: string;
};

const formSchema = yup.object().shape({
  username: yup.string().min(1).required(),
});

export const UserSettingForm = () => {
  const [user, authLoading] = useAuthState(fb.auth());

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
  } = useForm<FormField>({
    resolver: yupResolver(formSchema),
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
    <form onSubmit={onSubmit}>
      <VStack spacing="4" alignItems="self-start">
        <FormControl
          w={{ base: 'full', md: '50%', lg: '25%' }}
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
        <FormControl w={{ base: 'full', md: '50%', lg: '25%' }} isReadOnly>
          <FormLabel textColor="white">Email</FormLabel>
          <Input
            type="text"
            textColor="white"
            value={user?.email ?? ''}
            isDisabled
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl w={{ base: 'full', md: '50%', lg: '25%' }} isReadOnly>
          <FormLabel textColor="white">UID</FormLabel>
          <Input
            type="text"
            textColor="white"
            value={user?.uid ?? ''}
            isDisabled
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>

        <Button type="submit" isLoading={isSubmitting}>
          Save
        </Button>
      </VStack>
    </form>
  );
};
