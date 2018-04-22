import express from 'express';

import ping from './ping';

const api = express.Router().get('/ping', ping);

export default api;
