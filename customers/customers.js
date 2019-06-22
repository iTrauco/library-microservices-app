//////=========================================================
// LOAD EXPRESS
const express = require('express');
const app = express()

const PORT = 4444;
//
//////=========================================================
// CONFIGURE ROUTES



//
//////=========================================================
// CONFIGURE SERVER
app.listen(PORT, () => {
    console.log(`Customers service is now listening on port ${PORT}...`);
})