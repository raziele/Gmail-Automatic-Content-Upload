
function main() {
  const unread = 'is:unread in:inbox';
  const gmailQuery = ['from:bills@providerX.com', unread].join(' ');
  const folderID = 'GOOGLE_DRIVE_FOLDER_ID';
  const emailLabels = ['Bills/providerX'];
  
  providerXbills = new EmailInspector(gmailQuery, folderID, emailLabels);

  providerXbills.run();
}
