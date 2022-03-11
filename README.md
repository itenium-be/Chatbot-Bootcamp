Chatbot
=======

Wifi: `DENBERG-GUEST`

The Bots
--------

- [Candidates](https://itenium-chatbot-candidate-lico.web.ushaflow.io)
- [Clients](https://itenium-chatbot-client-wbrm.web.ushaflow.io)
- [Consultants](https://itenium-chatbot-consultan-dnxo.web.ushaflow.io)
- [Potential Clients](https://itenium-chatbot-potential-xcvt.web.ushaflow.io)
- [Visitor](https://itenium-chatbot-visitor-tc9k.web.ushaflow.io)
- [Combined Bot](https://bootcamp-chatbot-cfav.web.ushaflow.io/)



dialogflow-backend
------------------

```sh
cd dialogflow-backend
npm install
npm run watch
```


dialogflow-frontend
-------------------

[Cloned from here](https://github.com/mishushakov/dialogflow-web-v2)

```
cd dialogflow-frontend
npm install
npm run serve
```

Edit `dialogflow-frontend/src/config/index.js` endpoint with one of these urls:

- [Candidates](https://itenium-chatbot-candidate-lico.core.ushaflow.io)
- [Clients](https://itenium-chatbot-client-wbrm.core.ushaflow.io)
- [Consultants](https://itenium-chatbot-consultan-dnxo.core.ushaflow.io)
- [Potential Clients](https://itenium-chatbot-potential-xcvt.core.ushaflow.io)
- [Visitor](https://itenium-chatbot-visitor-tc9k.core.ushaflow.io)
- [Combined Bot](https://bootcamp-chatbot-cfav.core.ushaflow.io/)



ngrok
-----

[Download ngrok](https://ngrok.com/download):  
ngrok will give you a https url forwarding to the `dailogflow-backend`
which can be used as the Dialogflow Agent Fulfillment WebHook URL.

```ps1
.\ngrok.exe authtoken 26CQnmEcVxSqNBbco6wR60n1UyS_6uppSLBbk9iRxsAa5z8LT
.\ngrok.exe http 5000
```

```sh
ngrok authtoken 26CQnmEcVxSqNBbco6wR60n1UyS_6uppSLBbk9iRxsAa5z8LT
ngrok http 5000
```

Example output:  

```
Forwarding                    https://some-random-id.ngrok.io
```

Then configure in Dialogflow: `https://some-random-id.ngrok.io/webhook`


GCloud
------

[Google Cloud CLI](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)

Add to PATH: `%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin`  
BATCH: `SET PATH=%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin;%PATH%;`  
PS1: `$env:PATH = $env:LOCALAPPDATA + "\Google\Cloud SDK\google-cloud-sdk\bin;" + $env:PATH`

```ps1
gcloud init

# To change:
gcloud help config
gcloud config set project
```

Set environment variable to the location of `google-app-creds.json`.
(json file will be shared on Slack)

```ps1
# Bash
export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"

# PowerShell
$env:GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"

# Batch
set GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH

# Test if the token works
gcloud auth application-default print-access-token
```
