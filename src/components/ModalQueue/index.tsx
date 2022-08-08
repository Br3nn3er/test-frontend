import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from '@chakra-ui/react';
import { PageLoader } from '@components/PageLoader';
import { PureComponent } from 'react';

import { Props, State } from './types';

class ModalQueue extends PureComponent<Props, State> {
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
    const { children, loading = false, title } = this.props;
    const { show } = this.state;

    if (!show) return null;

    return (
      <Modal isOpen={show} onClose={this.hide} size="6xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box position="relative">
              {loading ? (
                <Box
                  bgColor="#FFF"
                  height="100%"
                  position="absolute"
                  width="100%"
                  zIndex={5}
                >
                  <PageLoader containerHeight="100%" text="Carregando Fila" />
                </Box>
              ) : (
                children
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={this.hide}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export { ModalQueue };
