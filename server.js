const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const http = require("http");
//const serverless = require("serverless-http")
const auth = require("./src/middlewares/auth.middleware");
require("dotenv").config();
//import all routes
const usersRoutes = require("./src/routes/user.route");
const consigneRoutes = require("./src/routes/consigne.route");
const professionRoutes = require("./src/routes/profession.routes");
const motifRoutes = require("./src/routes/motif.route");
const lieuRoutes = require("./src/routes/lieu.route");
const extLieuRoutes = require("./src/routes/extLieu.route");
const structureRoute = require("./src/routes/centre.routes");
const practitiensRoutes = require("./src/routes/practitioner.route");
const extPractitiensRoutes = require("./src/routes/extPraticiens.route");
const patientRoutes = require("./src/routes/patient.route");
const specialitiesRoutes = require("./src/routes/specialty.route");
const extSpecialitiesRoutes = require("./src/routes/extSpeciality.route");
const rightsRoutes = require("./src/routes/right.route");
const groupsRoutes = require("./src/routes/group.route");
const civilitiesRoutes = require("./src/routes/civility.route");
const appointmentRoutes = require("./src/routes/appointment.route");
const extUserToutes = require("./src/routes/extUser.route");
const notificationRoutes = require("./src/routes/notification.route");

const connectDB = require("./src/loaders/mongoose");
const { startServer } = require("./src/helpers");
const { verifyToken } = require("./src/routes/verifyToken");
const { disconnectUser } = require("./src/routes/disconnectUser");
const { OrdonnanceOphtaRouter } = require("./src/routes/ordonnance.route");
const MontureRouter = require("./src/routes/monture.route");
const VenteRouter = require("./src/routes/vente.route");
const CashOperationRouter = require("./src/routes/cashOperation.route");

const isProd = process.env.IS_PROD === "true"? true : false;
const BO_URL = isProd? process.env.BO_PROD_URL : process.env.BO_TEST_URL;

console.log("BO Link", BO_URL);


const app = http.createServer(server, {
  cors: {
    origin: "*",
  },
});
const io = require("./socket").initialize(app);

io.on("connection", (socket) => {
  setTimeout(() => {
    socket.emit("connected", "user connected");
    console.log("event emitted");
  }, 2000);

  socket.on("setUserId", (userId) => {
    console.log("romm id: ", userId);
    socket.join(userId);
    socket.emit("saved", "user saved");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});



const allowedOrigins = process.env.NODE_ENV === "production" ? [BO_URL] : ['http://localhost:3000',"*"] ;

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);  // Autoriser les requêtes locales sans origine définie
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'cette origine n\'est pas autorisée.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: true,
    allowedHeaders: ['Authorization', 'Content-Type', "Access-Control-Allow-Origin"],
    credentials: true,
  })
);
server.use(express.static("public"));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
server.use("/users", usersRoutes);
server.use("/ext_users", extUserToutes);
server.use("/motif", motifRoutes);
server.use("/consignes", consigneRoutes);
server.use("/practitiens", practitiensRoutes);
server.use("/ext_practitiens", extPractitiensRoutes);
server.use("/ext_specialites", extSpecialitiesRoutes);
server.use("/specialites", specialitiesRoutes);
server.use("/patients", patientRoutes);
server.use("/structure", structureRoute);
server.use("/lieu", lieuRoutes);
server.use("/ext_lieu", extLieuRoutes);
server.use("/droits", rightsRoutes);
server.use("/groupes", groupsRoutes);
server.use("/civilites", civilitiesRoutes);
server.use("/profession", professionRoutes);
server.use("/appointments", appointmentRoutes);
server.use("/notifications", notificationRoutes);
server.post("/verifyToken", verifyToken);
server.post("/disconnect", disconnectUser);
server.use("/ordonnance/ophta", OrdonnanceOphtaRouter)
server.use("/montures", MontureRouter);
server.use("/ventes", VenteRouter);
server.use("/cash-operations", CashOperationRouter);
server.get("/checkVersion", (req, res) => {
  res.send(new Date().toLocaleDateString());
});

server.get("/timeZone", (req, res) => {
  const date = new Date();
  const timezone = date.getTimezoneOffset() / 60;
  res.status(200).json({ timezone: `UTC${timezone >= 0 ? '-' : '+'}${Math.abs(timezone)}` });
});

// Gestionnaire d'erreurs global
server.use((err, req, res, next) => {
  if (err) {
    // Envoyer une réponse d'erreur au client
    res.status(500).json({
      error: {
        message: err.message,
      },
    });
  } else {
    next();
  }
});
startServer({ connectDB, server: app, startServer, PORT });


 // export default app