# Gmail Automatic Content Upload

A simple Google App Script to automatically search for specific emails, extract their content and upload it to a selected folder on Google Drive.

## Why?

I've written these scripts after trying some low-code automation tools.
From time to time, Google modifies the way 3rd party tools can interact with Google ecosystem which breaks every related automations. 
The only way to make the automation stable is to use Google own capabilities.

## Use-Cases

I use this script to organize bills sent by Israeli local municipalities, however it may be adapted to whatever scenrario one might need.

## Features

- Easy to use: just follow the steps on 
- Privacy: run your script on your own environment, without exposing your data to 3rd party tools
- Get notified: the script includes the ability to send a message on Telegram
- Run manually or automatically; Google offers several options in this area
- Support content as a form of an email attachement or as a link

## How To Use

1) go to script.google.com.
2) click "New project" and get to the editor screen.
3) Create a file named EmailInspector.gs and copy the content of the file in this repo into this file.
4) Create a file named "main.gs" and copy to content of Example.gs to the new file you created.
5) Inside main.gs, modify the variables under the "main" function according to your needs. Don't forget to save! 
6) At this point, you may click "run" to make sure everything works.

To set up the script to run automatically:

7) Click the "Triggers" icon on the left area and click "Add Trigger".
8) Make sure "Choose which function to run" is set to "main". 
9) Change the "Select event source", "Select type of time based trigger" and "Select hour interval" according to your needs. Leave everything else unchanged. 
10) Click "Save".

## Bonus: send a message on Telegram
sendTelegramMessage.gs allows you to send messages through telegram.
To use it, follow the instruction on Telegram website to get API credentials and chat ID.

## Limitations

- The script support only links that don't require login
