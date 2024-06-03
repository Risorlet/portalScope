// import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi there 👋\nHow can I help you today?", type: "incoming" },
  ]);

  const generateResponse = (userMessage) => {
    const responses = {
      hi: "Hello!",
      "how are you?": "I'm just a bot, but I'm here to assist you!",
      goodbye: "Goodbye! Have a great day!",
      "job opportunities":
        "We have various job opportunities available. Please visit our website Portal Scope to explore current openings.",
      "how to apply":
        "To apply for a job, you can visit our careers page on our website and follow the application instructions.",
      "interview process":
        "Our interview process typically includes multiple stages, such as initial screening, technical interviews, and HR interviews.",
      // Add more responses related to job portal queries
    };

    return (
      responses[userMessage.toLowerCase()] ||
      "I'm sorry, I don't understand that."
    );
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { message: userMessage, type: "outgoing" },
      { message: generateResponse(userMessage), type: "incoming" },
    ]);
    setUserMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        headerShadowVisible: false,
        headerTitle: "Welcome to Chat!",
        headerTitleAlign: 'center'
        }}
      />
      <ScrollView style={styles.chatbox}>
        {chatMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.chat,
              message.type === "outgoing" && styles.outgoing,
            ]}
          >
            <Text
              style={[
                styles.message,
                message.type === "outgoing"
                  ? styles.outgoingMessage
                  : styles.incomingMessage,
              ]}
            >
              {message.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInput}>
        <TextInput
          style={styles.input}
          placeholder="Enter a message..."
          value={userMessage}
          onChangeText={setUserMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  chatbox: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chat: {
    paddingVertical: 10,
  },
  outgoing: {
    flexDirection: "row-reverse",
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  outgoingMessage: {
    backgroundColor: "#724ae8",
    color: "#fff",
  },
  incomingMessage: {
    backgroundColor: "#f2f2f2",
    color: "#000",
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#724ae8",
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#fff",
  },
});

export default Bot;
