/**
 * TODO file header
 */

var Questions = require('./questions');

function Room (data) {
  this.id             = data.room_id;
  this.name           = data.room_name;
  this.questions      = new Questions();
  this.owner          = data.owner_id;
  this.bannedUsers    = {};  // Hash containing banned users
  this.warnedUsers    = {};  // Hash containing warned users
};

/**
 * Increments warnings for user in warnedUsers Hash.
 * calls banUser if warnings == 3
 *
 * @param data = user_id: id
 * @return number of warnings user has
 */
Room.prototype.warnUser = function(user_id) {
  if (!user_id in this.warnedUsers)
    warnedUsers[user_id] = 1;
  else
    warnedUsers[user_id] += 1;

  if (warnedUsers[user_id] == 3)
    this.banUser(user_id);

  return warnedUsers[user_id];
}

/**
 * Bans user, adding their user_id to bannedUsers Hash
 *
 * @param data = user_id: id
 * @return true if user_id succesfully added to bannedUsers Hash
 */
Room.prototype.banUser = function(user_id) {

  this.bannedUsers[user_id] = true;

  return (isBanned(user_id));
}

/**
 * Checks if user_id is in bannedUsers Hash
 *
 * @param data = user_id: id
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
  * @param data = {room_id: id, question_text: String, asker_id: String}
  * @return newly created question
  */
Room.prototype.hasQuestion = function(questionId) {
  return this.questions.hasQuestion(questionId);
}
/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.upvoteQuestion = function(data) {
  this.questions.upvoteQuestion(data);
}

/**TODO
  *   data = {room_id: id, question_id: id, voter_id: id}
  */
Room.prototype.downvoteQuestion = function(data) {
  this.questions.downvoteQuestion(data);
}

/**TODO
  *   n = int, number of top voted questions to return
  */
Room.prototype.getTopVoted = function(n) {
  return this.questions.getTopVoted(n);
}

/**TODO
 * returns all questions
 */
Room.prototype.getQuestions = function() {
  return this.questions.getQuestions();
 }

module.exports = Room;
