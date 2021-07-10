import { useURLDataStore } from '@/lib/store';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaChevronDown,
  FaTrash,
} from 'react-icons/fa';

export const BulkActionMenu: React.FC = (props) => {
  const { selectedURLDataIDs } = useURLDataStore();

  const enableLinks = async () => {};

  const disableLinks = async () => {};

  const removeLinks = async () => {};

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<FaChevronDown />}
            _hover={{ opacity: 0.7 }}
            display={{
              base: 'none',
              md: selectedURLDataIDs.length === 0 ? 'none' : 'block',
            }}
          >
            {selectedURLDataIDs.length} item selected
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<FaArrowCircleUp color="green" />}
              onClick={enableLinks}
            >
              Enable
            </MenuItem>
            <MenuItem
              icon={<FaArrowCircleDown color="red" />}
              onClick={disableLinks}
            >
              Disable
            </MenuItem>
            <MenuItem icon={<FaTrash />} onClick={removeLinks}>
              Delete
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
