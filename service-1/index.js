const express = require("express");
const app = express();
const PORT = 5001;
const amqp = require("amqplib");
const bp = require("body-parser");
var channel, connection;

app.use(bp.json());
connect();
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("session");
    } catch (ex) {
        console.error(ex);
    }
}
app.listen(PORT, () =>{
    console.log("Server is Running");
})



app.get("/send", (req,res)=>{
    const fakeDate = { name: "Soumyadip", company: "Redhat"};
    await channel.sendToQueue("rabbit",Buffer.from(JSON.stringify(fakeData)));
});