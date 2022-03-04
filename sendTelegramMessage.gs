function sendTelegramMessage(text = "Your message here", 
                             chatID = PLACE_CHATID_HERE_AS_NUMBER, 
                             token="PLACE_YOUR_TOKEN_HERE"){ 
                    
  var msg = {
    'chat_id': chatID,
    'text': text
  };
  var method = 'sendMessage';
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(msg)
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
  
}
