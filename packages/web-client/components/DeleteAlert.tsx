import { fb } from '@/lib/firebase-client';
import { useDeleteStore } from '@/lib/store';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { createRef, useState } from 'react';

type Props = {
  onClose(): void;
  isOpen: boolean;
};

export const DeleteAlert: React.FC<Props> = ({ onClose, isOpen }) => {
  const cancelRef = createRef<HTMLButtonElement>();
  const [isLoading, setIsLoading] = useState(false);

  const { itemID, setItemID } = useDeleteStore();

  const onThisClose = () => {
    setItemID('');
    onClose();
  };

  const deleteItem = async () => {
    setIsLoading(true);
    await fb
      .firestore()
      .collection('url_data')
      .doc(itemID)
      .delete()
      .then(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent opacity={isLoading ? 0.7 : 1}>
        <AlertDialogHeader>Delete Item ?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Are you sure to delete item ?</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onThisClose} isDisabled={isLoading}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={deleteItem}
            ref={cancelRef}
            isDisabled={isLoading}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
