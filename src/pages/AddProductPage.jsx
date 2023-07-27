import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAction } from "../Redux/ProductReducer/action";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let isAuth = useSelector((store) => store.authReducer.isAuth);
  // State for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = { name, price, description, quantity, image };
    if(name!=="" && price!=="" && description!=="" &&quantity!==0 && image!==""){
      dispatch(addProductAction(productData));
  
      // Show toast notification for "Product added"
      toast({
        title: "Product added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      // Clear the input fields after product is added
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setQuantity(0);
    }
    else{
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isAuth) {
    return (
      <Box p="4" maxW="400px" mx="auto" boxShadow="md" borderRadius="md" bg="gray.100">
        <Text fontSize="24px" fontWeight="bold" mb="4">
          Add Product
        </Text>
        <form onSubmit={handleFormSubmit}>
          <FormControl mb="4">
            <FormLabel>Product Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} size="lg" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} size="lg" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Price</FormLabel>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} size="lg" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Image URL</FormLabel>
            <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} size="lg" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Quantity</FormLabel>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} size="lg" />
          </FormControl>
          <Flex justify="center">
            <Button type="submit" colorScheme="teal" size="lg">
              Add Product
            </Button>
          </Flex>
        </form>
      </Box>
    );
  } else {
    return (
      <>
        <Center h="100vh" bg="gray.100"> 
        <Button colorScheme="teal" onClick={onOpen}>
          Add Product
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please Login First</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Please login first to add a product.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
        </Center>
      </>
    );
  }
};

export default AddProductPage;

