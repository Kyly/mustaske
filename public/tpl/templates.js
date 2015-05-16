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
var recentQuestionHtml =
  + "<div class=\"animated pulse\"><div class=\"{{class}}\" question_id=\"{{question_id}}\" score=\"{{score}}\"><div class=\"rec\">"
  + '<p class=\"question\">{{{question_text}}}</p><br>'
  + '<div class=\"row\">'
  + '<a href=\"#\" id=\"thumbs-down-to-active\"><i class=\"fa fa-thumbs-o-down fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>'
  + '<p class=\"num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1\">{{score}}</p>'
  + '<a href=\"#\" id=\"thumbs-up-to-active\"><i class=\"fa fa-thumbs-o-up fa-2x col-md-1 col-sm-1 col-xs-1 col-lg-1\"></i></a>'
  + '<p class=\"num-comments col-md-offset-7 col-sm-offset-6 col-xs-offset-6 col-md-1 col-sm-1 col-xs-1 col-lg-1\">'
  + '1</p>'
  + '<a href=\"#\" id=\"comment-to-active\"><img src=\"/images/comment.png\" class=\"col-md-1 col-sm-2 col-xs-2 col-lg-1 comment \"></a>'
  + '<a href=\"#\" id=\"comment-to-inactive\"><img src=\"/images/comment_active.png\" class=\"col-md-1 col-sm-1 col-xs-1 col-lg-1 comment com-active\"></a>'
  + '</div>'
  + '</div>'
  + '<!--end recentquestion_section-->'
  + '<div class=\"comment-section\">'
  + '<a href=\"#\" id=\"more\">view more comments</a>'
  + '<p>i need comments</p>'
  + '<input class=\"form-control\" placeholder=\"write a comment...\" type=\"text\">'
  + '</div>'
  + '<hr>'
  + '</div>'
  + '</div>';

var topQuestionHtml =
    '<div question_id=\"{{question_id}}\" class=\"{{class}}\" score=\"{{score}}\">'
  + '   <!--end topquestion_section-->'
  + '   <div class="question-content">'
  + '       <p>{{{question_text}}}</p><br>'
  + ''
  + '       <div class="row question-controls">'
  + '           <a href="#" id="thumbs-down-to-active"><i'
  + '                   class="fa fa-thumbs-o-down fa-2x col-md-1 col-sm-2 col-xs-1 col-lg-1"></i></a>'
  + '           <p class="num-votes col-md-1 col-sm-1 col-xs-1 col-lg-1">'
  + '               23</p>'
  + '           <a href="#" id="thumbs_up_to_active"><i'
  + '                   class="fa fa-thumbs-o-up fa-2x col-md-1 col-sm-2x col-xs-1 col-lg-1"></i></a>'
  + '           <p class="num-comments col-md-offset-6 col-sm-offset-3 col-xs-offset-6 col-md-1 col-sm-1 col-xs-1 col-lg-1">'
  + '               3</p>'
  + '           <a href="#" id="comment-to-active"><img'
  + '                   src="/images/comment.png"'
  + '                   class="col-md-1 col-sm-2 col-xs-2 col-lg-1 comment "></a>'
  + '           <a href="#" id="comment-to-inactive"><img'
  + '                   src="/images/comment_active.png"'
  + '                   class="col-md-1 col-sm-1 col-xs-1 col-lg-1 comment com-active"></a>'
  + '       </div>'
  + '   </div>'
  + ''
  + '   <div class="comment-section">'
  + '       <a href="#" id="more">view more comments</a>'
  + ''
  + '       <p>Go back and take CSE 12 with Gary!</p>'
  + ''
  + '       <p> ^^^ I agree...Gary is the best!</p>'
  + ''
  + '       <p>If it wasn\'t for Gary, I wouldn\'t even know what a'
  + '           variable is...</p>'
  + '       <input type="text" class="form-control"'
  + '              placeholder="write a comment...">'
  + '   </div>'
  + '   <!--end commentSection-->'
  + '</div>';

//TODO var question_comment_format =

var recentQuestionTpl = Handlebars.compile(topQuestionHtml);
var topQuestionTpl    = Handlebars.compile(topQuestionHtml);
