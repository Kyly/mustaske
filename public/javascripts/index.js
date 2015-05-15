var socket = io.connect();

$(document).ready(function () {

  ViewActions.setupUI();

  socket.on('create room', ViewActions.enterRoomOwner);
  socket.on('join room', ViewActions.enterRoom);
  socket.on('new question', ViewActions.questionAdded);
  socket.on('upvote question', ViewActions.questionScoreChange);


  // TODO: All stuff below here will be replaced by new functions in
  // ViewActions

  $('.top-question #thumbs-up-to-active').click(function () {
    $('.top-question #thumbs-up-to-active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });


  $('.top-question #thumbs-down-to-active').click(function () {
    $('.top-question #thumbs-down-to-active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


  $('.top-question .comment-section #more').click(function () {


  });

  $('.top-question #comment-to-active').click(function () {
    $(".top-question .comment").css("display", "none");
    $(".top-question .com-active").css("display", "inline");

    $(".top-question .comment-section").show();

  });
  $('.top-question #comment-to-inactive').click(function () {
    $(".top-question .comment").css("display", "inline");
    $(".top-question .com-active").css("display", "none");

    $(".top-question .comment-section").hide();

  });


  //REPEAT FOR RECENT QUESTIONS

  $('.recent-question #thumbs-up-to-active').click(function () {
    $('.recent-question #thumbs-up-to-active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });

  $('.recent-question #thumbs-down-to-active').click(function () {
    $('.recent-question #thumbs-down-to-active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


  $('.recent-question .comment-section #more').click(function () {


  });

  $('.recent-question #comment-to-active').click(function () {
    $(".recent-question .comment").css("display", "none");
    $(".recent-question .com-active").css("display", "inline");

    $(".recent-question .comment-section").show();

  });
  $('.recent-question #comment-to-inactive').click(function () {
    $(".recent-question .comment").css("display", "inline");
    $(".recent-question .com-active").css("display", "none");

    $(".recent-question .comment-section").hide();

  });

  $('#add-question').submit(function (event) {

    console.log(event);
    var textBox = $('#add-question-text');
    var questionText = textBox.val();

    var data = {
      question_text: questionText,
      room_id: $('.room-name').attr('room-id')
    };
    socket.emit('new question', data);
    textBox.val('');
    event.preventDefault();
  });

});
