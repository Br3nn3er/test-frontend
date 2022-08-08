import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import { PageLoader } from '@components/PageLoader';
import { PureComponent } from 'react';

import { Props, State } from './types';

class ModalConfirm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { show: false };

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.setState({ show: false });
  }

  show() {
    this.setState({ show: true });
  }

  render() {
    const {
      children,
      loading = false,
      onSuccess,
      title = 'Confirmar Deleção',
    } = this.props;
    const { show } = this.state;

    return (
      <Modal isOpen={show} onClose={this.hide}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box position="relative">
              {loading && (
                <Box
                  bgColor="#FFF"
                  height="100%"
                  position="absolute"
                  width="100%"
                  zIndex={5}
                >
                  <PageLoader containerHeight="100%" text="Apagando" />
                </Box>
              )}

              {typeof children === 'string' ? (
                <Text>{children}</Text>
              ) : (
                children
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} isDisabled={loading} onClick={this.hide}>
              Fechar
            </Button>
            <Button colorScheme="blue" isDisabled={loading} onClick={onSuccess}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export { ModalConfirm };
