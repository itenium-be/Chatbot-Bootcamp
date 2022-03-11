import { WebhookClient } from 'dialogflow-fulfillment';


function problemReportHandler(agent: WebhookClient): void {
    console.log('Reporting problem');
    agent.add('Yes!');
}

export default function(intentMap: Map<string, Function>) {
    intentMap.set('consultant.ProblemReport', problemReportHandler);
}
