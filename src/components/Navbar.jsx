import React from "react";
import { Link as ChakraLink, Button, Flex, CSSProp } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyles = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      backgroundColor="#319795"
      padding="1rem"
    >
      <ChakraLink as={Link} to={"/"} style={linkStyles} fontSize="24px">
        BrainerHub Solutions
      </ChakraLink>
      <Flex align="center">
        <Button as={Link} to={"/"} colorScheme="teal" mr="0.60rem" fontSize="24px" color='white' textDecoration= "none">
          Signup
        </Button>
        <Button as={Link} to={"/login"} colorScheme="teal" mr="0.60rem" fontSize="24px" color='white' textDecoration= "none">
          Login
        </Button>
        <Button as={Link} to={"/addProductPage"} colorScheme="teal" mr="0.60rem" fontSize="24px" color='white' textDecoration= "none">
          Add Product
        </Button>
        <Button as={Link} to={"/productPage"} colorScheme="teal" fontSize="24px" color='white' textDecoration= "none">
          Products
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;



