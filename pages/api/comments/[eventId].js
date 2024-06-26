import { connectDatabase, insertedDocument, getAllDocuments } from "../../../helpers/db-util";

export default async function handler(req, res) {
    const eventId = req.query.eventId
    // ^^^^ how to get a value inside place holder

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connection to the database failed!' })
        return;
    }


    if (req.method === 'POST') {
        // add serve-side validation
        const { email, name, text } = req.body;
        // ^^ define what data you want to call from body

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input!' })
            client.close();
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId,
        };

        try {
            const result = await insertedDocument(client, 'comments', newComment);
            newComment._id = result.insertedId
            res.status(201).json({ message: 'Added comment.', comment: newComment });
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed!' })
        }
    }

    if (req.method === 'GET') {

        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 })
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' })
        }
    }
    client.close();
}

// const documents = await db
//     .collection('comments')
//     .find()
//     .sort({ _id: -1 })
//     .toArray();
// ^^^ using sort order - for descending and + for ascending
// ^^^ using find() can fetch all the comment
// ^^^ using toArray() give all the entries in comment collections as an array