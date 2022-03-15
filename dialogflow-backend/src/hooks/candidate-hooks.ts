import { WebhookClient } from 'dialogflow-fulfillment';
import { agent } from 'supertest';
import consultants from '../../data/consultants.json';
import sgMail from '@sendgrid/mail';





function displayNameHandler(agent: WebhookClient): void {
    agent.add('Yes!');
}

function processIlnnessNotification(agent: WebhookClient) : void {

    var name = agent.parameters.person['name'];
    var birthdate = agent.parameters.birthdate


    agent.add('Validating user ' + name);   

    if(validateUser(name, birthdate)){
        agent.add('Notifying HR and your team lead...');
        //Send email
       sendMail(name);
       agent.add('Email has been sent to HR and your project team lead');
    
    } else {
        agent.add('User not found')
    }
}

async function sendMail(name:String): Promise<boolean> {
    sgMail.setApiKey('KEY');


    const mailData = {
        to: 'hr@itenium.be',
        // cc: 'teamlead@client.com',
        // bcc: 'consultant@itenium.be',
        from: 'hr@itenium.be',
        subject: name + ' on sick leave',
        // text: '',
        html: 'We want to inform you that our consultant ' + name + ' has called in sick',
    };
    try {
        await sgMail.send(mailData, false).then(() => {
          const tos = [mailData.to].filter(x => !!x).join(', ');
          console.log(`Mail sent successfully to ${tos}. Subject=${mailData.subject}.`);
          return true;
        });
    } catch (error: any) {
        if (error.code === 401) {
          console.log('SendGrid returned 401. API key not set?');
        //   console.log(res.status(400).send({message: 'Has the SendGrid API Key been set?'}));
        
        }
        // console.log('SendGrid returned an error', error.response.body);
        // console.log(res.status(400).send(error.response.body.errors[0]));
        return false;
    }
    return false;
}

function validateUser(name:String, birthdate:String): boolean {
    //TODO: convert birthdate to ensure correct format to match with data


    var userMatches = false;
    //validate with data from db

    var date = convertDate(new Date(birthdate.toString()));
    console.log(date);
    var found = consultants.filter( c => c.name.toLocaleLowerCase == name.toLocaleLowerCase && c.birthdate == date);
    return found.length > 0;
    
}

function convertDate(date:Date): String{
    const dateFormat = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return dateFormat.toString();

}

export default function(intentMap: Map<string, Function>) {
    intentMap.set('TestWebhook', displayNameHandler);
    intentMap.set('candidate.illness', processIlnnessNotification)
}
