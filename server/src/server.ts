import Fastify from 'fastify';

const app = Fastify();

app.get('/', () => {
    return 'Hey'
})

app.listen({
    port: 3000
}).then(() => {
    console.log('Server running')
})