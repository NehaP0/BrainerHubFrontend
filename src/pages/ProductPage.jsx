import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAction } from "../Redux/ProductReducer/action";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Image,
  Input,
  Text,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";

const ProductPage = () => {
  const dispatch = useDispatch();

  let isAuth = useSelector((store) => store.authReducer.isAuth);
  let products = useSelector((store) => store.productReducer.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);

  if (typeof products === "string") {
    products = JSON.parse(products);
  } else {
    products = [];
  }

  useEffect(() => {
    dispatch(
      getProductsAction({
        search: searchTerm,
        page: currentPage,
        limit: productsPerPage,
      })
    );
  }, [dispatch, searchTerm, currentPage, productsPerPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const handleProductsPerPage = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when the number of products per page changes
  };

  const handleLoginModalClose = () => {
    setShowModal(false);
  };

  const handleLoginModalOpen = () => {
    setShowModal(true);
  };

  if (isAuth) {
    return (
      <Box p={10} bg="gray.100">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Product List
        </Text>
        <Input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearch}
          mb={4}
          maxW="20%"
        />
        <Input
          type="number"
          placeholder="Products per page"
          value={productsPerPage}
          onChange={handleProductsPerPage}
          mb={4}
          maxW="20%"
        />
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {products.map((product) => (
            <Box
              key={product._id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              textAlign="center"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                h={200}
                mb={4}
              >
              <Image
                src={product.image}
                alt={product.name}
                objectFit="contain"
                maxH="100%"
                maxW="100%"
              />
              </Flex>
              <Text fontSize="xl" fontWeight="semibold" mt={2}>
                {product.name}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                Rs {product.price}
              </Text>
              <Text fontSize="md" mt={2}>
                {product.description}
              </Text>
              <Text fontSize="sm" mt={2}>
                In Stock: {product.quantity}
              </Text>
            </Box>
          ))}
        </Grid>
        <Center mt={4}>
          {/* Pagination */}
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            mr={2}
          >
            Prev
          </Button>
          <Button onClick={() => setCurrentPage(currentPage + 1)} ml={2}>
            Next
          </Button>
        </Center>
      </Box>
    );
  } else {
    return (
      <Center h="100vh" bg="gray.100">
        <Button onClick={handleLoginModalOpen}>Please Login First</Button>
        <Modal isOpen={showModal} onClose={handleLoginModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please Login First</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Please log in to access the ProductPage.</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleLoginModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    );
  }
};

export default ProductPage;

