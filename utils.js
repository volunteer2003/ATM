// Generated by CoffeeScript 1.6.1
(function() {
  var Response, dbconfig, redis;

  redis = require("redis");

  Response = require('./vo/Response').Response;

  dbconfig = require('./config').db;

  exports.authenticateUser = function(req, res) {
    var path, result;
    result = this.isLoginUser(req);
    path = "/login";
    if (this.isMobileClient(req)) {
      path = "/m/login";
    }
    if (!result) {
      res.redirect(path);
    }
    return result;
  };

  exports.isMobileClient = function(req) {
    var urlArray;
    urlArray = req.path.split("/");
    return urlArray[1] === "m";
  };

  exports.isLoginUser = function(req) {
    var _ref;
    return ((_ref = req.session) != null ? _ref.userId : void 0) && true;
  };

  exports.authenticateAdmin = function(req, res) {
    var result;
    result = this.isAdmin(req);
    if (!result) {
      if (this.isLoginUser(req)) {
        res.redirect('/show');
      } else {
        res.redirect('/login');
      }
    }
    return result;
  };
  
  exports.isAdmin = function(req) {
	console.log('isLoginUser(req):' + this.isLoginUser(req));
	//console.log('req.session.isAdmin:' + req.session.isAdmin;
    return this.isLoginUser(req) && req.session.isAdmin === 1;
	//return true;
  }; 

  exports.showDBError = function(callback, client, message) {
    if (client == null) {
      client = null;
    }
    if (message == null) {
      message = 'Database error!';
    }
    if (client) {
      client.quit();
    }
    return callback(new Response(0, message));
  };
    
  exports.createClient = function() {
    var client;
    client = redis.createClient(dbconfig.port, dbconfig.host);
    if (dbconfig.pass) {
      client.auth(dbconfig.pass, function(err) {
        if (err) {
          throw err;
        }
      });
    }
    client.on("error", function(err) {
      console.log(err);
      return client.end();
    });
    return client;
  };
  
  getDateStr1 = function(date, page) {
	var month, today, year, day;

	date = new Date();
	day_new = new Date();
	
	console.log('utils-getDateStr1 page:' + page);
	
	day_new.setDate(date.getDate() - date.getDay() + 4 + (page - 1)*7);
	year = day_new.getFullYear();
    month = day_new.getMonth() + 1;
	day = day_new.getDate();
	console.log('utils-getDateStr1 return: ' + year + '-' + month + '-' + day);	
		
	return "" + year + "-" + month + "-" + day;
  }
  
  
  getDateStr = function(date) {
      var month, today, year, day;
	  var month_first, day_first, year_first; // for calc the first day and the last day of the week
	  var month_last, day_last, year_last;
	  
	  date = new Date();
      day = new Date();
	  day_new = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
	  day = date.getDate();
	  
	  // calc the fourth day of the week
	  day_new.setDate(date.getDate() - date.getDay() + 4);
	  year_first = day_new.getFullYear();
      month_first = day_new.getMonth() + 1;
	  day_first = day_new.getDate();
	  console.log('utils-getDateStr:' + year_first + "-" + month_first + "-" + day_first);
	  return "" + year_first + "-" + month_first + "-" + day_first;
    };
   
}).call(this);
