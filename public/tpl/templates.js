/**
 * Created by kyly on 5/14/15.
 */

/**
 *  Needed format: {classes: String, question_id : string,
 *  question_text : string, score : int}
 * @type {string}
 */
var question_html =
  "<div class=\"animated pulse\"><div class=\"{{classes}}\" question_id=\"{{question_id}}\" score=\"{{score}}\"><div class=\"rec\">" +
  '<p class=\\"question\\">{{question_text}}</p><br>' +
  '<div class=\"row\">' +
  '<a href=\"#\" id=\"thumbs_down_to_active\"><i class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>' +
  '<p class=\"numVotes col-md-1 col-sm-1 col-xs-1 col-lg-1\">{{score}}</p>' +
  '<a href=\"#\" id=\"thumbs_up_to_active\"><i class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>' +
  '<p class=\"numComments col-md-offset-7 col-sm-offset-6 col-xs-offset-6 col-md-1 col-sm-1 col-xs-1 col-lg-1\">' +
  '1</p>' +
  '<a href=\"#\" id=\"comment_to_active\"><img src=\"/images/comment.png\" class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 comment \"></a>' +
  '<a href=\"#\" id=\"comment_to_inactive\"><img src=\"/images/comment_active.png\" class=\"col-md-1 col-sm-1 col-xs-1 col-lg-1 comment com_active\"></a>' +
  '</div>' +
  '</div>' +
  '<!--end recentquestion_section-->' +
  '<div class=\"commentSection\">' +
  '<a href=\"#\" id=\"more\">view more comments</a>' +
  '<p>i need comments</p>' +
  '<input class=\"form-control\" placeholder=\"write a comment...\" type=\"text\">' +
  '</div>' +
  '<hr>' +
  '</div>'
  + '</div>';

//TODO var question_comment_format =


var questionTpl = Handlebars.compile(question_html);
