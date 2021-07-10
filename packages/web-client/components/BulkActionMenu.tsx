import { useBulkActionStore, useURLDataStore } from '@/lib/store';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { MouseEvent } from 'react';
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaChevronDown,
  FaTrash,
} from 'react-icons/fa';

type Props = {
  onAlertOpen(): void;
};

export const BulkActionMenu: React.FC<Props> = ({ onAlertOpen }) => {
  const { selectedURLDataIDs } = useURLDataStore();

  const { setBulkOperation } = useBulkActionStore();

  const enableLinks = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBulkOperation('enable');
    onAlertOpen();
  };

  const disableLinks = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBulkOperation('disable');
    onAlertOpen();
  };

  const removeLinks = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBulkOperation('delete');
    onAlertOpen();
  };

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
