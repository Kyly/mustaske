/**
 * Created by kyly on 5/14/15.
 */

// TODO Comments not implimented
/**
 *  Needed format: {classes: String, question_id : string,
 *  question_text : string, score : int, comments: Array}
 *
 * @type {string}
 */
//var recentQuestionHtml =
//  + '<div class=\"{{class}}\" question_id=\"{{question_id}}\" data-score=\"{{score}}\"><div class=\"rec\">'
//  + '<p class=\"question\">{{{question_text}}}</p><br>'
//  + '<div class=\"row\">'
//  + '<a href=\"#\" class=\"thumbs-down-to-active\"><i class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>'
//  + '<p class=\"num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1\">{{score}}</p>'
//  + '<a href=\"#\" class=\"thumbs-up-to-active\"><i class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>'
//  + '<p class=\"num-comments col-md-offset-7 col-sm-offset-6 col-xs-offset-6 col-md-1 col-sm-1 col-xs-1 col-lg-1\">'
//  + '1</p>'
//  + '<a href=\"#\" class=\"comment-to-active\"><img src=\"/images/comment.png\" class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 comment \"></a>'
//  + '<a href=\"#\" class=\"comment-to-inactive\"><img src=\"/images/comment_active.png\" class=\"col-md-1 col-sm-1 col-xs-1 col-lg-1 comment com-active\"></a>'
//  + '</div>'
//  + '</div>'
//  + '<!--end recentquestion_section-->'
//  + '<div class=\"comment-section\">'
//  + '<a href=\"#\" class=\"more\">view more comments</a>'
//  + '<p>i need comments</p>'
//  + '<input class=\"form-control\" placeholder=\"write a comment...\" type=\"text\">'
//  + '</div>'
//  + '<hr>'
//  + '</div>'
//  + '</div>';

var topQuestionHtml =
    '<div question_id=\"{{question_id}}\" class=\"q {{class}}\" data-score=\"{{question_score}}\">'
  + '   <!--end topquestion_section-->'
  + '   <div class=\"question-content\">'
  + '       <p>{{{question_text}}}</p><br>'
  + ''
  + '       <div class=\"row question-controls\">'
+ '           <a href=\"#\" class=\"student-view thumbs-up-to-active\"><i'
  + '                   class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-2x col-xs-1 col-lg-1\"></i></a>'
  + '           <p class=\"num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1\">'
  + '               {{question_score}} </p>'
  + '           <p class=\"owner-view hidden votes-p col-md-2 col-sm-3 col-xs-3 col-lg-2\">'
  + '               votes</p>'
+ '           <a href=\"#\" class=\"student-view thumbs-down-to-active\"><i'
  + '                   class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-2 col-xs-1 col-lg-1\"></i></a>'
  + '           <a href=\"#\" class=\"owner-view hidden warn-user\"><img'
  + '                   src=\"/images/people.png\"'
  + '                   class=\"col-md-offset-4 col-sm-offset-3 col-xs-offset-7 col-md-1 col-sm-1 col-xs-2 col-lg-offset-3 col-lg-1 warn-user-pic\">Warn User</a>'
  + '           <a href=\"#\" class=\"owner-view hidden dismiss-question\"><img'
  + '                   src=\"/images/trash.png\"'
  + '                   class=\"col-md-offset-2 col-md-1 col-sm-2 col-xs-2 col-lg-offset-2 col-lg-1 dismiss-question-pic \">Dismiss Question</a>'
  + '       </div>'
  + '       <hr>'
  + '   </div>'
  + '</div>';




var topQuestionHtmlOwner =
    '<div question_id=\"{{question_id}}\" class=\"q {{class}}\" data-score=\"{{question_score}}\">'
  + '   <!--end topquestion_section-->'
  + '   <div class=\"question-content\">'
  + '       <p>{{{question_text}}}</p><br>'
  + ''
  + '       <div class=\"row question-controls\">'
  + '           <p class=\"num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1\">'
  + '               {{question_score}}</p>'
  + '           <a href=\"#\" class=\"warn-user\"><img'
  + '                   src=\"/images/people.png\"'
  + '                   class=\"col-md-offset-6 col-sm-offset-3 col-xs-offset-7 col-md-1 col-sm-1 col-xs-2 warn-user-pic\"> Warn User</a>'
  + '           <a href=\"#\" class=\"dismiss-question\"><img'
  + '                   src=\"/images/trash.png\"'
  + '                   class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 dismiss-question-pic \"> Dismiss Question</a>'
  + '       </div>'
  + '   </div>'
  + ''
  + '</div>';

//TODO var question_comment_format =
var recentQuestionTpl = Handlebars.compile(topQuestionHtml);
var topQuestionTpl    = Handlebars.compile(topQuestionHtml);
