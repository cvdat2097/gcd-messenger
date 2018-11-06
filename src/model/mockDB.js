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
            content: "1How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "2When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "3Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "4Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "5How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "6When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "7Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "8Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "9How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "10When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "11Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "12Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "13How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "14When you're backed against the wall, break the god damn thing down.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[1],
        message: {
            content: "15Excuses don't win championships.",
            timeStamp: new Date('1-1-2018')
        }
    },
    {
        user: Users[0],
        message: {
            content: "16Oh yeah, did Michael Jordan tell you that?",
            timeStamp: new Date('1-1-2018')
        }
    }
]

const CONSTANTS = {
    NEW_MSG: 'server received a new message!',
    NEW_USR: 'new user has been online!'
};

const webSocket = new Subject();

const MockDB = {
    CONSTANTS: CONSTANTS,
    webSocket: webSocket,

    GETMessages: (nMessage) => {
        // return Chat.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
        return [...Chat].reverse()
            .slice(0, nMessage)
            .reverse();
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
                content: (Chat.length + 1).toString() + message, //TODO: remove number prefixing
                timeStamp: new Date()
            }
        });

        webSocket.next({
            action: CONSTANTS.NEW_MSG
        });
    },

    GETActiveUsers() {
        return Users;
    }
}

export { Chat, Users, MockDB }
