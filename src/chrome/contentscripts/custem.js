//Created by Floor
 console.log("CustEM");
$('#nav').append("<li id='btn'></li>");
$('#btn').append("<a href=''>CustEM</a>");
$('#lobby_i').append("<div id='extension'></div>");
$('#extension').append('<div id="listBox">Hide:</div>');
 
$('#listBox').append('<br><input type="checkbox" id="options0">Lobby Info Box<br>');
$('#listBox').append('<input type="checkbox" id="options1">Recent Topics<br>');
$('#listBox').append('<input type="checkbox" id="options2">Lobby Chat<br>');
$('#listBox').append('<input type="checkbox" id="options3">Lobby Poll<br>');
$('#listBox').append('<input type="checkbox" id="options4">Stickied Topics<br>');
$('#listBox').append('<input type="checkbox" id="options5">Stickied Setups<br>');
$('#listBox').append('<input type="checkbox" id="options6">Recent Activity<br>');
$('#listBox').append('<input type="checkbox" id="options7">Friends in Game<br>');
$('#listBox').append('<input type="checkbox" id="options8">Announcements<br>');
$('#listBox').append('<input type="checkbox" id="options9">Favorite Setups<br>');
$('#listBox').append('<input type="checkbox" id="options10">Lobby Wall Comments<br><br>');
 
//$('#extension').append('Theme:<form><input type="radio" id="t1" name="theme">tumblr<br><input type="radio" id="t2" name="theme">4chan<br><input type="radio" name="theme">None<br></form><br>Chat Size:');
$('#extension').append('<form><input type="radio" id="c1" name="chat">Default<br><input type="radio" id="c2" name="chat">Large</form><br>');
 
$('#extension').append('<input type="button" value="Exit" id="exit" />');
 
$('#extension').hide();
 
var custemSettings = [15];
 
//LOAD
        //ZERO
if (localStorage.getItem("opZero") === "0"){
                $('#lobbyinfo_box').show();
}else if (localStorage.getItem("opZero") === "1"){
        $('#lobbyinfo_box').hide();
    $('#options0').prop('checked', true);
}
        //1
if (localStorage.getItem("op1") === "0"){
                $('#lobby_recent_topics').show();
}else if (localStorage.getItem("op1") === "1"){
        $('#lobby_recent_topics').hide();
    $('#options1').prop('checked', true);
}
    //2
if (localStorage.getItem("op2") === "0"){
                $('#lobbychat').show();
}else if (localStorage.getItem("op2") === "1"){
        $('#lobbychat').hide();
    $('#options2').prop('checked', true);
}
    //3
if (localStorage.getItem("op3") === "0"){
                $('#lobby-poll').show();
}else if (localStorage.getItem("op3") === "1"){
        $('#lobby-poll').hide();
    $('#options3').prop('checked', true);
}
    //4
if (localStorage.getItem("op4") === "0"){
                $('#lobby_sticky_topics').show();
}else if (localStorage.getItem("op4") === "1"){
        $('#lobby_sticky_topics').hide();
    $('#options4').prop('checked', true);
}
if (localStorage.getItem("op5") === "0"){
                $('#lobby_sticky_setups').show();
}else if (localStorage.getItem("op5") === "1"){
        $('#lobby_sticky_setups').hide();
    $('#options5').prop('checked', true);
}
if (localStorage.getItem("op6") === "0"){
                $('#gameevents').show();
}else if (localStorage.getItem("op6") === "1"){
        $('#gameevents').hide();
    $('#options6').prop('checked', true);
}
if (localStorage.getItem("op7") === "0"){
                $('#friends_in_games').show();
}else if (localStorage.getItem("op7") === "1"){
        $('#friends_in_games').hide();
    $('#options7').prop('checked', true);
}
if (localStorage.getItem("op8") === "0"){
                $('#announcements').show();
}else if (localStorage.getItem("op8") === "1"){
        $('#announcements').hide();
    $('#options8').prop('checked', true);
}
if (localStorage.getItem("op9") === "0"){
                $('#favoritesetups').show();
}else if (localStorage.getItem("op9") === "1"){
        $('#favoritesetups').hide();
    $('#options9').prop('checked', true);
}
    //10
if (localStorage.getItem("op10") === "0"){
                $('.comment_container').show();
}else if (localStorage.getItem("op10") === "1"){
        $('.comment_container').hide();
    $('#options10').prop('checked', true);
}
 
   
//CHAT
   
    if (localStorage.getItem("op12") === "0"){
                $('#c1').prop('checked', true);
        $("#window").css("height", '245');
                $("#window_i").css("height", '205');
                $("#userlist").css("height", '200');
}else if (localStorage.getItem("op12") === "1"){
                $('#c2').prop('checked', true);
        $("#window").css("height", '500');
                $("#window_i").css("height", '465');
                $("#userlist").css("height", '465');
}
 
//DISPLAY OPTIONS
$('#btn').click(function(){
       
    $('#lobby_name').text('Options:');
    $('#gamepage').hide();
        $('#extension').show();
   
       $('#options0').click(function(){
            if( $('#options0').prop('checked') === true ){
                $('#lobbyinfo_box').hide();
                custemcustemSettings[0] = "1";
                localStorage.setItem("opZero",custemcustemSettings[0]);
            }else if ( $('#options0').prop('checked') === false ){
                $('#lobbyinfo_box').show();
                custemcustemSettings[0] = "0";
                localStorage.setItem("opZero",custemcustemSettings[0]);
            }
        }
        );
                $('#options1').click(function(){
            if( $('#options1').prop('checked') === true ){
                $('#lobby_recent_topics').hide();
                custemcustemSettings[1] = "1";
                localStorage.setItem("op1",custemcustemSettings[1]);
            }else if ( $('#options1').prop('checked') === false ){
                $('#lobby_recent_topics').show();
                custemcustemSettings[1] = "0";
                localStorage.setItem("op1",custemcustemSettings[1]);
            }
        }
        );
        $('#options2').click(function(){
            if( $('#options2').prop('checked') === true ){
                $('#lobbychat').hide();
                custemcustemSettings[2] = "1";
                localStorage.setItem("op2",custemcustemSettings[2]);
            }else if ( $('#options2').prop('checked') === false ){
                $('#lobbychat').show();
                custemcustemSettings[2] = "0";
                localStorage.setItem("op2",custemcustemSettings[2]);
            }
        }
        );
        $('#options3').click(function(){
            if( $('#options3').prop('checked') === true ){
                $('#lobby-poll').hide();
                custemSettings[3] = "1";
                localStorage.setItem("op3",custemSettings[3]);
            }else if ( $('#options3').prop('checked') === false ){
                $('#lobby-poll').show();
                custemSettings[3] = "0";
                localStorage.setItem("op3",custemSettings[3]);
            }
        }
        );     
        $('#options4').click(function(){
            if( $('#options4').prop('checked') === true ){
                $('#lobby_sticky_topics').hide();
                custemSettings[4] = "1";
                localStorage.setItem("op4",custemSettings[4]);
            }else if ( $('#options4').prop('checked') === false ){
                $('#lobby_sticky_topics').show();
                custemSettings[4] = "0";
                localStorage.setItem("op4",custemSettings[4]);
            }
        }
        );     
                $('#options5').click(function(){
            if( $('#options5').prop('checked') === true ){
                $('#lobby_sticky_setups').hide();
                custemSettings[5] = "1";
                localStorage.setItem("op5",custemSettings[5]);
            }else if ( $('#options5').prop('checked') === false ){
                $('#lobby_sticky_setups').show();
                custemSettings[5] = "0";
                localStorage.setItem("op5",custemSettings[4]);
            }
        }
        );
        $('#options6').click(function(){
            if( $('#options6').prop('checked') === true ){
                $('#gameevents').hide();
                custemSettings[6] = "1";
                localStorage.setItem("op6",custemSettings[6]);
            }else if ( $('#options6').prop('checked') === false ){
                $('#gameevents').show();
                custemSettings[6] = "0";
                localStorage.setItem("op6",custemSettings[6]);
            }
        }
        );
        $('#options7').click(function(){
            if( $('#options7').prop('checked') === true ){
                $('#friends_in_games').hide();
                custemSettings[7] = "1";
                localStorage.setItem("op7",custemSettings[7]);
            }else if ( $('#options7').prop('checked') === false ){
                $('#friends_in_games').show();
                custemSettings[7] = "0";
                localStorage.setItem("op7",custemSettings[7]);
            }
        }
        );
        $('#options8').click(function(){
            if( $('#options8').prop('checked') === true ){
                $('#announcements').hide();
                custemSettings[8] = "1";
                localStorage.setItem("op8",custemSettings[8]);
            }else if ( $('#options8').prop('checked') === false ){
                $('#announcements').show();
                custemSettings[8] = "0";
                localStorage.setItem("op8",custemSettings[8]);
            }
        }
        );
        $('#options9').click(function(){
            if( $('#options9').prop('checked') === true ){
                $('#favoritesetups').hide();
                custemSettings[9] = "1";
                localStorage.setItem("op9",custemSettings[9]);
            }else if ( $('#options9').prop('checked') === false ){
                $('#favoritesetups').show();
                custemSettings[9] = "0";
                localStorage.setItem("op9",custemSettings[9]);
            }
        }
        );
        $('#options10').click(function(){
            if( $('#options10').prop('checked') === true ){
                $('.comment_container').hide();
                custemSettings[10] = "1";
                localStorage.setItem("op10",custemSettings[10]);
            }else if ( $('#options10').prop('checked') === false ){
                $('.comment_container').show();
                custemSettings[10] = "0";
                localStorage.setItem("op10",custemSettings[10]);
            }
        }
        );
 
    //CHAT SIZE
   
        $('#c1, #c2').click(function(){
                if ($('#c2').prop('checked') === true ){
                    $("#window").css("height", '500');
                                        $("#window_i").css("height", '465');
                                        $("#userlist").css("height", '465');
                    custemSettings[12] = "1";
                    localStorage.setItem("op12",custemSettings[12]);
                }else{
                        $("#window").css("height", '245');
                                        $("#window_i").css("height", '205');
                                        $("#userlist").css("height", '200');
                    custemSettings[12] = "0";
                    localStorage.setItem("op12",custemSettings[12]);
                }
            }
    );    
   
    $('#exit').click(function(){
        $('#lobby_name').text('Sandbox Lobby');
        $('#gamepage').show();
                $('#extension').hide();
                }
        );
     
});