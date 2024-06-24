import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  //use ref function that called the funtion from api folder

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value
    // ^^ get the currently entered value by client

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      // ^^ send the data as JSON file
      headers: {
        'Content-Type': 'application/json'
        // ^^^ make the nextjs aware that the sending request as json file
      }
      // ^^^ call function from /api/newsletter 
    }).then(response => response.json())
      .then(data => console.log(data));

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          // ^^^ call function
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
