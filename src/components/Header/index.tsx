import { Flex, Text, Button, Box, Container } from '@chakra-ui/react';
import { FC } from 'react';

import { useAuthInfo, useSignOut } from '@contexts/AuthContext';

const Header: FC = () => {
  const { user } = useAuthInfo();
  const signOut = useSignOut();

  return (
    <Container paddingY="20px" maxWidth="8xl">
      <Flex>
        <Box alignItems="center" display="flex">
          <Text
            fontSize="1xl"
            fontWeight="medium"
            letterSpacing="tight"
            width="64"
          >
            Universidade Federal de Uberlândia
          </Text>
        </Box>

        <Box display="flex" flex="1">
          <Flex alignItems="center" marginLeft="auto">
            <Box marginRight="6" textAlign="right">
              <Text fontWeight="medium" letterSpacing="tight">
                {user?.name}
              </Text>

              <Text color="blue.400" fontSize="small" fontWeight="bold">
                {user?.email}
              </Text>
            </Box>

            <Button colorScheme="red" onClick={signOut}>
              Sair
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export { Header };
