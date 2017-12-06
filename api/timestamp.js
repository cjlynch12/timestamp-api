var moment = require('moment');

module.exports = function(app){
  app.get('/:time',function(req,res){
    var time = req.params.time;
    var unix = null;
    var natural = null;
    
    function unixToNat (val) {
      return moment.unix(val).format('MMMM D, YYYY');
    }
    
    function natToUnix (val) {
      return moment(val, "MMMM D, YYYY").format("X");
    }
    
    if (time >= 0) {
      unix = time;
      natural = unixToNat(time);
    } else if (isNaN(time) && moment(time,"MMMM D,YYYY").isValid()) {
        unix = natToUnix(time);
        natural = time;
    } 
      var timeObj = {'unix': unix, 'natural': natural};
      res.send(timeObj);
    })
}