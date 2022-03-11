import { Card, WebhookClient } from 'dialogflow-fulfillment';
import { agent } from 'supertest';
import consultants from "../../data/consultants.json";
import dayjs from 'dayjs';
import { } from 'dialogflow-fulfillment';

function displayNameHandler(agent: WebhookClient): void {
    agent.add('Yes!');
}

export default function (intentMap: Map<string, Function>) {
    intentMap.set('client.getColleagues', displayColleagues);
    intentMap.set("client.getColleagues - confirmName", displayConfirmName);
    intentMap.set("client.getColleagues - confirmName - Found", displayConfirmNameFound);
}



function displayColleagues(agent: WebhookClient): void {
    agent.add("Please provide me your name.")
}

function displayConfirmName(agent: WebhookClient): void {
    let name = agent.parameters.person;
    const persoon = consultants.find(obj => obj.name.toLowerCase === name["name"].toLowerCase);

    if (persoon !== undefined) {
        agent.setFollowupEvent("client_colleagueFound");
    }
    else agent.add("Unexisting colleagues")

}

function displayConfirmNameFound(agent: WebhookClient): void {
    let birthdate = agent.parameters.birthDate;
    let personParameter = agent.parameters.person;
    const persoon = consultants.find(obj => obj.name.toLowerCase === personParameter["name"].toLowerCase);

    if (persoon?.birthDate == dayjs(birthdate).format("YYYY-MM-DD")) {
        consultants.map((x) => {
            if (x.approved && x.name !== personParameter["name"]) {
                agent.add(new Card({
                    title: x.name,
                    imageUrl: 'img/consultant-img/' + x.name.toLowerCase() + ".jpg",
                    text: ` ${x.city} - ${x.email} - ${x.skills} `
                }));
            }
        })
    }

    else agent.add("Sorry not found !");

}