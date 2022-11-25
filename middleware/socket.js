var jwt              = require('jsonwebtoken');
const validOrigin    = ['http://localhost:3000', "http://localhost:3001"];

module.exports = {
    wrap : expressMiddleware => (socket, next) => expressMiddleware(socket.request, {}, next),
    
    checkOrigin(socket, next){
        if (
            socket.handshake.headers.origin &&
            validOrigin.indexOf(socket.handshake.headers.origin) < 0
        ) 
        {
            return next(new Error("Invalid Origin"));
        } 
        
        return next();
    },

    authenByPassport(socket, next){
        let { user } = socket.request.session.passport;
        if(!user) return next(new Error("Invalid access"));
        return next();
    },

    async authenToken(socket, next){
        let token = socket.handshake.query.token;
        // try{
        //     const _decoded = jwt.verify(token, "secretKey");
        //     if (!_decoded || !_decoded.id) return next(new Error("AUTH_FAILED"));
        //     if(_decoded.id != USER.id) return next(new Error("Invalid User"));
        //     return next();
        // }catch(e){
        //     return next(new Error("AUTH_FAILED"));
        // }
    }
}