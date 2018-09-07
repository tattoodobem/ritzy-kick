
const request = require('request');

/*
* call to facebbok to send the message
*/

function sendMessage(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData,
    }, (error, response) => {
      if (!error && response.statusCode === 200) {
        console.log('All good job is done')
      } else {
        console.error(
        `Failed calling Messenger API endpoint`,
        response.statusCode,
        response.statusMessage
      );
      }
    })
}

/*``
* type of message to send back
*/

function replyMessage(recipientId, messageText) {
    const messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageText,
      },
    }
    sendMessage(messageData);
}
function sendReadReceipt (recipientId) {
    const messageData = {
      recipient: {
        id: recipientId,
      },
       sender_action: 'mark_seen',
    }
    sendMessage(messageData);
}
function replyCard(recipientId, option) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: option.title,
            buttons: [{
              type: option.buttons[0].type,
              url: option.buttons[0].value,
              title: option.buttons[0].title,
            }],
          }],
        },
      },
    },
  }
  sendMessage(messageData)
}
function replyButton(recipientId, option) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: option.elementsTitle,
            buttons: [{
              type: option.buttonType,
              url: option.buttonUrl,
              title: option.buttonTitle,
            }],
          }],
        },
      },
    },
  }
  sendMessage(messageData)
}


module.exports = {
  replyMessage,
  replyButton,
  sendReadReceipt,
  replyCard,
}