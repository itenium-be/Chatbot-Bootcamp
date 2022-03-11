import {Card, Suggestion, WebhookClient} from 'dialogflow-fulfillment';
import consultants from '../../data/consultants.json';

const dateFormat = date => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

function problemReportHandler(agent: WebhookClient): void {
    console.error('Reporting problem');

    const paramName = agent.parameters['firstname']['name'];
    const paramDob = dateFormat(new Date(agent.parameters['birthdate']));

    const consultant = consultants.find(({name}) => name.toLowerCase() === paramName.toLowerCase());
    if (!consultant) {
        agent.add('You are not known in our system yet. Maybe you want to apply for a job?');
        return;
    }
    if (consultant.birthdate !== paramDob) {
        agent.add(`No way, Jose! You don't even know your own date of birth!`);
        return;
    }

    debugger;
    switch (agent.parameters['problemTopics']) {
        case 'Car':
            agent.setFollowupEvent('consultants_direct_to_carproblem');
            return;
        case 'HR':
            agent.setFollowupEvent('consultants_direct_to_hrproblem');
            return;
        case 'Illness':
            agent.add('Unsupported operation');
            return;
    }


    agent.add('What is your problem related to?');
    agent.add(new Suggestion("Car"));
    agent.add(new Suggestion("Illness"));
    agent.add(new Suggestion("HR"));
}

function carProblemHandler(agent: WebhookClient): void {
    agent.add(new Card({
        title: 'Car problem successfully reported!',
        imageUrl: 'https://www.seekpng.com/png/detail/206-2068514_flat-tire-icon-tire.png',
        text: `
            <div>Sent e-mail to Fleet@itenium.be\n\n</div>
            <div>${agent.parameters['description']}</div>
        `,
    }));
}

function hrProblemHandler(agent: WebhookClient): void {
    agent.add(new Card({
        title: 'HR problem successfully reported!',
        imageUrl: 'https://www.seekpng.com/png/detail/304-3043196_technology-clipart-recruitment-computer-icons-human-human-resource.png',
        text: `
            <div>Sent e-mail to HR@itenium.be</div>
            <div>${agent.parameters['description']}</div>
        `,
    }));
}

export default function (intentMap: Map<string, Function>) {
    intentMap.set('consultant.ProblemReport', problemReportHandler);
    intentMap.set('consultant.CarProblem', carProblemHandler);
    intentMap.set('consultant.HrProblem', hrProblemHandler);
}
