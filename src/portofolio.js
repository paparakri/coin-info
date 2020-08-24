const electron = require('electron')
const path = require('path')
const url = require('url')
const Store = require('electron-store');
const store = new Store();

const BrowserWindow = electron.remote.BrowserWindow

console.log(store.get('theme'))

function refresh(){
	var nameArray = localStorage.getItem('names').split(',');
	counter = localStorage.getItem('counter');

	for (var name=0;name<counter-1;name++){
		if(localStorage.getItem(nameArray[name]) !== null){
			if(localStorage.getItem(nameArray[name]) !== '0'){

				try{
					document.getElementById(nameArray[name]).parentElement.removeChild(document.getElementById(nameArray[name]));
					document.getElementById(nameArray[name]+'par').parentElement.removeChild(document.getElementById(nameArray[name]+'par'));
					document.getElementById(nameArray[name]+'br').parentElement.removeChild(document.getElementById(nameArray[name]+'br'));
				}
				catch(err){
					console.log(err)
				}

				var breakL = document.createElement("BR");
				breakL.id = nameArray[name] + 'br'
				document.body.appendChild(breakL)

				var header = document.createElement("H3");
				var text = document.createTextNode(nameArray[name].toUpperCase());
				header.appendChild(text);
				header.id = nameArray[name];
				document.body.appendChild(header);
				header.style.display = 'inline';

				var par = document.createElement("P");
				var parText = document.createTextNode("=> Amount: " + localStorage.getItem(nameArray[name]));
				par.appendChild(parText);
				par.id = nameArray[name] + 'par';
				document.body.appendChild(par);
				par.style.display = 'inline';
			}
		}
	}
}

function newEntry(){
    const modalPath = path.join('file://', __dirname, 'newEntry.html')
   	let win = new BrowserWindow({frame: true, alwaysOnTop: true, width: 225, height:400})
    win.on('close', function() {win=null})
    win.loadURL(modalPath)
    win.show()
    //win.webContents.openDevTools()
}

typeof(element) != 'undefined' && element != null

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
setInterval(refresh, 1000);
