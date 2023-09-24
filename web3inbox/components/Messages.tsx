import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMessages, useW3iAccount } from "@web3inbox/widget-react";
import Link from "next/link";
import React from "react";

import etherscanlink from "@metamask/etherscan-link";

function Messages() {
  const { account } = useW3iAccount();
  const { messages, deleteMessage } = useMessages(account);

  console.log("messages", messages);

  if (!messages.length) {
    return <Text>No messages yet.</Text>;
  }

  return (
    <Stack spacing={1}>
      {messages
        .sort((a, b) => b.id - a.id)
        .filter(({ message }) => message.type === "alerts")
        .map(({ id, message }) => (
          <Alert
            as={Link}
            href={message.url}
            target="_blank"
            key={id}
            status="info"
            colorScheme={message.type === "transactional" ? "blue" : "purple"}
            rounded="xl"
          >
            <AlertIcon />

            <Flex flexDir={"column"} flexGrow={1}>
              <AlertTitle>{message.title}</AlertTitle>
              <AlertDescription flexGrow={1}>{message.body}</AlertDescription>
            </Flex>
            <Flex w="60px" justifyContent="center">
              <Image
                src={message.icon}
                alt="notification image"
                height="60px"
                rounded="full"
                alignSelf="center"
              />
            </Flex>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={async (e) => {
                e.preventDefault();
                deleteMessage(id);
              }}
            />
          </Alert>
        ))}
    </Stack>
  );
}

export default Messages;
