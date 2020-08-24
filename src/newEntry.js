const electron = require('electron')
const path = require('path')
const url = require('url')
const Store = require('electron-store');
const store = new Store();

function portFunction() {
    // Declare variables
    var input, filter, ul, li, button, i;
    input = document.getElementById('portInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("portUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        button = li[i].getElementsByTagName("button")[0];
        if (button.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const BrowserWindow = electron.remote.BrowserWindow

function port_click(name){
    localStorage.setItem('addItem', name);
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({frame: true, alwaysOnTop: true, width: 250, height:200})
    win.on('close', function() {win=null})
    win.loadURL(modalPath)
    win.show()
    //win.webContents.openDevTools()
}


var counter = 0;
function checkTheme(){
    if(store.get('theme') === -1){
        if(counter === 0){
            console.log('darkTheme')
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.id = 'theme'
            link.href = '../assets/css/dark-theme.css';
            link.media = 'all';
            head.appendChild(link);
            counter += 1;
        }
        else {
            document.getElementById('theme').href = '../assets/css/dark-theme.css';
        }
    }

    else {
        try{
            document.getElementById('theme').href = '';
        }
        catch(err){
            console.log(err)
        }
    }
}

checkTheme()

setInterval(checkTheme, 1000);