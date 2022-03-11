import { Card, WebhookClient } from 'dialogflow-fulfillment';
import eventData from '../../data/events.json';


function upcomingEventsHandler(agent: WebhookClient): void {
 
    eventData.map(e => {
        agent.add(new Card({
            title: `${e.date} ${e.title} ${e.food ? '🍕' : ''}`,
            text: `${e.location} - ${e.desc}`,
            buttonText: 'Voeg toe aan je kalender',
            buttonUrl: e.calendarUrl,
        }));
    })
}

export default function (intentMap: Map<string, Function>) {
    intentMap.set('upcomingEvents', upcomingEventsHandler);
}