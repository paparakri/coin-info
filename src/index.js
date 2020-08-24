const electron = require('electron')
const path = require('path')
const Store = require('electron-store');
const store = new Store();

function makeSidNav(){
    var navBar = document.getElementById("sidenav");
    navBar.style.height = '100%';
    navBar.style.width = '330px';
    navBar.style.position = 'fixed';
    navBar.style.zIndex = '1';
    navBar.style.top = '0';
    navBar.style.left = '0';
    navBar.style.backgroundColor = 'rgba(226, 226, 226, 0.75)';
    navBar.style.overflowX = 'hidden';
    navBar.style.paddingTop = '60px';
    navBar.style.transition = '0.5s';

    var searchBar = document.getElementById("myInput");
    var searchButton = document.getElementById("searchButton")
    searchBar.style.width = '200px';
    searchButton.style.width = '100px';
    searchButton.style.padding = '15px';
    searchButton.style.fontSize = '13px';
}

const BrowserWindow = electron.remote.BrowserWindow

function reload(){
    const Coinmarketcap = require('node-coinmarketcap-api');
    const coinmarketcap = new Coinmarketcap();

    (async () => {
        let coinInfo = await coinmarketcap.ticker(cryptoName);
        document.getElementById("cryptoName").innerHTML = coinInfo[0]['name'];
        document.getElementById("marketCap").innerHTML = "Market Cap: $" + parseFloat(coinInfo[0]['market_cap_usd']) + "  ";
        document.getElementById("priceInUSD").innerHTML = "( $" + parseFloat(coinInfo[0]['price_usd']) + " )";
      })();
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