const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = require("./src/app");

// Immediate logging for any request
app.use((req, res, next) => {
    console.log(`[EARLY LOG] ${req.method} ${req.url}`);
    next();
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`DEBUG: Server is DEFINITELY running on port ${PORT}`);
});