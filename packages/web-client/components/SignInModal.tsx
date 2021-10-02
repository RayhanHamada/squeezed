import { fb } from '@/lib/firebase-client';
import type { SignInSchema } from '@/lib/formResolvers';
import { signInResolver as resolver } from '@/lib/formResolvers';
import {
  Box,
  Button,
  Center,
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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
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

export const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [passwordVisible, togglePasswordVisible] = useState(false);

  const [signIn, , loading, error] = useSignInWithEmailAndPassword(fb.auth());

  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver,
  });

  const handleShowPass: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    togglePasswordVisible((s) => !s);
  };

  const onSubmit = handleSubmit(
    async ({ email, password }) => {
      signIn(email, password);
    },
    (errors) => {
      console.log(`isvalid ${isValid}`);
      console.log(errors);
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="black"
        border="1px"
        borderTop="8px"
        borderRight="8px"
        borderColor="white"
        borderRadius="2em"
        p="8"
      >
        <ModalHeader textColor="white">Welcome Back</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl
              id="email"
              isInvalid={Boolean(errors.email)}
              isDisabled={loading}
            >
              <FormLabel textColor="white" htmlFor="email">
                Email
              </FormLabel>
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
                  _placeholder={{ opacity: 0.7 }}
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
              isDisabled={loading}
            >
              <FormLabel textColor="white" htmlFor="password">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineLock color="white" />
                </InputLeftElement>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Your Super Secret Password"
                  _placeholder={{ opacity: 0.6 }}
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
            <Button
              w="full"
              isLoading={isSubmitting}
              type="submit"
              _hover={{ opacity: 0.7 }}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>

          <Center mt="4">
            <Text textColor="red">
              {error?.message ? 'The password is invalid' : ''}
            </Text>
          </Center>
          <Center mt="4">
            {loading ? <Spinner color="white" /> : undefined}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
