const session          = require("express-session");
const connectRedis     = require("connect-redis");
const { createClient } = require("redis");

const RedisStore       = connectRedis(session);
const redisClient      = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 1, // session max age in milliseconds
    },
});

module.exports  = sessionMiddleware;