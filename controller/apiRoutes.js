module.exports = function (app, path, bodyParser, request, BFX, io) {

  const API_KEY = "PfH9p2vX4oUReR0gBC1gbj3deYhWcaKkot2zNELE6NT";
  const API_SECRET = "ClSGqdAPsDdG0JotzYiSi1GagHuGFSKwpX11W0GeJmN";

  const opts = {
    version: 2,
    transform: true
  }

  const bws = new BFX(API_KEY, API_SECRET, opts).ws

  var btc = [];
  var ltc = [];
  var eth = [];
  var iot = [];
  var etc = [];
  var dsh = [];
  var xrp = [];
  var bcc = [];
  var xmr = [];

  bws.on('open', (ticker) => {
    bws.subscribeTicker('BTCUSD');
    bws.subscribeTicker('LTCUSD');
    bws.subscribeTicker('ETHUSD');
    bws.subscribeTicker('IOTUSD');
    bws.subscribeTicker('ETCUSD');
    bws.subscribeTicker('DSHUSD');
    bws.subscribeTicker('XRPUSD');
    bws.subscribeTicker('BCCUSD');
    bws.subscribeTicker('XMRUSD');

  });

  bws.on('ticker', (pair, ticker) => {

    if (pair == "tBTCUSD") {
      btc.shift();
      btc.push(ticker);
    } else if (pair == "tLTCUSD") {
      ltc.shift();
      ltc.push(ticker);
    } else if (pair == "tETHUSD") {
      eth.shift();
      eth.push(ticker);
    } else if (pair == "tIOTUSD") {
      iot.shift();
      iot.push(ticker);
    } else if (pair == "tETCUSD") {
      etc.shift();
      etc.push(ticker);
    } else if (pair == "tDSHUSD") {
      dsh.shift();
      dsh.push(ticker);
    } else if (pair == "tXRPUSD") {
      xrp.shift();
      xrp.push(ticker);
    } else if (pair == "tBCCUSD") {
      bcc.shift();
      bcc.push(ticker);
    } else if (pair == "tXMRUSD") {
      xmr.shift();
      xmr.push(ticker);
    }

    if (btc.length > 0 && ltc.length > 0 && eth.length > 0 && iot.length > 0 && etc.length > 0 && dsh.length > 0 && xrp.length > 0 && bcc.length > 0 && xmr.length > 0) {
      console.log("BTC: " + btc[0].LAST_PRICE);
      console.log("LTC: " + ltc[0].LAST_PRICE);
      console.log("ETH: " + eth[0].LAST_PRICE);
      console.log("IOT: " + iot[0].LAST_PRICE);
      console.log("ETC: " + etc[0].LAST_PRICE);
      console.log("DSH: " + dsh[0].LAST_PRICE);
      console.log("XRP: " + xrp[0].LAST_PRICE);
      console.log("BCC: " + bcc[0].LAST_PRICE);
      console.log("XMR: " + xmr[0].LAST_PRICE);
    }

  });

  app.get("/", (req, res) => {
    res.render("index");
  });

  io.on('connection', function (socket) {
    socket.emit('btc', { message: btc[0]});
    socket.emit('ltc', { message: ltc[0]});
    socket.emit('eth', { message: eth[0]});
    socket.emit('iot', { message: iot[0]});
    socket.emit('etc', { message: etc[0]});
    socket.emit('dsh', { message: dsh[0]});
    socket.emit('xrp', { message: xrp[0]});
    socket.emit('bcc', { message: bcc[0]});
    socket.emit('xmr', { message: xmr[0]});
    setInterval(function () {
      socket.emit('btc', { message: btc[0]});
      socket.emit('ltc', { message: ltc[0]});
      socket.emit('eth', { message: eth[0]});
      socket.emit('iot', { message: iot[0]});
      socket.emit('etc', { message: etc[0]});
      socket.emit('dsh', { message: dsh[0]});
      socket.emit('xrp', { message: xrp[0]});
      socket.emit('bcc', { message: bcc[0]});
      socket.emit('xmr', { message: xmr[0]});
    }, 5000);

  });

  // app.get("/", (req, res) => {
  //   var options =
  //     {
  //       method: "GET",
  //       url: "https://api.bitfinex.com/v1/pubticker/btcusd"
  //     };
  //
  //   request(options, (error, response, body) => {
  //     if (error) throw new Error(error);
  //     var body = JSON.parse(body);
  //     console.log(body);
  //     res.render("index", { ticker: body });
  //   }); // END REQUEST
  //
  // }); // END APP.GET FOR HOMEPAGE

}; // END MODULE.EXPORTS