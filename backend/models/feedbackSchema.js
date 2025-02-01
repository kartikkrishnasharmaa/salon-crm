const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["feedback", "complaint"], required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    response: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);
