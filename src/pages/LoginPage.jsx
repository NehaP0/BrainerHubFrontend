import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/AuthReducer/action";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Center,
  Heading,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginAction({ username, password }));
    setUsername("")
    setPassword("")
  };

  return (
    <Container maxW="lg" mt="8" >
      <Center>
        <Box p="8" boxShadow="md" borderRadius="md">
          <Heading mb="4">Log In</Heading>
          <FormControl mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              placeholder="Enter your password"
            />
          </FormControl>
          <Center>
            <Button colorScheme="teal" size="lg" onClick={handleLogin}>
              Log In
            </Button>
          </Center>
        </Box>
      </Center>
    </Container>
  );
};

export default LoginPage;


