const sprintfJs = require("sprintf-js");

const sql = require("./app/models/db");

const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/api", (req, result) => {
  //res.json({ message: "Welcome to bezkoder ." });

  sql.query("SELECT * FROM auction_list", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  });
});

app.get("/getCollection", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
   let query = sprintfJs.sprintf("SELECT * FROM collection WHERE nftID = %s", req.query.id);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/getBidList", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("SELECT * FROM bid_history WHERE nftID = '%s'", req.query.tokenid);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/placeAuction", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  console.log("wrapper ===============> ", req.query.wrapper);
  let query = sprintfJs.sprintf("INSERT INTO collection (nftID, ownerAddr, nftIpfs, saleDeadLine, initialPrice, level, topBidAddr, topBidPrice, description, isOnSale, nftName, saleCreated, isTokenClaimed, isNFTClaimed) VALUES (%d, '%s', '%s', '%s', %d, %d, '0x...', %d, '%s',1, '%s', '%s', %d, %d)", 
    req.query.tokenid, req.query.owner, req.query.uri, req.query.date, req.query.price, req.query.level, req.query.price, req.query.description, req.query.name, req.query.createdTime, 0, 0);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/placeBid", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("INSERT INTO bid_history (nftID, bidder, bidPrice, bidTime) VALUES (%d, '%s', %d, '%s')", 
    req.query.tokenid, req.query.bidder, req.query.bidAmount, req.query.date);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/getAuctionList", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  // console.log("called!!!!!!!!!!!!!!!!");
  let query = sprintfJs.sprintf("SELECT * FROM collection WHERE isOnSale=1", req.query.address);
  console.log("address ==============> ", req.query.address);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/setSaleStateFalse", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("UPDATE collection SET isOnSale = 0 WHERE nftID=%d", req.query.tokenid);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/claimNFT", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("UPDATE collection SET isOnSale = 0 WHERE nftID=%d", req.query.tokenid);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  let query1 = sprintfJs.sprintf("DELETE FROM bid_history WHERE nftID=%d", req.query.tokenid);
  sql.query(query1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  let query2 = sprintfJs.sprintf("DELETE FROM collection WHERE nftID=%d", req.query.tokenid);
  sql.query(query2, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/claimToken", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("UPDATE collection SET isOnSale = 0 WHERE nftID=%d", req.query.tokenid);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  let query1 = sprintfJs.sprintf("DELETE FROM bid_history WHERE nftID=%d", req.query.tokenid);
  sql.query(query1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  let query2 = sprintfJs.sprintf("DELETE FROM collection WHERE nftID=%d", req.query.tokenid);
  sql.query(query2, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

app.get("/closeAuction", (req, result) => {
  // res.json({ message: "Welcome to bezkoder ." });
  let query = sprintfJs.sprintf("UPDATE collection SET isOnSale = 0 WHERE nftID=%d", req.query.tokenid);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", res);
    result.json(res);
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  let query1 = sprintfJs.sprintf("DELETE FROM bid_history WHERE nftID=%d", req.query.tokenid);
  sql.query(query1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  });
  let query2 = sprintfJs.sprintf("DELETE FROM collection WHERE nftID=%d", req.query.tokenid);
  sql.query(query2, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //result(null, { id: res.insertId, ...newTutorial });
  }); 
  // console.log("id ==========> ", req.query.id);
  // result.json(req.query.id);
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// tokenid:tokenid,
//         owner:owner,
//         uri:uri,
//         date:date,
//         price:price,
//         level:level,
//         description:description


