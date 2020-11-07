//==============================
function sendElectricTelegramMessage(){
  text = "";
  return sendTelegramMessage(text);
}

//==============================
function searchForElectricBills(){
  const q_electric = 'is:unread from:noreplys@iec.co.il‏ subject:לתקופה';
  return searchEmail(q_electric);
}

//==============================
function labelAndArchiveElectric(thread){
  electricLabels = [];
  labelAndArchive(thread, electricLabels);
}

//==============================
function uploadElectricBills(thread){

  const electricFolderId = '';
  
  const msgs = thread.getMessages();
  const msgDate = getMessageDate(thread);

  if(msgs.length > 1){ Logger.log("Unexpected amount of messages"); return -1;}
  
  const files = msgs[0].getAttachments();
  
  file = getBiggestAttachment(files);
 
  res = uploadFilesToDrive(file, msgDate + file.getName(), electricFolderId);
  return res;
}

//==============================
function monitorElectricBills(){
  
  electricBillsSearchResults = searchForElectricBills();
  
  if(electricBillsSearchResults.length > 0){
    
    res = uploadElectricBills(electricBillsSearchResults[0]);
    if(res < 0){ Logger.log('Error in main'); return -1;}
    labelAndArchiveElectric(electricBillsSearchResults[0]);
    sendElectricTelegramMessage();
  }

}
