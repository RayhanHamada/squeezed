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
import { useRouter } from 'next/dist/client/router';
import React, { MouseEventHandler } from 'react';
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
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Navbar: React.FC = (_props) => {
  // const [user, loading, error] = useAuthState(fb.auth());

  const router = useRouter();

  const menus: Menu[] = [
    {
      text: 'Dashboard',
      Icon: MdDashboard,
      onClick: (e) => {
        e.preventDefault();
        router.push('/dashboard');
      },
    },
    {
      text: 'Settings',
      Icon: FaCog,
      onClick: (e) => {
        e.preventDefault();
        router.push('/settings');
      },
    },
    {
      text: 'Sign Out',
      Icon: BiLogOut,
      onClick: (e) => {
        e.preventDefault();
        // TODO sign out from firebase
        router.push('/');
      },
    },
  ];

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
        {false ? (
          <Spinner color="white" />
        ) : false ? (
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
                  {'John Doe'}
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
