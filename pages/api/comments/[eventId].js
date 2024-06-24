export default function handler(req, res) {
    const eventId = req.query.eventId
    // ^^^^ how to get a value inside place holder
    if (req.method === 'POST') {
        // add serve-side validation
        const { email, name, text } = req.body;
        // ^^ define what data you want to call from body

        if (!email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input! ' })
            return;
        }

        console.log(email, name, text);
        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text,
        };
        console.log(newComment);
        res.status(201).json({ message: 'Added comment.', comment: newComment })
    }

    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Max', text: 'A first commnet!' },
            { id: 'c2', name: 'Manuel', text: 'A ssecond commnet!' },
        ];

        res.status(200).json({ comment: dummyList });
    }
}