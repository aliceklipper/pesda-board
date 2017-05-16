/* Import main modules */
const Koa = require('koa');
const socketio = require('socket.io');
const http = require('http');
const r = require('rethinkdb');

/* Import middleware */
const serve = require('koa-static');
const mount = require('koa-mount');
const logger = require('koa-logger');
const helmet = require('koa-helmet');

/* Import schemas */
const { commentSchema } = require('./schemas/comment');

/* Initialize application */
const app = new Koa();
const server = http.createServer(app.callback());
const io = socketio(server);

/* Use middleware */
app.use(logger());
app.use(helmet());
app.use(mount('/', serve('../client/build/')));

/* Start Koa */
console.log('Starting server…');
server.listen(3000);
console.log('Server started.');

/* Handle Ctrl+C */
process.stdin.resume();
process.on('SIGINT', () => {
    console.log('Finishing server…');
    server.close(() => {
        console.log('Server finished.');
        process.exit();
    });
});

/* Socket.IO stuff */
io.on('connection', async socket => {
    const conn = await r.connect({
        host: 'localhost',
        port: 12309,
        db: 'pesda_board',
    });

    socket.emit('comments', await (await r.table('comments').run(conn)).toArray());

    socket.on('comment', async data => {
        if (commentSchema(data)) {
            const comment = {
                name: data.name,
                theme: data.theme,
                comment: data.comment,
                timestamp: Date.now(),
            };

            io.sockets.emit('comments', [comment]);
            await r.table('comments').insert(comment).run(conn);
        } else {
            socket.emit('comment-error', { message: 'Invalid data.' });
        }
    });
});
