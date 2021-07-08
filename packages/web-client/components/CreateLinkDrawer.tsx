import { useCreateLinkStore } from '@/lib/store';
import {
  Box,
  Button,
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
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { createRef, MouseEvent, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const CreateLinkDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();
  const {
    onTextBoxChange,
    isRefURLValid,
    createLinkRefURL,
    radioOnChange,
    createLinkExpire,
    currentNumberInput: expireCurrentInput,
    onTitleChange,
    radioState,
    onNumberInputChange,
    enabled,
    toggleEnabled,
  } = useCreateLinkStore();

  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    setExpanded(!isExpanded);
  };

  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
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
            <Stack spacing="24px">
              <FormControl>
                <FormLabel>Link Title</FormLabel>
                <Input
                  type="text"
                  border="1px"
                  borderColor="black"
                  onChange={onTitleChange}
                />
                <FormHelperText>
                  Optional. By default title would be the same as the generated
                  link !
                </FormHelperText>
              </FormControl>
              <Box>
                <Textarea
                  placeholder="Paste Your Loooooooooooong link here"
                  h="32"
                  onChange={onTextBoxChange}
                  border="1px"
                  borderTop="4px"
                  borderRight="4px"
                  borderColor="black"
                />
                <Text textColor="red" fontSize="sm">
                  {isRefURLValid ? '' : 'URL seems to be wrong ;('}
                </Text>
              </Box>

              <RadioGroup
                onChange={radioOnChange}
                onClick={(e) => e.currentTarget.blur()}
                value={radioState}
              >
                <Stack direction="column">
                  <Radio value="1" onClick={(e) => e.currentTarget.blur()}>
                    Permanent
                  </Radio>
                  <Radio value="2" onClick={(e) => e.currentTarget.blur()}>
                    Expires in:{' '}
                  </Radio>
                  <Flex alignItems="center">
                    <NumberInput
                      defaultValue={expireCurrentInput}
                      onChange={onNumberInputChange}
                      isDisabled={radioState === '1'}
                      _disabled={{ opacity: 0.2 }}
                      min={1}
                    >
                      <NumberInputField border="1px" borderColor="black" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Box w="4" />
                    <Text>Hour(s)</Text>
                  </Flex>
                </Stack>
              </RadioGroup>

              <FormControl display="flex" alignItems="center">
                <Switch isChecked={enabled} onChange={toggleEnabled} />
                <FormLabel mb="0" ml="2">
                  Enabled
                </FormLabel>
              </FormControl>

              <Flex>
                <Button
                  size="xs"
                  onClick={toggleExpanded}
                  variant="outline"
                  borderTop="4px"
                  borderRight="4px"
                  borderColor="black"
                >
                  {isExpanded ? 'Too big...' : 'More room please...'}
                </Button>
              </Flex>
              <Button
                size="md"
                variant="outline"
                border="2px"
                borderColor="black"
                onClick={(e) => {}}
                borderTop="8px"
                borderRight="8px"
                isDisabled={!isRefURLValid || createLinkRefURL === ''}
              >
                Generate !
              </Button>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
