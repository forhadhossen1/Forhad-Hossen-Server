const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware...
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Forhad Hossen Connected')
})

app.listen(port, () => {
    console.log(`Forhad Hossen Connected on port ${port}`)
})