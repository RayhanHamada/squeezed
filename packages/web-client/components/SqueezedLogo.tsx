import { Text, TypographyProps } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { MouseEventHandler } from 'react';

type Props = {
  fontSize: TypographyProps['fontSize'];
};

export const SqueezedLogo: React.FC<Props> = ({ fontSize }) => {
  const router = useRouter();

  const refresh: MouseEventHandler = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <Text
      fontSize={fontSize}
      fontWeight="bold"
      color="white"
      _hover={{ cursor: 'pointer' }}
      onClick={refresh}
    >
      Squeezed
    </Text>
  );
};
