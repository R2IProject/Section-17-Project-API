import { connectDatabase, insertedDocument } from "../../helpers/db-util";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
      // ^^^ extract data from body, and the developer expect to have email form here
        if (!userEmail || !userEmail.includes('@')) {
           res.status(422).json({ message: 'Invalid email address.' })
             // ^^ a signal that user input was bad / invalid
            return;
             // ^^ cancel the input cause no one want invalid input
        }

        let client;

        try{
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({message: 'Connecting to the database failed!'});
            return;
        }
        try{
            await insertedDocument(client, 'emails', { email: userEmail });
            client.close();
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed!'});
            return;
        }

         res.status(201).json({ message: 'Signed Up!' })
         // ^^^ this mean success our resources was added so the email was stored

         // call the function to the /components/input/newsletter file
    }
}
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const url = "mongodb+srv://HiraWea:latihanmongodb@cluster0.ncvpf5f.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const db = client.db('newsletter')
//     await db.collection('emails').insertOne({ email: userEmail });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const userEmail = req.body.email;
        
//         if (!userEmail || !userEmail.includes('@')) {
//             res.status(422).json({ message: 'Invalid email address.' });
//             return;
//         }

//         const url = "mongodb+srv://Hiraga:fCpqNY3OVqhpsnO5@cluster0.ncvpf5f.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0";
//         const client = new MongoClient(url, {});

//         try {
//             console.log("Connecting to MongoDB...");
//             await client.connect();
//             console.log("Connected to MongoDB");

//             const db = client.db('newsletter');
//             console.log("Inserting email into the database...");
//             const result = await db.collection('emails').insertOne({ email: userEmail });
//             console.log("Email inserted:", result);

//             res.status(201).json({ message: 'Signed Up!' });
//         } catch (error) {
//             console.error("Error occurred while handling the request:", error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         } finally {
//             console.log("Closing MongoDB connection...");
//             await client.close();
//             console.log("MongoDB connection closed");
//         }
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }