//==============================
function sendWaterTelegramMessage(){
  text = "";
  return sendTelegramMessage(text);
}

//==============================
function searchForWaterBills(){
  const q_water = 'from:noreply@emka.co.il is:unread subject:"חשבון תקופתי"';
  return searchEmail(q_water);
}

//==============================
function labelAndArchiveWater(thread){
  waterLabels = [];
  labelAndArchive(thread, waterLabels);
}

//==============================
function uploadWaterBills(thread){

  const waterFolderId = '';
  
  const msgs = thread.getMessages();
  const msgDate = getMessageDate(thread);

  if(msgs.length > 1){ Logger.log("Unexpected amount of messages"); return -1;}
  
  const files = msgs[0].getAttachments();
  
  file = getBiggestAttachment(files);
  
  res = uploadFilesToDrive(file, msgDate + "-" + file.getName(), waterFolderId);
  return res;
}


//==============================
function monitorWaterBills(){
  
  WaterBillsSearchResults = searchForWaterBills();
  
  if(WaterBillsSearchResults.length > 0){
    uploadWaterBills(WaterBillsSearchResults[0]);
    labelAndArchiveWater(WaterBillsSearchResults[0]);
    sendWaterTelegramMessage();
  }

}
