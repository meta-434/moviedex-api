require('dotenv').config();
const app = require('./app.js');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
