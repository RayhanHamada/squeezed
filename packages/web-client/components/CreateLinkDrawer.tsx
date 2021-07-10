import { useCreateLinkStore } from '@/lib/store';
import { urlRegex } from '@/lib/utils';
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { createRef, MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaClipboard } from 'react-icons/fa';
import * as yup from 'yup';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

type FormField = {
  title: string;
  refURL: string;
  expireTime?: number;
  enabled: boolean;
};

const schema = yup.object().shape({
  title: yup.string().optional().default('No Title'),
  refURL: yup.string().matches(urlRegex, { message: 'Invalid URL' }).required(),
  expireTime: yup.number().min(1).optional(),
  enabled: yup.bool().default(true),
});

export const CreateLinkDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();
  const [isPermanent, setIsPermanent] = useState(true);

  const { reset, fetchUUID, generatedCode } = useCreateLinkStore();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    reset: resetFormState,
  } = useForm<FormField>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  const onSubmit = handleSubmit(
    async ({ title, refURL, enabled, expireTime }) => {
      await fetchUUID(refURL, enabled, title, expireTime);
    },
    (errors) => {
      console.log(errors);
    }
  );

  /**
   * expand size drawer
   */
  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    setExpanded(!isExpanded);
  };

  const toast = useToast({
    description: `Link copied !`,
    title: 'Copied !',
    status: 'info',
    duration: 2000,
    position: 'bottom',
  });

  const copy = () => {
    navigator.clipboard.writeText(getValues().refURL);
    toast();
  };

  const onDrawerClose = () => {
    onClose();
    resetForm();
    setIsPermanent(true);
  };

  const resetForm = () => {
    reset();
    resetFormState();
  };

  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      onClose={onDrawerClose}
      size={isExpanded ? 'xl' : 'sm'}
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton border="1px" />
        <DrawerHeader borderBottomWidth="1px" borderBottomColor="black">
          Create Link
        </DrawerHeader>

        <DrawerBody maxH="full">
          <Flex flexDir="column" alignItems="stretch" justifyContent="center">
            <form onSubmit={onSubmit}>
              <Stack spacing="16px">
                <Button
                  size="xs"
                  onClick={toggleExpanded}
                  variant="outline"
                  borderTop="4px"
                  borderRight="4px"
                  borderColor="black"
                  w="32"
                >
                  {isExpanded ? 'Too big...' : 'More room please...'}
                </Button>
                <FormControl isDisabled={isSubmitting}>
                  <FormLabel>Link Title</FormLabel>
                  <Input
                    type="text"
                    border="1px"
                    borderColor="black"
                    placeholder="No Title"
                    {...register('title')}
                  />
                  <FormHelperText>
                    Optional. By default title would be named &ldquo;No
                    Title&ldquo;
                  </FormHelperText>
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
                      {/* {isRefURLValid ? '' : 'URL seems to be wrong ;('} */}
                      {errors.refURL?.message}
                    </Text>
                  </Box>
                </FormControl>

                <FormControl>
                  <FormLabel>Is Permanent ?</FormLabel>
                  <RadioGroup
                    value={isPermanent ? 'permanent' : 'expires_in'}
                    onChange={() => {
                      console.log(!isPermanent);
                      setIsPermanent(!isPermanent);
                    }}
                    colorScheme="green"
                  >
                    <VStack alignItems="start">
                      <Radio value="permanent">Permanent</Radio>
                      <Radio value="expires_in">Expires in</Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>

                <FormControl isDisabled={isPermanent}>
                  <NumberInput defaultValue={1} min={1}>
                    <NumberInputField {...register('expireTime')} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <HStack alignItems="center">
                    <Switch
                      colorScheme="green"
                      {...register('enabled')}
                      defaultChecked
                    />
                    <FormLabel>Enabled</FormLabel>
                  </HStack>
                </FormControl>

                <Button
                  size="md"
                  variant="outline"
                  border="2px"
                  borderColor="black"
                  // onClick={fetchUUID}
                  type="submit"
                  borderTop="8px"
                  borderRight="8px"
                  isDisabled={isSubmitting}
                >
                  Generate !
                </Button>
                <Text>Your link are: </Text>
                {isSubmitting ? (
                  <Center>
                    <Spinner color="black" />
                  </Center>
                ) : generatedCode !== '' ? (
                  <Flex justifyContent="space-between">
                    <Text onClick={copy} textColor="blue">
                      sqzd.xyz/{generatedCode}
                    </Text>
                    <Spacer />
                    <IconButton
                      size="xs"
                      aria-label="copy"
                      icon={<FaClipboard />}
                      onClick={copy}
                    />
                  </Flex>
                ) : undefined}

                <Button
                  size="md"
                  variant="outline"
                  border="2px"
                  borderColor="black"
                  borderTop="8px"
                  borderRight="8px"
                  w="25%"
                  type="reset"
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
