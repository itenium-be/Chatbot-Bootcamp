import express from 'express';
import { Request, Response } from 'express';
import { Card, Suggestion, WebhookClient } from 'dialogflow-fulfillment';

import addCandidateMappings from './hooks/candidate-hooks';
import addClientMappings from './hooks/client-hooks';
import addConsultantMappings from './hooks/consultant-hooks';
import addPotentialClientMappings from './hooks/potentialClient-hooks';
import addVisitorMappings from './hooks/visitor-hooks';


const app = express();

function candidateOnboardingExample(agent: WebhookClient): void {
    // You can trigger this intent via the postman collection query
    agent.add(`That's great to hear! We have several open vacancies.`);
    // agent.add(`And more...`);
    // const card = new Card('Sample Card');
    // card.setText('More text');
    // agent.add(card);

    console.log('action:', agent.action);
    console.log('contexts:', agent.contexts);
    console.log('intent:', agent.intent);
    console.log('parameters:', agent.parameters);
    console.log('session:', agent.session);
    console.log('query:', agent.query);

    agent.add(new Suggestion('Quick Reply'));
    agent.add(new Card({
        title: 'Title: this is a card title',
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: 'This is the body text of a card.  You can even use line\n  breaks and emoji! 💁',
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
    }));
}

app.post('/webhook', function (req: Request, res: Response) {
    console.info(`\n\n******** S E R V E R   H I T ********`);
    // console.log(JSON.stringify(req.body, null, 2));

    const agent = new WebhookClient({request: req, response: res});

    let intentMap = new Map();
    intentMap.set('CandidateOnboarding', candidateOnboardingExample);
    addCandidateMappings(intentMap);
    addClientMappings(intentMap);
    addConsultantMappings(intentMap);
    addPotentialClientMappings(intentMap);
    addVisitorMappings(intentMap);

    agent.handleRequest(intentMap);

    res.json(agent);
});



app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ data: 'Hello from server' });
});



export default app;
