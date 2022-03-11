Email
=====

Ask for the SendGrid Key!


## Install

```sh
npm install @sendgrid/mail --save 
```


## Use

```js
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(SENDGRID_API_KEY);

const mailData = {
    to: email.to.split(';'),
    cc: email.cc?.split(';'),
    bcc: email.bcc?.split(';'),
    from: email.from as string,
    subject: email.subject,
    // text: '',
    html: email.body,
    attachments: null,
};

try {
    await sgMail.send(mailData, false).then(() => {
      const tos = [mailData.to, mailData.cc, mailData.bcc].filter(x => !!x).join(', ');
      console.log(`Mail sent successfully to ${tos}. Subject=${mailData.subject}.`);
    });
} catch (error) {
    if (error.code === 401) {
      console.log('SendGrid returned 401. API key not set?');
      return res.status(400).send({message: 'Has the SendGrid API Key been set?'});
    }

    console.log('SendGrid returned an error', error.response.body);
    return res.status(400).send(error.response.body.errors[0]);
}
```
