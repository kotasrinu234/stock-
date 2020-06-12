var express = require('express');
var router = express.Router();
var moment = require('moment');
var monk = require('monk');
var db = monk('localhost:27017/stock');
var col = db.get('login');
var col1=db.get('stock');
var col2=db.get('recieved');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res) {
  if(req.session && req.session.user){	
  res.locals.user = req.session.user
  res.render('home');
  }
  else{
  	res.redirect('/');
  }
});
router.get('/logout', function(req, res) {
  if(req.session && req.session.user){
  	req.session.reset();
  	res.redirect('/');
  }
});
router.post('/poststock',function(req,res){
  if(req.session && req.session.user){	
  res.locals.user = req.session.user
	var data = {
		username : req.session.user.username,
		college : req.body.college,
		Department : req.body.Department,
		name : req.body.name,
		date : moment(req.body.date).format('DD-MM-YYYY'),
		supplier : req.body.supplier,
		address : req.body.address,
		invioce : req.body.invioce,
		cost : req.body.cost,
		quantity : req.body.quantity,
		total : req.body.total,
		remarks : req.body.remarks,
		specifications : req.body.specifications,
		status : "new"
	}
	col1.insert(data,function(err,docs){
		if(err){
			res.sendStatus(500);

		}
		else {
			console.log(docs)
			res.send(docs)
		}
	})
}
})
router.post('/postlogin', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  col.findOne({"username":username,"password":password}, function(err,docs){
	if (!docs) {
		res.sendStatus(500);
	}
	else{
		delete docs.password
		console.log(docs);
		req.session.user = docs;
		res.send(docs);
	}
	
  })
})
router.post('/postuser',function(req,res){
	col.insert(req.body,function(err,docs){
		if(err){
			res.sendStatus(500);

		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})
router.get('/getstock',function(req,res){
	if(req.session && req.session.user){	
  res.locals.user = req.session.user
	col1.find({"status":"new","username":req.session.user.username},function(err,docs){
		if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)
		}
	});
}
});
router.put('/editStock/:id',function(req,res){
  // console.log(req.params.id);
  // console.log(req.body);
  if(req.session && req.session.user){	
  res.locals.user = req.session.user
  col1.update({"_id":req.params.id,"username":req.session.user.username},{$set:req.body}, function(err,docs){
  	if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)

		}

  });
}
});
  router.delete('/deletestock/:id',function(req,res){
  	if(req.session && req.session.user){	
  res.locals.user = req.session.user
  	console.log(req.params.id)
  	col1.remove({"_id":req.params.id,"username":req.session.user.username},function(err,docs){
  		if(err){
  			console.log(err);

  		}
  		else{
  			console.log(docs);
  			res.send(docs)
  		}
  	})
  }
  })

router.put('/condemendStock/:id',function(req,res){
	if(req.session && req.session.user){	
  res.locals.user = req.session.user
  col1.update({"_id":req.params.id,"username":req.session.user.username},{$set:{"status":"condemend"}}, function(err,docs){
  	if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)

		}

  });
}
});
router.get('/getcondemendstock',function(req,res){
	if(req.session && req.session.user){	
  res.locals.user = req.session.user
	col1.find({"status":"condemend","username":req.session.user.username},function(err,docs){
		if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)
		}
	});
}
});
router.put('/transferStock/:id',function(req,res){
	if(req.session && req.session.user){	
  res.locals.user = req.session.user
  col1.update({"_id":req.params.id},{$set:{"username":req.body.username}}, function(err,docs){
  col2.insert(req.body)
  	if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)

		}

  });
}
});
router.get('/recievedData', function(req,res){
	if(req.session && req.session.user){	
  res.locals.user = req.session.user
  col2.find({"username":req.session.user.username}, function(err,docs){
  	if(err){
			console.log(err);

		}
		else{
			console.log(docs);
			res.send(docs)

		}
  });
}
})
module.exports = router;
