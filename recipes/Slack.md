Slack
=====

Install

```sh
npm install @slack/webhook --save
```

Use

```js
const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(slackUrl);
slack.send({
    text: 'Some text',
});
```
