import {
  Box,
  Button,
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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from 'react-icons/ai';
import * as yup from 'yup';

type FormFieldValue = {
  email: string;
  password: string;
};

const formFieldSchema = yup.object().shape({
  email: yup.string().email().required('Email required'),
  password: yup.string().required('Password required'),
});

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [passwordVisible, togglePasswordVisible] = useState(false);
  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
  } = useForm<FormFieldValue>({
    resolver: yupResolver(formFieldSchema),
  });

  const handleShowPass: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    togglePasswordVisible((s) => !s);
  };

  const onSubmit = handleSubmit(
    async (data) => {
      console.log(`isvalid ${isValid}`);
      console.log(`${data.email} ${data.password}`);
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
            <FormControl id="email" isInvalid={Boolean(errors.email)}>
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
                  _placeholder={{ opacity: 0.7 }}
                  {...register('email')}
                />
              </InputGroup>
              <FormErrorMessage textColor="red">
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <Box h="8"></Box>
            <FormControl id="password" isInvalid={Boolean(errors.password)}>
              <FormLabel textColor="white">Password</FormLabel>
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
              disabled={!isValid}
            >
              Sign In
            </Button>
          </form>
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
