import mongoose from "mongoose";

const highscoreSchema = mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  points: {
    type: Number,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  collection: "highscores",
  timestamps: true,
});



highscoreSchema.statics.getTopXPlayer = async function({ amount = 10, dir = -1, showOnly = "points name date color -_id" } = {}) {
  if( dir === "asc" ) {
    dir = 1
  }
  else {
    dir = -1
  }

  return await this.find({}, showOnly).sort({ points: dir, createdAt: 1 }).limit(amount);
}

highscoreSchema.statics.delPlayerNotInTopX = async function() {
  const arrayTopXPlayer = await this.getTopXPlayer({ showOnly: "_id" });
  return await this.deleteMany({ _id: { $nin: arrayTopXPlayer } } );
}

export default mongoose.model("Highscore", highscoreSchema);