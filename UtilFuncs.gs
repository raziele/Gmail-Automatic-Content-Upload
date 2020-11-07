//==============================
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//==============================
function extractFileLink(msg) {
  return /(https:\/\/[\w_-]+(?:(?:\.[\w_-]+)+)[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)/.exec(msg);
}

//==============================
function sendTelegramMessage(text = "testSendTelegramBill", 
                             chatID = PLACE_CHADID_HERE_AS_NUMBER, 
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

//==============================
function searchEmail(q){
  return GmailApp.search(q);
}

//==============================
function labelAndArchive(thread, labels){
  currentLabels = thread.getLabels();
  userLabelsNames = GmailApp.getUserLabels().map(label => label.getName());
  const newLabels = labels.filter(label => userLabelsNames.indexOf(label) == -1);
  
  newLabels.forEach(newName => GmailApp.createLabel(newName));
  labels.forEach(label => thread.addLabel(GmailApp.getUserLabelByName(label)));
  
  thread.markRead();
  thread.moveToArchive();
}

//==============================
function uploadFilesToDrive(file, fileName, folderId){
  
  fileDrive = DriveApp.createFile(file.copyBlob());
  fileDrive.setName(fileName);
  fileDrive.moveTo(DriveApp.getFolderById(folderId));
  return 0;  
}

//==============================
function extractBillsLink(msgBody){
  //const msgBody = thread.getMessages()[0].getBody();
  const link = extractFileLink(msgBody)[0];
  return link;
}

//==============================
function uploadLinkToDrive(url, name, folderId){
  var response = UrlFetchApp.fetch(url).getAs("text/html");
  fileDrive = DriveApp.createFile(response).setName(name);
  fileDrive.moveTo(DriveApp.getFolderById(folderId));

}

//==============================
function getMessageDate(thread) {
  return thread.getLastMessageDate().toISOString().substring(0, 10);
}

//==============================
function getBiggestAttachment(files){
  const fileSizes = files.map(file => file.getSize());
  biggestFileSize = Math.max(...fileSizes);
  
  return files[fileSizes.indexOf(biggestFileSize)];   
}
