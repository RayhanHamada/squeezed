require('firebase/auth');
import { fb } from '@/lib/firebase-client';
import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IconType } from 'react-icons';
import { BiLogOut } from 'react-icons/bi';
import { FaChevronDown, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';
import { SqueezedLogo } from './SqueezedLogo';

type Menu = {
  text: string;
  Icon: IconType;
  route: `/${string}`;
};

const menus: Menu[] = [
  {
    text: 'Dashboard',
    Icon: MdDashboard,
    route: '/dashboard',
  },
  {
    text: 'Settings',
    Icon: FaCog,
    route: '/settings',
  },
  {
    text: 'Sign Out',
    Icon: BiLogOut,
    route: '/',
  },
];

export const Navbar: React.FC = (_props) => {
  const [user, loading, error] = useAuthState(fb.auth());

  return (
    <Flex
      w="full"
      bgColor="black"
      height="16"
      borderBottom="1px"
      borderColor="white"
      paddingX="8"
    >
      <Center>
        <Flex alignItems="flex-end">
          <SqueezedLogo fontSize="2xl" />
          <Box w="2" />
          <Text textColor="white" fontSize="x-small">
            Shorten your URL within a second !
          </Text>
        </Flex>
      </Center>
      <Spacer />
      <Center>
        {loading ? (
          <Spinner color="white" />
        ) : user ? (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<FaChevronDown />}
                  bgColor="black"
                  border="1px"
                  borderColor="white"
                  textColor="white"
                  _hover={{ opacity: 0.7 }}
                  _active={{ bgColor: 'black' }}
                >
                  {user ?? 'John Doe'}
                </MenuButton>
                <MenuList bgColor="white" textColor="black">
                  {menus.map(({ text, Icon }, idx) => (
                    <MenuItem key={idx} icon={<Icon />}>
                      {text}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        ) : (
          <Flex>
            <Center>
              <SignInButton />
            </Center>
            <Center pl="4">
              <SignUpButton />
            </Center>
          </Flex>
        )}
      </Center>
    </Flex>
  );
};
