# Simple Chat App

This is simple chat app where users can join multiple rooms and leaves. 
It has been created to learn socket concpets in chat.

#### Features
- User can join multiple rooms
- Supported emojis in text using react-emoji module
- User can leave room anytime
- #users in room

#### Structure
###### Client
It uses react functional components, react emoji and socket client module. 
###### Server 
It uses nodejs, express and socket.io module with all server side configuration.
It doesn't store chat messages. Once server will be restarted, users, rooms and messages will be gone and reset.


###### For both client and server
```
# Install dependencies
npm install

# Run in develpment
npm start
```

#### Screenshots

![alt text](./screenshots/s1.png?raw=true "Login screen")
![alt text](./screenshots/s2.png?raw=true "Chat screen")
