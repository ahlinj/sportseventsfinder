const express = require("express")
const events = express.Router()
const db = require("../db/conn.js")

//Gets all the events in the DB 
events.get('/', async (req,res, next)=>{
    try{
        let queryResult=await db.allEvents()
        let queryResult2=await db.UniqueUsersInEvent()
        res.json({
            events:queryResult,
            uniqueUsers:queryResult2
        })
        console.log(queryResult)
        console.log(queryResult2)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})

//Join event
events.post('/join', async (req, res) => {
    let username = req.body.username
    let d_ID = req.body.d_ID
    try
        {
        let u_ID = await db.GetUserID(username)
    
         let queryResult=await db.JoinEvent(u_ID,d_ID)
         if (queryResult.affectedRows) {
            console.log("User has joined an event!!")
            res.sendStatus(200)
          }
        }
        catch(err){
            console.log("Error:"+err)
            res.sendStatus(500)
        }   
})

//Inserts a new event in our database id field are complete
events.post('/', async (req, res) => {
    
    let name = req.body.name
    let description = req.body.description
    let location = req.body.location
    let dateTime = req.body.dateTime
    let organization = req.body.organization
    if (name && description && location && dateTime && organization) 
    {
        try
        {
         let organizationID = await db.GetOrganizationID(organization);
         if (!organizationID) {
            console.log("Organization not found!")
            res.status(404).send("Organization not found")
            return;
         }

         let queryResult=await db.AddEvent(name,description,location,dateTime,organizationID)
         if (queryResult.affectedRows) {
            console.log("New event added!!")
          }
               
        }
        catch(err){
            console.log("Error:"+err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("A field is missing!")
    }

    res.end();

    
})

module.exports=events
