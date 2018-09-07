
const messages = require('./facebook.js');

const recastai = require('recastai').default
 
var client = new recastai(process.env.RECAST_TOKEN, process.env.LANGUAGE);

var build = new recastai.build(process.env.RECAST_TOKEN, process.env.LANGUAGE)



function handleMessage(event) {
  const senderID = event.sender.id
  const messageText = event.message.text
  const messageAttachments = event.message.attachments
  messages.sendReadReceipt(senderID);
  if (messageText) {
    
    
build.dialog({ type: 'text', content: messageText}, { conversationId: senderID })
  .then(function(res) {
    console.log(res)
//  })
    
//    client.textConverse(messageText, { conversationToken: senderID }).then((res) => {
                   /* To get the first reply of your bot. */
           /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */
      const replies = res.messages            /* An array of all your replies */
if(replies.length > 0){
  var reply = res.messages[0].content  
      if (!reply) {
        const options = {
          messageText: null,
          buttonTitle: 'My first button',    /* Option of your button. */
          buttonUrl: 'https://recast.ai/',   /* If you like more option check out ./facebook.js the function replyButton, and look up */
          buttonType: 'web_url',             /* the facebook doc for button https://developers.facebook.com/docs/messenger-platform/send-api-reference#message */
          elementsTitle: 'I don\'t get it :(',
        }
        messages.replyButton(senderID, options)        /* to reply a button */
      } else {
        replies.forEach(rep => {
          console.log(rep);
           console.log(rep.content);
          
          if(rep.type==='card')
            messages.replyCard(senderID,rep.content);
          else
          messages.replyMessage(senderID,rep.content);
        })
      }
}else{

}    
}).catch(err => {
      console.log(err)
    })
  } else if (messageAttachments) {
    messages.replyMessage(senderID, 'Message with attachment received')
  }
}
module.exports = {
  handleMessage,
}