import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import e from 'express';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_aj86n2b', 'template_l31ki1k', form.current, '3u9-dhdCEnq2Ch0OG')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
      e.target.reset()

  return (
    <section>
        <div className='container'>
            <h2>Contact Us</h2>
            <form className='--form-control --card --flex-center --dir-column'>
                <input type='text' placeholder='Fullname' name='user_name' required/>
                <input type='email' placeholder='Email' name='user_email' required/>
                <input type='text' placeholder='Subject' name='subject' required/>
                <textarea  name='message' cols="30" rows="10"></textarea>
                <button type='submit' className='--btn --btn-primary'>Send Message</button>
            </form>
        </div>
    </section>
  )
}

export default Contact;