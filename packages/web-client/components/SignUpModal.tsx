import type { SignUpSchema } from '@/lib/formResolvers';
import { signUpResolver as resolver } from '@/lib/formResolvers';
import { useSignUpStore, useTheme } from '@/lib/store';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from 'react-icons/ai';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const SignUpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [passwordVisible, togglePasswordVisible] = useState(false);

  const toast = useToast({
    title: 'Success',
    description: 'Registration Success',
    duration: 3000,
    position: 'bottom',
    status: 'success',
  });

  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
  } = useForm<SignUpSchema>({
    resolver,
  });

  const { goSignUp, isLoading, loadingMsg, isError } = useSignUpStore();

  const onSubmit = handleSubmit(
    async ({ email, password, passwordConfirmation, username }) => {
      console.log('submitted');
      if (password !== passwordConfirmation) {
        setError('passwordConfirmation', {
          message: 'password confirmation not match with password !',
        });

        setValue('password', '');
        setValue('passwordConfirmation', '');
      }

      await goSignUp(username, email, password).then(() => {
        toast();
        reset();
      });
      return;
    },
    (errors) => {
      console.log(`isvalid ${isValid}`);
      console.log(errors);
    }
  );

  const handleShowPass: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    togglePasswordVisible((s) => !s);
  };

  const { isDark } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor={isDark ? 'black' : 'orange.500'}
        border="1px"
        borderTop="8px"
        borderRight="8px"
        borderColor="white"
        borderRadius="2em"
        p="8"
      >
        <ModalHeader textColor="white">Sign Up</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl
              id="username"
              isInvalid={Boolean(errors.username)}
              isDisabled={isSubmitting}
            >
              <FormLabel textColor="white">Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineMail color="white" />
                </InputLeftElement>
                <Input
                  type="text"
                  textColor="white"
                  placeholder="myAwesomeUsername"
                  borderTop="4px"
                  borderRight="4px"
                  _placeholder={{ opacity: 0.6, color: 'white' }}
                  {...register('username')}
                />
              </InputGroup>
              <FormErrorMessage textColor="red">
                {errors.username?.message}
              </FormErrorMessage>
            </FormControl>
            <Box h="8"></Box>
            <FormControl
              id="email"
              isInvalid={Boolean(errors.email)}
              isDisabled={isSubmitting}
            >
              <FormLabel textColor="white">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineMail color="white" />
                </InputLeftElement>
                <Input
                  type="email"
                  textColor="white"
                  placeholder="example.123@example.com"
                  borderTop="4px"
                  borderRight="4px"
                  _placeholder={{ opacity: 0.6, color: 'white' }}
                  {...register('email')}
                />
              </InputGroup>
              <FormErrorMessage textColor="red">
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <Box h="8"></Box>
            <FormControl
              id="password"
              isInvalid={Boolean(errors.password)}
              isDisabled={isSubmitting}
            >
              <FormLabel textColor="white">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineLock color="white" />
                </InputLeftElement>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Your Super Secret Password"
                  _placeholder={{ opacity: 0.6, color: 'white' }}
                  textColor="white"
                  borderTop="4px"
                  borderRight="4px"
                  {...register('password')}
                />
                <InputRightElement>
                  <IconButton
                    onClick={handleShowPass}
                    aria-label="Show Password"
                    icon={
                      passwordVisible ? (
                        <AiOutlineEyeInvisible size="1.5em" color="white" />
                      ) : (
                        <AiOutlineEye size="1.5em" color="white" />
                      )
                    }
                    bgColor="transparent"
                    h="1.75rem"
                    size="sm"
                    _hover={{
                      opacity: 0.7,
                    }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage textColor="red">
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>
            <Box h="8"></Box>
            <FormControl
              id="passwordConfirmation"
              isInvalid={Boolean(errors.passwordConfirmation)}
              isDisabled={isSubmitting}
            >
              <FormLabel textColor="white">Password Confirmation</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineLock color="white" />
                </InputLeftElement>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Must be the same as above"
                  _placeholder={{ opacity: 0.6, color: 'white' }}
                  textColor="white"
                  borderTop="4px"
                  borderRight="4px"
                  {...register('passwordConfirmation')}
                />
                <InputRightElement>
                  <IconButton
                    onClick={handleShowPass}
                    aria-label="Show Password Confirmation"
                    icon={
                      passwordVisible ? (
                        <AiOutlineEyeInvisible size="1.5em" color="white" />
                      ) : (
                        <AiOutlineEye size="1.5em" color="white" />
                      )
                    }
                    bgColor="transparent"
                    h="1.75rem"
                    size="sm"
                    _hover={{
                      opacity: 0.7,
                    }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage textColor="red">
                {errors.passwordConfirmation?.message}
              </FormErrorMessage>
            </FormControl>
            <Box h="8"></Box>
            <Button
              w="full"
              isLoading={isSubmitting}
              type="submit"
              _hover={{ opacity: 0.7 }}
              isDisabled={isSubmitting}
            >
              Sign Up
            </Button>
          </form>
          {isLoading ? (
            <Flex flexDir="column" alignItems="center">
              <Text textColor={isError ? 'red' : 'white'}>{loadingMsg}</Text>
            </Flex>
          ) : undefined}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
