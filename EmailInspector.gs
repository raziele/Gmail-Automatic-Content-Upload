class EmailInspector {
  constructor(query, folderId, labels, isContentALink = false) {
    this.query = query;
    this.folderId = folderId;
    this.labels = labels;
    this.isContentALink = isContentALink;
  };
  
  run(){
    this.results = this.getSearchResults();
    const msg = [this.results.length, "messages found"]; 
    Logger.log(msg.join(' '));
    if(this.results.length > 0){
      this.processResults();
    }
  };

  getSearchResults(){
    return GmailApp.search(this.query);
  };

  processResults(){
    this.results.forEach((r) => {
      const res = this.uploadContent(r);
      if(res < 0){ return;}
      this.labelAndArchive(r, this.labels);
  });
  };
  
  uploadContent(thread){
  
    const msgDate = this.getMessageDate(thread);

    if(this.isContentALink == true){

      const msgBody = thread.getMessages()[0].getBody();
      const link = this.extractContentLink(msgBody);
      const fileName = msgDate + "-Content.html";
      this.uploadLinkToDrive(link, fileName , this.folderId);
  
    }
    else{
    
      const msgs = thread.getMessages();

      if(msgs.length > 1){ Logger.log("Unexpected amount of messages"); return -1;}
  
      const files = msgs[0].getAttachments();
      const file = this.getBiggestAttachment(files);
      const res = this.uploadFilesToDrive(file, msgDate + "-" + file.getName(), this.folderId);

      if(res < 0){ return -1; }

      return res;
      };
  };

  labelAndArchive(thread, labels){
    const currentLabels = thread.getLabels();
    const userLabelsNames = GmailApp.getUserLabels().map(label => label.getName());
    const newLabels = labels.filter(label => userLabelsNames.indexOf(label) == -1);
  
    newLabels.forEach(newName => GmailApp.createLabel(newName));
    labels.forEach(label => thread.addLabel(GmailApp.getUserLabelByName(label)));
  
    thread.markRead();
    thread.moveToArchive();
  };

  uploadFilesToDrive(file, fileName, folderId){
  var blob = file.copyBlob();
  const folder = DriveApp.getFolderById(folderId);
  try{
    var fileDrive = DriveApp.createFile(blob);
    fileDrive.setName(fileName);
    fileDrive.moveTo(folder);
  }
  catch(e){
    Logger.log(e);
    return -1;
  }
  return 0;  
  };

  extractContentLink(msgBody){
    return extractFileLink(msgBody)[0];
  };
  
  extractFileLink(msg) {
    return /(https:\/\/[\w_-]+(?:(?:\.[\w_-]+)+)[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)/.exec(msg);
  };

  uploadLinkToDrive(url, name, folderId){
    var response = UrlFetchApp.fetch(url).getAs("text/html");
    fileDrive = DriveApp.createFile(response).setName(name);
    fileDrive.moveTo(DriveApp.getFolderById(folderId));
  };

  getMessageDate(thread) {
    return thread.getLastMessageDate().toISOString().substring(0, 10);
  };

  getBiggestAttachment(files){
    const fileSizes = files.map(file => file.getSize());
    const biggestFileSize = Math.max(...fileSizes);
    return files[fileSizes.indexOf(biggestFileSize)];   
  };

};
