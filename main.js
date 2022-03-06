const electron = require('electron');
const path = require('path');
const url = require('url');

process.env.NODE_ENV = 'development';

const {app, BrowserWindow,Menu} = electron;

let mainWindow;

app.on('ready', function(){
    mainWindow=new BrowserWindow({})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes:true
      }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function PaintWindow(){
    var child = require('child_process').execFile;
    var executablePath = "mspaint.exe";
    
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}

function NotePadWindow(){
    var child = require('child_process').execFile;
    var executablePath = "notepad.exe";
    
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}


const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
         {
            label:'Paint',
            click(){
                PaintWindow();
            }
         },
         {
            label:'Note Pad',
            click(){
               NotePadWindow();
              }
         },
         {
             label:'Quit',
             accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
             click(){
                 app.quit();
             }
         }
        ]
    }
];

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }