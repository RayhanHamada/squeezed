import { usePasswordChangeStore, useUserDataStore } from '@/lib/store';
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';

type Props = {
  isDisabled: boolean;
};

export const PasswordChangeModal: React.FC<Props> = ({ isDisabled }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * store
   */
  const { email } = useUserDataStore();

  const {
    sendPasswordChangeRequest,
    disableSendResetCodeTemporary,
    resetRequestEnabled,
  } = usePasswordChangeStore();

  const resetRequestSentToast = useToast({
    title: 'Reset Request Sent !',
    description: `Reset request sent to ${email}. Please check your email.`,
    duration: 3000,
    status: 'info',
    variant: 'solid',
    position: 'bottom',
  });

  const requestChangeOnClick: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    disableSendResetCodeTemporary();
    await sendPasswordChangeRequest().then((success) => {
      if (success) {
        resetRequestSentToast();
        return;
      }

      resetRequestSentToast({
        title: 'Error',
        description: `Error sending reset code to ${email}`,
        status: 'error',
        variant: 'solid',
      });
    });
  };

  const onCloseAndReset = () => {
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
      <Modal isOpen={isOpen} onClose={onCloseAndReset}>
        <ModalOverlay />
        <ModalContent bgColor="black" border="1px" borderColor="white">
          <ModalCloseButton color="white" border="1px" borderColor="white" />
          <ModalHeader textColor="white">Change Password</ModalHeader>
          <VStack alignItems="center" spacing="4" pb="4">
            <Button
              textColor="white"
              variant="outline"
              disabled={!resetRequestEnabled}
              _hover={{ opacity: 0.7 }}
              onClick={requestChangeOnClick}
            >
              Request for password change
            </Button>
            <Text
              fontSize="x-small"
              textColor="white"
              visibility={resetRequestEnabled ? 'hidden' : 'visible'}
            >
              You will be able to request another for password change in 30
              seconds
            </Text>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
