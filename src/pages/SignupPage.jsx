import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignUpAction } from "../Redux/AuthReducer/action";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Center,
  Heading,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";


const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSignup = () => {
    if (username && password) {
      dispatch(SignUpAction({ username, password }));
      setIsSuccessModalOpen(true);
      setUsername("")
      setPassword("")
    } else {
      setIsErrorModalOpen(true);
    }
  };

  const handleCloseModals = () => {
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  return (
    <Container maxW="lg" mt="8" >
      <Center>
        <Box p="8" boxShadow="md" borderRadius="md">
          <Heading mb="4">Sign Up</Heading>
          <FormControl id="username" mb="4" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
              placeholder="Enter your desired username"
            />
          </FormControl>
          <FormControl id="password" mb="4" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="lg">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Center>
            <Button colorScheme="teal" size="lg" onClick={handleSignup}>
              Sign Up
            </Button>
          </Center>
        </Box>
      </Center>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseModals}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signup Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Congratulations! You have successfully signed up. Please proceed to login.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseModals}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onClose={handleCloseModals}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Please fill in all the fields.</ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseModals}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SignupPage;


