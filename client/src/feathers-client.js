import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io('https://iot-infra.herokuapp.com/', { transports: ['websocket'] });
// const socket = io('http://localhost:3030/', { transports: ['websocket'] });

const feathersClient = feathers()
  .configure(socketio(socket));

export default feathersClient;
