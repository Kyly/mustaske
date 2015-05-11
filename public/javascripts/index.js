var socket = io.connect();

$(document).ready(function(){

  $('#join-create-room .btn').click(function(){
    var textBox = $('#room-name-field input');

    var roomName = textBox.val();

    if (roomName === '') {
      $('#room-name-field').addClass('has-error');
    }

    else {

      var data = {
        option: $(this).text().toLowerCase().trim(),
        room_name: textBox.val()
      };

      ViewUI.joinRoom(data);
    }

  });

  /**
   * Receives input from room creation will roll up login screen and
   * add 'room-uuid' attribute to #room-name
   *
   * @param result = {room_name: returnData.room_name,
   *                            room_id: returnData.room_id}
   */
  socket.on('create room', function(result){

    if (!result) {
      $('#login-info .room-name-field').addClass('.has-error');
    }

    var roomName = $('.room-name');

    roomName.text(result.room_name);
    roomName.attr('name-uuid', result.room_id);
    $('.login-overlay').addClass('animated slideOutUp');
    console.log('Room Id:' + result.room_id);

  });

  /**
   * @param result = {room_name: string, room_id: string, questions: array,
   *    top_questions: array}
   */
  socket.on('join room', function(result) {

    if (!result) {
      $('#room-name-field').addClass('has-error');
    }

    else {
      $('#room-name-field').removeClass('has-error');
      var roomName = $('.room-name');

      roomName.text(result.room_name);
      roomName.attr('name-uuid', result.room_id);
      $('.login-overlay').addClass('animated slideOutUp');
      console.log('Room Id:' + result.room_id);

      // TODO Add questions and top questions
    }

  });

  $('.topquestions #thumbs_up_to_active').click(function(){
    $('.topquestions #thumbs_up_to_active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });



  $('.topquestions #thumbs_down_to_active').click(function(){
    $('.topquestions #thumbs_down_to_active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


  $('.topquestions .commentSection #more').click(function(){


  });

  $('.topquestions #comment_to_active').click(function(){
    $(".topquestions .comment").css("display", "none");
    $(".topquestions .com_active").css("display", "inline");

    $(".topquestions .commentSection").show();

  });
  $('.topquestions #comment_to_inactive').click(function(){
    $(".topquestions .comment").css("display", "inline");
    $(".topquestions .com_active").css("display", "none");

    $(".topquestions .commentSection").hide();

  });



  //REPEAT FOR RECENT QUESTIONS

  $('.recentquestions #thumbs_up_to_active').click(function(){
    $('.recentquestions #thumbs_up_to_active i')
      .removeClass("fa-thumbs-o-up")
      .addClass('fa-thumbs-up');
  });

  $('.recentquestions #thumbs_down_to_active').click(function(){
    $('.recentquestions #thumbs_down_to_active i')
      .removeClass("fa-thumbs-o-down")
      .addClass('fa-thumbs-down');

  });


  $('.recentquestions .commentSection #more').click(function(){


  });

  $('.recentquestions #comment_to_active').click(function(){
    $(".recentquestions .comment").css("display", "none");
    $(".recentquestions .com_active").css("display", "inline");

    $(".recentquestions .commentSection").show();

  });
  $('.recentquestions #comment_to_inactive').click(function(){
    $(".recentquestions .comment").css("display", "inline");
    $(".recentquestions .com_active").css("display", "none");

    $(".recentquestions .commentSection").hide();

  });

});
