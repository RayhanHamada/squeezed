import { fb } from '@/lib/firebase-client';
import { useBulkActionStore, useURLDataStore } from '@/lib/store';
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

export const BulkActionAlert: React.FC<Props> = ({ isOpen, onClose }) => {
  const cancelRef = createRef<HTMLButtonElement>();

  const [isLoading, setIsLoading] = useState(false);
  const { selectedURLDataIDs, resetURLDataStore: reset } = useURLDataStore();

  const { operation } = useBulkActionStore();

  const onThisClose = () => {
    onClose();
  };

  const enableLinks = async () => {
    selectedURLDataIDs.forEach(async (docID, idx) => {
      await fb
        .firestore()
        .collection('url_data')
        .doc(docID)
        .update({
          enabled: true,
        })
        .then(() => {
          if (idx === selectedURLDataIDs.length - 1) {
            setIsLoading(false);
            onThisClose();
            reset();
          }
        });
    });
  };

  const disableLinks = async () => {
    selectedURLDataIDs.forEach(async (docID, idx) => {
      await fb
        .firestore()
        .collection('url_data')
        .doc(docID)
        .update({
          enabled: false,
        })
        .then(() => {
          if (idx === selectedURLDataIDs.length - 1) {
            setIsLoading(false);
            onThisClose();
            reset();
          }
        });
    });
  };

  const removeLinks = () => {
    selectedURLDataIDs.forEach(async (docID, idx) => {
      await fb
        .firestore()
        .collection('url_data')
        .doc(docID)
        .delete()
        .then(() => {
          if (idx === selectedURLDataIDs.length - 1) {
            setIsLoading(false);
            onThisClose();
            reset();
          }
        });
    });
  };

  const doOperation = async () => {
    setIsLoading(true);
    switch (operation) {
      case 'enable':
        enableLinks();
        break;
      case 'disable':
        disableLinks();
        break;
      case 'delete':
        removeLinks();
        break;
      default:
        setIsLoading(false);
        return;
    }
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
        <AlertDialogHeader>{operation} Item ?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure to {operation} {selectedURLDataIDs.length} item ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onThisClose} isDisabled={isLoading}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={doOperation}
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
