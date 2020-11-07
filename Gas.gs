//==============================
function sendGasTelegramMessage(){
  text = "";
  sendTelegramMessage(text);
}

//==============================
function searchForGasBills(){
  const q_gas = 'is:unread from: outgoing@icount.co.il‏';
  return searchEmail(q_gas);
}

//==============================
function labelAndArchiveGas(thread){
  gasLabels = [];
  labelAndArchive(thread, gasLabels);
}

//==============================
function uploadGasLink(thread){
  folderId = ''
  const msgBody = thread.getMessages()[0].getBody();
  const msgDate = getMessageDate(thread);
  const link = extractBillsLink(msgBody);
  fileName = msgDate + "-Gas.html";
  uploadLinkToDrive(link, fileName , folderId);
}

//==============================
function monitorGasBills(){
  
  gasBillsSearchResults = searchForGasBills();
  
  if(gasBillsSearchResults.length > 0){
    uploadGasLink(gasBillsSearchResults[0]);
    labelAndArchiveGas(gasBillsSearchResults[0]);
    sendGasTelegramMessage();
  }

}
