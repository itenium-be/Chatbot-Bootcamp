import { WebhookClient } from 'dialogflow-fulfillment';


function displayNameHandler(agent: WebhookClient): void {
    agent.add('Yes!');
}

export default function(intentMap: Map<string, Function>) {
    // intentMap.set('intent.displayName', displayNameHandler);
}
