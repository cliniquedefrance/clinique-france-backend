const isProd = process.env.IS_PROD === "true"? true : false;
const DB_URL = isProd? process.env.PROD_DATABASE_URI : process.env.TEST_DATABASE_URI;


module.exports.env = {
    jwt: "e0woeirlwdmbvn[qpwr[owrhwe]]",
    DATABASE_URI: DB_URL,
    EXPIRE_DATE: 10000000000000,
    AUTHORIZATION: "key=AAAAKpmBdks:APA91bGRehBS2AkXgSfHvnpAVRw5IVyjobAqZ-wUOdP4i-rsSLZ9XZCJx8sJusvKOyn4A04PnR2IdENDpDLQyRf_sNHePXZ5Quk9Tw8qVaFari0Fx8y7Hv2L5ugWuMkmgWAQ4m0a8MHj",
    GOOGLE_NOTIFICATION_APIS_URL: "https://fcm.googleapis.com/fcm/send",
}