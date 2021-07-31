import { fb } from '@/lib/firebase-client';
import {
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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { createRef, MouseEventHandler, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from 'react-icons/ai';
import * as yup from 'yup';

type FormField = {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
};

const formFieldSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password required'),
  newPassword: yup.string().min(6).required('new password required'),
  confirmationPassword: yup
    .string()
    .min(6)
    .required('new password confirmation required'),
});

type Props = {
  isDisabled: boolean;
};

export const PasswordChangeModal: React.FC<Props> = ({ isDisabled }: Props) => {
  const firstFieldRef = createRef<HTMLInputElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, loading, error] = useAuthState(fb.auth());

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] =
    useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<FormField>({
    resolver: yupResolver(formFieldSchema),
  });

  const onSubmit = handleSubmit(
    async ({ oldPassword, newPassword, confirmationPassword }) => {
      if (oldPassword == '') {
        setError('oldPassword', {
          message: 'Old password cannot be empty',
        });

        return;
      }

      if (newPassword !== confirmationPassword) {
        setError('confirmationPassword', {
          message: 'Invalid Confirmation Password',
        });

        return;
      }

      await user?.updatePassword(newPassword);
    },
    (errors) => {
      console.log(errors);
    }
  );

  const toggleOldPassword: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const toggleNewPassword: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmNewPassword: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setConfirmationPasswordVisible(!confirmationPasswordVisible);
  };

  const onCloseAndReset = () => {
    setOldPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmationPasswordVisible(false);
    onClose();
  };

  return (
    <>
      <Button
        variant="outline"
        textColor="white"
        w="full"
        _hover={{ bgColor: 'transparent', opacity: 0.7 }}
        onClick={onOpen}
        disabled={isDisabled}
      >
        Change Password
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onCloseAndReset}
        initialFocusRef={firstFieldRef}
      >
        <ModalOverlay />
        <ModalContent bgColor="black" border="1px" borderColor="white">
          <form onSubmit={onSubmit}>
            <ModalHeader textColor="white">Change Password</ModalHeader>
            <ModalCloseButton
              color="white"
              border="1px"
              borderColor="white"
              disabled={isSubmitting}
            />
            <ModalBody>
              <VStack spacing="4">
                <FormControl
                  isInvalid={Boolean(errors.oldPassword)}
                  isDisabled={isSubmitting}
                >
                  <FormLabel textColor="white">Old Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineLock color="white" />
                    </InputLeftElement>
                    <Input
                      type={oldPasswordVisible ? 'text' : 'password'}
                      placeholder="Your Super Secret Old Password"
                      _placeholder={{ opacity: 0.9 }}
                      textColor="white"
                      border="2px"
                      borderTop="4px"
                      borderRight="4px"
                      {...register('oldPassword')}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={toggleOldPassword}
                        aria-label="Show Old Password"
                        icon={
                          oldPasswordVisible ? (
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
                  <FormErrorMessage>
                    {errors.oldPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.newPassword)}
                  isDisabled={isSubmitting}
                >
                  <FormLabel textColor="white">New Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineLock color="white" />
                    </InputLeftElement>
                    <Input
                      type={newPasswordVisible ? 'text' : 'password'}
                      placeholder="Your Super Secret New Password"
                      _placeholder={{ opacity: 0.9 }}
                      textColor="white"
                      border="2px"
                      borderTop="4px"
                      borderRight="4px"
                      {...register('newPassword')}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={toggleNewPassword}
                        aria-label="Show New Password"
                        icon={
                          newPasswordVisible ? (
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
                  <FormErrorMessage>
                    {errors.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.confirmationPassword)}
                  isDisabled={isSubmitting}
                >
                  <FormLabel textColor="white">Confirm Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineLock color="white" />
                    </InputLeftElement>
                    <Input
                      aria-label="Show Password Confirmation"
                      type={confirmationPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      _placeholder={{ opacity: 0.9 }}
                      textColor="white"
                      border="2px"
                      borderTop="4px"
                      borderRight="4px"
                      {...register('confirmationPassword')}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={toggleConfirmNewPassword}
                        aria-label="Show Password"
                        icon={
                          confirmationPasswordVisible ? (
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
                  <FormErrorMessage>
                    {errors.confirmationPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                colorScheme="green"
                mr={3}
                type="submit"
                isDisabled={isSubmitting}
              >
                Confirm
              </Button>
              <Button
                colorScheme="white"
                onClick={onCloseAndReset}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
