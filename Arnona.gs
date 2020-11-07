//==============================
function sendArnonaTelegramMessage(){
  text = "YOUR_TEXT_HERE";
  return sendTelegramMessage();
}

//==============================
function searchForArnonaBills(){
  const q_arnona = 'is:unread from:iula subject:\"ארנונה\"';
  return searchEmail(q_arnona);
}

//==============================
function labelAndArchiveArnona(thread){
  arnonaLabels = []; // lIST OF GMAIL LABELS E.G "BILLS", "ARNONA_BILLS" ETC.
  labelAndArchive(thread, arnonaLabels);
}

//==============================
function uploadArnonaBills(thread){

  const arnonaFolderId = 'DRIVE_FOLDER_ID_TO_UPLOAD_BILLS';
  
  const msgs = thread.getMessages();
  const msgDate = getMessageDate(thread);

  if(msgs.length > 1){ Logger.log("Unexpected amount of messages"); return -1;}
  
  const files = msgs[0].getAttachments();
  
  file = getBiggestAttachment(files);

  res = uploadFilesToDrive(file, msgDate + file.getName(), arnonaFolderId);
  return res;
}

//==============================
function monitorArnonaBills(){
  
  arnonaBillsSearchResults = searchForArnonaBills();
  
  if(arnonaBillsSearchResults.length > 0){
    labelAndArchiveArnona(arnonaBillsSearchResults[0]);
    uploadArnonaBills(arnonaBillsSearchResults[0]);
    sendArnonaTelegramMessage();
  }

}
