export default function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        // ^^^ extract data from body, and the developer expect to have email form here
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            // ^^ a signal that user input was bad / invalid
            return;
            // ^^ cancel the input cause no one want invalid input
        }
        // ^^^ check if the email r valid
        console.log(userEmail);
        res.status(201).json({ message: 'Signed Up!' })
        // ^^^ this mean success our resources was added so the email was stored

        // call the function to the /components/input/newsletter file
    }
}