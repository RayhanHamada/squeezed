import { isDev } from '@/global';
import { fb } from '@/lib/firebase-client';
import type { EditLink } from '@/lib/formResolvers';
import { editLinkResolver as resolver } from '@/lib/formResolvers';
import { URLData } from '@/lib/model-types';
import { useEditLinkStore } from '@/lib/store';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { createRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const EditLinkModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();

  const { currentURLID, reset: resetURLID } = useEditLinkStore();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<EditLink>({ resolver });

  useEffect(() => {
    if (currentURLID !== '') {
      fb.firestore()
        .collection('url_data')
        .doc(currentURLID)
        .get()
        .then((doc) => {
          const urlData = {
            id: doc.id,
            ...doc.data(),
          } as URLData;

          setValue('title', urlData.title);
          setValue('refURL', urlData.ref_url);
        });
    }
  }, [currentURLID, setValue]);

  const onSubmit = handleSubmit(
    async ({ refURL, title }) => {
      if (isDev) {
        console.log({ refURL, title });
      }

      await fb
        .firestore()
        .collection('url_data')
        .doc(currentURLID)
        .update({
          title: title,
          ref_url: refURL,
        } as Partial<URLData>)
        .then(() => {
          onThisClose();
        });
    },
    (errors) => {
      if (isDev) {
        console.log(errors);
      }
    }
  );

  const onThisClose = () => {
    onClose();
    resetURLID();
    console.log(currentURLID);
  };

  return (
    <Modal initialFocusRef={firstField} isOpen={isOpen} onClose={onThisClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Link</ModalHeader>
        <ModalCloseButton onClick={onThisClose} />
        <ModalBody pb={6}>
          <form>
            <VStack spacing="16px">
              <FormControl isDisabled={isSubmitting}>
                <FormLabel>Link Title</FormLabel>
                <Input
                  type="text"
                  border="1px"
                  borderColor="black"
                  placeholder="No Title"
                  {...register('title')}
                />
                <FormHelperText>Optional.</FormHelperText>
              </FormControl>
              <FormControl isDisabled={isSubmitting}>
                <Box>
                  <Textarea
                    placeholder="Paste Your Loooooooooooong link here"
                    h="32"
                    border="1px"
                    borderTop="4px"
                    borderRight="4px"
                    borderColor="black"
                    {...register('refURL')}
                  />
                  <Text textColor="red" fontSize="sm">
                    {errors.refURL?.message}
                  </Text>
                </Box>
              </FormControl>
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter>
          {isSubmitting ? <Spinner color="black" /> : undefined}
          <Button
            onClick={onSubmit}
            colorScheme="blue"
            mr={3}
            isDisabled={isSubmitting}
          >
            Save update.
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
