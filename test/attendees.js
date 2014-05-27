var request = require("request");
var should = require('chai').should();
var setup = require("./_setup.js")._setup;

describe('attendees', function(){

  before(function(done){
    setup.init(done);
  });

  after(function(done){
    // no teadrown needed at this time
    done();
  });

  it("/tcos/#{tco_id}/attendees should return an array of attendees", function(done){
    this.timeout(5000);
    attributes = ["id","tco_id","handle","name","avatar","type","email","country","quote","member_since","current_challenges"];
    tco_id = 'tco14';
    request.get(setup.testUrl + "/tcos/"+tco_id+"/attendees", function(err, res, body){
      body = JSON.parse(body);
      res.statusCode.should.equal(200);
      body.count.should.equal(2);
      body.response.should.be.an.instanceOf(Array);
      body.response[0].tco_id.should.equal(tco_id);
      body.response[1].tco_id.should.equal(tco_id);
      body.response[0].should.have.keys(attributes);
      done();
    });
  });

  it("/tcos/#{tco_id}/attendees?{type} should return an array of attendees with type", function(done){
    this.timeout(5000);
    attributes = ["id","tco_id","handle","name","avatar","type","email","country","quote","member_since","current_challenges"];
    tco_id = 'tco13';
    type = 'Blogger';
    request.get(setup.testUrl + "/tcos/"+tco_id+"/attendees?type="+type, function(err, res, body){
      body = JSON.parse(body);
      res.statusCode.should.equal(200);
      body.count.should.equal(1);
      body.response.should.be.an.instanceOf(Array);
      body.response[0].tco_id.should.equal(tco_id);
      body.response[0].type.should.equal(type);
      body.response[0].should.have.keys(attributes);
      done();
    });
  });

  it("/tcos/#{tco_id}/attendees/#{id} should return an attendee", function(done){
    this.timeout(5000);
    attributes = ["id","tco_id","handle","name","avatar","type","email","country","quote","member_since","current_challenges"];
    tco_id = 'tco14';
    id = 1;
    request.get(setup.testUrl + "/tcos/"+tco_id+"/attendees/"+id, function(err, res, body){
      body = JSON.parse(body);
      res.statusCode.should.equal(200);
      body.count.should.equal(1);
      body.response.should.be.an.instanceOf(Array);
      body.response[0].tco_id.should.equal(tco_id);
      body.response[0].id.should.equal(id);
      body.response[0].should.have.keys(attributes);
      done();
    });
  });

  it("/tcos/#{tco_id}/attendees?{handle} should return an array of attendees with type", function(done){
    this.timeout(5000);
    attributes = ["id","tco_id","handle","name","avatar","type","email","country","quote","member_since","current_challenges"];
    tco_id = 'tco14';
    handle = 'jeffdonthemic';
    request.get(setup.testUrl + "/tcos/"+tco_id+"/attendees?handle="+handle, function(err, res, body){
      body = JSON.parse(body);
      res.statusCode.should.equal(200);
      body.count.should.equal(1);
      body.response.should.be.an.instanceOf(Array);
      body.response[0].tco_id.should.equal(tco_id);
      body.response[0].handle.should.equal(handle);
      body.response[0].should.have.keys(attributes);
      done();
    });
  });

  it("/tcos/#{tco_id}/#{attendee_id}/unread-messages-count should return a count of unread messages", function(done){
    this.timeout(5000);
    tco_id = 'tco14';
    attendee_id = '2';
    request.get(setup.testUrl + "/tcos/"+tco_id+"/"+attendee_id+"/unread-messages-count", function(err, res, body){
      body = JSON.parse(body);
      res.statusCode.should.equal(200);
      body.count.should.equal(1);
      body.response.should.be.an.instanceOf(Array);
      body.response[0].count.should.equal("1");
      done();
    });
  });

});