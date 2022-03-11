import {Suggestion, WebhookClient} from 'dialogflow-fulfillment';
import consultants from '../../data/consultants.json';

function problemReportHandler(agent: WebhookClient): void {
    console.error('Reporting problem');
    console.log('action:', agent.action);
    console.log('contexts:', agent.contexts);
    console.log('intent:', agent.intent);
    console.log('parameters:', agent.parameters);
    console.log('session:', agent.session);
    console.log('query:', agent.query);

    const paramName = agent.parameters['name']['name'];
    const paramDob = new Date(agent.parameters['birthdate']).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const consultant = consultants.find(({lastname, name}) => `${name} ${lastname}` === paramName);
    if (!consultant) {
        agent.add('You are not known in our system yet. Maybe you want to apply for a job?');
        return;
    }
    if (consultant.dob !== paramDob) {
        agent.add(`No way, Jose! You don't even know your own date of birth!`);
        return;
    }

    switch (agent.parameters['problemTopics']) {
        case 'Car':
            agent.setFollowupEvent('consultants_direct_to_carproblem');
            return;
        case 'HR':
            agent.add('Unsupported operation');
            return;
        case 'Illness':
            agent.add('Unsupported operation');
            return;
    }


    agent.add('What is your problem related to?');
    agent.add(new Suggestion("Illness"));
    agent.add(new Suggestion("Car"));
    agent.add(new Suggestion("HR"));


    // agent.setFollowupEvent()
}

function carProblemHandler(agent: WebhookClient): void {
    console.error('Reporting Car problem');
    console.log('action:', agent.action);
    console.log('contexts:', agent.contexts);
    console.log('intent:', agent.intent);
    console.log('parameters:', agent.parameters);
    console.log('session:', agent.session);
    console.log('query:', agent.query);
}

export default function(intentMap: Map<string, Function>) {
    intentMap.set('consultant.ProblemReport', problemReportHandler);
    intentMap.set('consultant.CarProblem', carProblemHandler);
}
