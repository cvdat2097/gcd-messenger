import { Subject } from 'rxjs';

const Users = [
    {
        username: 'Mikeross',
        avatar: 'http://emilcarlsson.se/assets/mikeross.png'
    },
    {
        username: 'Harveyspecter',
        avatar: 'http://emilcarlsson.se/assets/harveyspecter.png'
    }
];

const Chat = [
    {
        user: Users[0],
        message: {
            content: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    }
]

const CONSTANTS = {
    NEW_MSG: 'server received a new message!',
};

const webSocket = new Subject();

const MockDB = {
    CONSTANTS: CONSTANTS,
    webSocket: webSocket,

    GETMessages: (pageIndex, pageSize) => {
        return Chat.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
    },

    POSTMessage: (username, message) => {
        if (!message) {
            return;
        }

        let userIndex = -1;

        Users.forEach((user, index) => {
            if (user.username === username) {
                userIndex = index;
            }
        });

        if (userIndex === -1) {
            Users.push({
                username: username,
                avatar: ''
            });
            userIndex = Users.length - 1;
        }

        Chat.push({
            user: Users[userIndex],
            message: {
                content: message,
                timeStamp: new Date()
            }
        });

        webSocket.next({
            action: CONSTANTS.NEW_MSG
        });
    },
}

export { Chat, Users, MockDB }