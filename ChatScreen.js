import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // Greet the user and display disease options when component mounts
        const initialGreeting = 'Hello! I\'m your health assistant. Please select a disease to learn more:\n1. Malaria\n2. Chickungunya\n3. Dengue\n4. Typhoid';
        setMessages([{ text: initialGreeting, fromUser: false }]);
    }, []);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return; // Do not send empty messages

        // Add user's message to the chat
        setMessages(prevMessages => [...prevMessages, { text: inputMessage, fromUser: true }]);
        setInputMessage('');

        // Here, you would call your chatbot service with inputMessage and handle the response
        // For simplicity, let's simulate a bot response after a short delay
        setTimeout(() => {
            let botResponse = '';
            const disease = inputMessage.trim().toLowerCase().replace(/\s/g, ''); // Normalize input

            if (disease === 'malaria') {
                botResponse = 'Malaria:\nCause: Caused by Plasmodium parasites transmitted through the bite of infected female Anopheles mosquitoes.\nPrecaution: Use mosquito nets, insect repellents, and take antimalarial drugs as prescribed.\nMedication: Antimalarial drugs like chloroquine, artemisinin-based combination therapy (ACT), etc.\nFor more information, visit: https://www.google.com/search?q=Malaria';
            } else if (disease === 'chickungunya') {
                botResponse = 'Chickungunya:\nCause: Caused by the Chickungunya virus transmitted through the bite of infected Aedes mosquitoes.\nPrecaution: Prevent mosquito breeding, use mosquito repellents, and wear long-sleeved clothes.\nMedication: No specific antiviral treatment. Symptomatic treatment with pain relievers and rest.\nFor more information, visit: https://www.google.com/search?q=Chickungunya';
            } else if (disease === 'dengue') {
                botResponse = 'Dengue:\nCause: Caused by the Dengue virus transmitted through the bite of infected Aedes mosquitoes.\nPrecaution: Eliminate mosquito breeding sites, use mosquito repellents, and wear protective clothing.\nMedication: Symptomatic treatment with fluids, pain relievers, and rest. In severe cases, hospitalization may be required.\nFor more information, visit: https://www.google.com/search?q=Dengue';
            } else if (disease === 'typhoid') {
                botResponse = 'Typhoid:\nCause: Caused by the bacterium Salmonella typhi, usually spread through contaminated food or water.\nPrecaution: Drink clean water, eat properly cooked food, and maintain good hygiene.\nMedication: Antibiotics like ciprofloxacin, azithromycin, etc., as prescribed by a doctor.\nFor more information, visit: https://www.google.com/search?q=Typhoid';
            } else {
                botResponse = 'I\'m sorry, I couldn\'t find information about the disease you mentioned.';
            }

            setMessages(prevMessages => [...prevMessages, { text: botResponse, fromUser: false }]);
        }, 500);
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.messageContainer}>
                {messages.map((message, index) => (
                    <View key={index} style={[styles.messageBubble, message.fromUser ? styles.userBubble : styles.botBubble]}>
                        {message.text.startsWith('For more information') ? (
                            <TouchableOpacity onPress={() => handleLinkPress(message.text.split('For more information, visit: ')[1])}>
                                <Text style={styles.messageText}>{message.text.split('For more information, visit: ')[0]}</Text>
                                <Text style={[styles.messageText, styles.linkText]}>For more information, click here</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.messageText}>{message.text}</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    messageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        fontSize: 16,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#CED0CE',
        backgroundColor: '#ffffff',
    },
    textInput: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#CED0CE',
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default ChatScreen;
