import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack
} from "@chakra-ui/react";

const InputModal = ({ isOpen, onClose, inputs, setInputs, onSubmit }) => {
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    onSubmit(inputs);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Inputs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            {inputs.map((input, index) => (
              <Input
                key={index}
                placeholder={`Input ${index + 1}`}
                value={input}
                onChange={(event) => handleInputChange(index, event)}
              />
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InputModal;
