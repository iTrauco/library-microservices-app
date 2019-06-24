//////=========================================================
// LOAD EXPRESS
const express = require('express');
const app = express();

const PORT = 5555;

app.listen (PORT, () => {
    console.log(`Orders services is now listening on port ${PORT}`);
})