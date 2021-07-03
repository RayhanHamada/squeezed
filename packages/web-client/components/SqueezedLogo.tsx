import { Box, Text, TypographyProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  fontSize: TypographyProps['fontSize'];
};

export const SqueezedLogo: React.FC<Props> = ({ fontSize }) => {
  return (
    <Box>
      <Text fontSize={fontSize} fontWeight="normal" color="white">
        Squeezed
      </Text>
    </Box>
  );
};
