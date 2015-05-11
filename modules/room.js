/**
 * TODO file header
 */

var Questions = require('./questions');

function Room (data) {
  this.id             = data.room_id; //String
  this.name           = data.room_name; //String
  this.questions      = new Questions(); //questions object
  this.owner          = data.owner_id; //String
  this.bannedUsers    = {};  // Hash containing banned users
  this.warnedUsers    = {};  // Hash containing warned users
};

/**
 * Increments warnings for user in warnedUsers Hash.
 * calls banUser if user has already been warned
 *
 * @param data = user_id: String
 * @return number of warnings user has
 */
Room.prototype.warnUser = function(user_id) {
  if (!(user_id in this.warnedUsers))
    this.warnedUsers[user_id] = true;
  else
    this.banUser(user_id);

  return this.isBanned(user_id);
}

/**
 * Bans user, adding their user_id to bannedUsers Hash
 *
 * @param data = user_id: String
 * @return true if user_id succesfully added to bannedUsers Hash
 */
Room.prototype.banUser = function(user_id) {

  this.bannedUsers[user_id] = true;

  return (this.isBanned(user_id));
}

/**
 * Checks if user_id is in bannedUsers Hash
 *
 * @param data = user_id: String
 * @return true if user_id in bannedUsers Hash
 */
Room.prototype.isBanned = function(user_id) {
  return (user_id in this.bannedUsers);
}

Room.prototype.addQuestion = function(data) {
  return this.questions.addQuestion(data);
}

/** Checks to see if the question already exists. Adds the question to the
 * Room's Questions object if it doesn't.
 *
 * @param data = {room_id: String, question_text: String, asker_id: String}
 * @return newly created question
 */
Room.prototype.hasQuestion = function(questionId) {
  return this.questions.hasQuestion(questionId);
}
/**
 * Sends necessary info down the chain to upvoteQuestion() in questions. Returns
 * proper data to controller.js.
 *
 * @param data = {room_id: String, question_id: String, voter_id: String}
 * @return {question_id: String, question_score: int}
 */
Room.prototype.upvoteQuestion = function(data) {
  return this.questions.upvoteQuestion(data);
}

/**
 * Sends necessary info down the chain to downvoteQuestion() in questions.
 * Returns proper data to controller.js.
 * @param data = {room_id: String, question_id: String, voter_id: String}
 * @return {question_id: String, question_score: int}
 */
Room.prototype.downvoteQuestion = function(data) {
  return this.questions.downvoteQuestion(data);
}

/**
 * Sends necessary info down the chain to getTopVoted() in questions.
 * Returns proper data to controller.js.
 * @param n = int, number of top voted questions to return
 * @return array of top n voted questions
 */
Room.prototype.getTopVoted = function(n) {
  return this.questions.getTopVoted(n);
}

/**
 * Sends necessary info down the chan to getQuestions() in questions.
 * Returns proper data to controller.js.
 * @param none
 * @return array of all the questions in this room
 */
Room.prototype.getQuestions = function() {
  return this.questions.getQuestions();
 }

module.exports = Room;
