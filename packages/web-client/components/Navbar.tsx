import { fb } from '@/lib/firebase-client';
import { useURLDataStore, useUserDataStore } from '@/lib/store';
import {
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { MouseEventHandler } from 'react';
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
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Navbar: React.FC = (_props) => {
  const [user, loading, error] = useAuthState(fb.auth());
  const resetUserDataStore = useUserDataStore((sel) => sel.reset);
  const resetURLDataStore = useURLDataStore((sel) => sel.resetURLDataStore);
  const username = useUserDataStore((sel) => sel.username);

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
        router.push('/setting');
      },
    },
    {
      text: 'Sign Out',
      Icon: BiLogOut,
      onClick: async (e) => {
        e.preventDefault();

        await fb
          .auth()
          .signOut()
          .then(() => {
            resetURLDataStore();
            resetUserDataStore();
          });
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
        </Flex>
      </Center>
      <Spacer />
      <Center>
        {loading ? (
          <Spinner color="white" />
        ) : Boolean(user) ? (
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
                  {username ?? 'John Doe'}
                </MenuButton>
                <MenuList bgColor="white" textColor="black">
                  {menus.map(({ text, Icon, onClick }, idx) => (
                    <MenuItem key={idx} icon={<Icon />} onClick={onClick}>
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
