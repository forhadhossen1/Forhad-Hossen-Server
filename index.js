const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware...
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.onmt34s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const projectCollection = client.db("forhadDB").collection("project");
        const testimonialsCollection = client.db("forhadDB").collection("testimonials");


        // projectCollection section 
        app.get('/project', async (req, res) => {
            const result = await projectCollection.find().toArray();
            res.send(result)
        })

        app.post('/project', async (req, res) => {
            const projects = req.body;
            const result = await projectCollection.insertOne(projects);
            res.send(result);
        })

        app.patch('/project/:id', async (req, res) => {
            const project = req.body:
            const id = req.params.id;
            const filter = { _id: (id) }
            const updateDoc = {
                $set: {
                    ProjectName: project.ProjectName,
                    GitHubLink: project.GitHubLink,
                    LiveLink: project.LiveLink,
                    ProjectDescription: project.ProjectDescription,
                    Image: project.Image

                }
            }
            const result = await projectCollection.updateOne(filter, updateDoc);
            res.send(result);
        })


        // testimonialsCollection section 

        app.get('/testimonials', async (req, res) => {
            const result = await testimonialsCollection.find().toArray();
            res.send(result);
        })

        app.post('/testimonials', async (req, res) => {
            const testimonial = req.body;
            const result = await testimonialsCollection.insertOne(testimonial);
            res.send(result);
        })



        // Send a ping to confirm a successful connection

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Forhad Hossen Connected')
})

app.listen(port, () => {
    console.log(`Forhad Hossen Connected on port ${port}`)
})