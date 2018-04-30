import express from 'express';

import ping from './ping/index.mjs';

const api = express.Router().get('/ping', ping);

export default api;
