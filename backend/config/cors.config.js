const whitelist = ["http://localhost:3000", "http://127.0.0.1:5500", "https://snake-game-frontend.onrender.com"];
export default {
  origin: function(origin, callback) {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "PUT", "DELETE", "POST"],
}