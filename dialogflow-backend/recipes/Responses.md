WebHook Responses
=================

```json
{
    "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "That's great to hear! We have several open vacancies."
                ]
            }
        },
        {
            "quickReplies": {
                "quickReplies": [
                    "Quick Reply"
                ]
            }
        },
        {
            "card": {
                "title": "Title: this is a card title",
                "subtitle": "This is the body text of a card.  You can even use line\n  breaks and emoji! 💁",
                "imageUri": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                "buttons": [
                    {
                        "text": "This is a button",
                        "postback": "https://assistant.google.com/"
                    }
                ]
            }
        }
    ],
    "outputContexts": []
}
```
