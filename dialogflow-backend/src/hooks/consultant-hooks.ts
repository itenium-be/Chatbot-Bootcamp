import { WebhookClient } from 'dialogflow-fulfillment';
import candidates from '../../data/consultants.json';

function problemReportHandler(agent: WebhookClient): void {
    console.error('Reporting problem');
    console.log('action:', agent.action);
    console.log('contexts:', agent.contexts);
    console.log('intent:', agent.intent);
    console.log('parameters:', agent.parameters);
    console.log('session:', agent.session);
    console.log('query:', agent.query);

    const paramName = agent.parameters['name']['name'];
    const paramDob = agent.parameters['birhtdate.original'];

    const candidate = candidates.find(({lastname, name}) => `${name} ${lastname}` === paramName);
    if (!candidate) {
        agent.add('You are not known in our system yet. Maybe you want to apply for a job?');
        return;
    }
    if (candidate)

    agent.add('Yes!');
}

export default function(intentMap: Map<string, Function>) {
    console.log(JSON.stringify(intentMap, null, 2));
    intentMap.set('consultant.ProblemReport', problemReportHandler);
}
