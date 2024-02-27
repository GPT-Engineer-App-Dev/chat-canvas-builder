import { ChakraProvider, Box, VStack, HStack, Text, Input, Button, IconButton, useToast, Heading, Spacer, Divider, Code, Tag, TagLabel, TagCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, FormControl, FormLabel, Textarea, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus, FaGithub, FaUserFriends, FaTasks, FaUndo, FaRedo, FaRobot, FaRegClipboard } from "react-icons/fa";

const Index = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Empty Message",
        description: "You can't send an empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setChatMessages([...chatMessages, { text: inputValue, user: "You" }]);
    setInputValue("");
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleInviteCollaborator = () => {
    // Placeholder for invite collaborator functionality
    toast({
      title: "Collaborator Invited",
      description: "An invite has been sent to the collaborator.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4}>
          <HStack w="full">
            <Heading size="md">AI-Driven Web App Builder</Heading>
            <Spacer />
            <IconButton icon={<FaGithub />} aria-label="GitHub" />
            <IconButton icon={<FaUserFriends />} aria-label="Collaborate" onClick={onOpen} />
            <IconButton icon={<FaTasks />} aria-label="Tasks" />
            <IconButton icon={<FaUndo />} aria-label="Undo" />
            <IconButton icon={<FaRedo />} aria-label="Redo" />
          </HStack>
          <Divider />
          <Box w="full" h="400px" bg="gray.100" overflowY="auto">
            {/* Chat messages */}
            {chatMessages.map((message, index) => (
              <Box key={index} bg="white" p={2} m={2} borderRadius="md" shadow="md">
                <Tag size="sm" borderRadius="full" variant="solid" colorScheme="teal" mr={2}>
                  <TagLabel>{message.user}</TagLabel>
                </Tag>
                <Text display="inline">{message.text}</Text>
              </Box>
            ))}
          </Box>
          <HStack w="full">
            <Input placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyPress={(event) => event.key === "Enter" && handleSendMessage()} />
            <IconButton colorScheme="blue" aria-label="Send message" icon={<FaPlus />} onClick={handleSendMessage} />
          </HStack>
        </VStack>

        {/* Modal for inviting collaborators */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Invite a Collaborator</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input placeholder="Enter email" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleInviteCollaborator}>
                Send Invite
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
