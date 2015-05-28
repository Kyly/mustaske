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

var topQuestionHtml =
    '<div question_id=\"{{question_id}}\" class=\"q {{class}}\" data-score=\"{{question_score}}\">'
  + '   <!--end topquestion_section-->'
  + '   <div class=\"question-content\">'
  + '       <p>{{{question_text}}}</p><br>'
  + ''
  + '       <div class=\"row question-controls\">'
  + '           <a href=\"#\" class=\"student-view thumbs-down-to-active\"><i'
  + '                   class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-2 col-xs-1 col-lg-1\"></i></a>'
  + '           <p class=\"num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1\">'
  + '               {{question_score}}</p>'
  + '           <a href=\"#\" class=\"student-view thumbs-up-to-active\"><i'
  + '                   class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-2x col-xs-1 col-lg-1\"></i></a>'
  + '           <a href=\"#\" class=\"owner-view hidden warn-user\"><img'
  + '                   src=\"/images/people.png\"'
  + '                   class=\"col-md-offset-6 col-sm-offset-3 col-xs-offset-7 col-md-1 col-sm-1 col-xs-2 warn-user-pic\"></a>'
  + '           <a href=\"#\" class=\"owner-view hidden dismiss-question\"><img'
  + '                   src=\"/images/trash.png\"'
  + '                   class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 dismiss-question-pic \"></a>'
  + '       </div>'
  + '       <hr>'
  + '   </div>'
  + '</div>';

var recentQuestionTpl = Handlebars.compile(topQuestionHtml);
var topQuestionTpl    = Handlebars.compile(topQuestionHtml);
