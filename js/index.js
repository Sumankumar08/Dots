$(document).ready(function() {
     // Get the modal
    
    // click function for the div
    $('#dots').on('click', handleClick);
    
    
    //handling the click function
    function handleClick(e) {
        var $target = $(e.target);
        
        if($target.hasClass('space') && (!$target.hasClass('click')))
        {
            var color;
            var gold = 'gold';
            var red = 'red';
            var lightgrey = 'lightgrey'
            var is_ver = false;
            
            // if the click_counter mod 2 is 0 then the background colour changes to 'gold'. If click_counter mod 2 is 1 then colour changes to 'red'.
            if(click_counter % 2 === 0) 
            {
                $target.css('background-color', gold);
                color = gold;
            }
            else
            {
                $target.css('background-color', red);
                color = red;
            }
            $target.addClass('click');
            click_counter++;
            
            is_ver = ($target.hasClass('ver')) ? true : false ;
            
            var parent_id = $target.parent().attr('id');//outer div id string
            var position = Number($target.attr('data-id'));//data-id of clicked div
            var p_id = Number(parent_id.slice((parent_id.length - 1), parent_id.length));//id number of parent(outer) div
            
            if(is_ver === false)
            {
                if(p_id > 1) // Keep a track on the Bottom, Left and Right after the Top is clicked
                {
                    //top
                    var top_id = p_id-1;
                    var top_id_str = parent_id.slice(0, parent_id.length-1) + top_id;
                    var search_top = $('#'+top_id_str).find('.space[data-id='+position+']').hasClass('click');//top

                    var top_ver_id = 'erow'+top_id;

                    var search_left = $('#'+top_ver_id).find('.space[data-id='+position+']').hasClass('click');//left
                    var search_right = $('#'+top_ver_id).find('.space[data-id='+(position+1)+']').hasClass('click');//right
                    
                    // if the top, left and right are already clicked and available then once the bottom div is clicked the box completes and the player gets a point. 
                    if(search_top === true && search_left === true && search_right === true)
                    {
                        color_empty($('#'+top_ver_id), position, color);
                    }

                }
                if(p_id < 6) // Keep a track on the Top, Left and Right after the Bottom is clicked
                {
                    //bottom
                    var bottom_id = p_id+1;
                    var bottom_id_str = parent_id.slice(0, parent_id.length-1) + bottom_id;
                    var search_bottom = $('#'+bottom_id_str).find('.space[data-id='+position+']').hasClass('click');//top

                    var bottom_ver_id = 'erow'+p_id;

                    var search_left = $('#'+bottom_ver_id).find('.space[data-id='+position+']').hasClass('click');//left
                    var search_right = $('#'+bottom_ver_id).find('.space[data-id='+(position+1)+']').hasClass('click');//right
                    
                    // if the bottom, left and right are already clicked and available then once the top div is clicked the box completes and the player gets a point.
                    if(search_bottom === true && search_left === true && search_right === true)
                    {
                        color_empty($('#'+bottom_ver_id), position, color);
                    }
                }
            }
            else
            {
                var $erow = $('#'+parent_id);
                if(position > 1) // Keep a track on the Top, Bottom and Right after the Left is clicked
                {
                    var search_top = $('#row'+p_id).find('.space[data-id='+(position-1)+']').hasClass('click');//top
                    var search_bottom = $('#row'+(p_id+1)).find('.space[data-id='+(position-1)+']').hasClass('click');//bottom

                    var search_left = $erow.find('.space[data-id='+(position-1)+']').hasClass('click');//left
                    
                    // if the bottom, left and top are already clicked and available then once the right div is clicked the box completes and the player gets a point.
                    if(search_bottom === true && search_left === true && search_top === true)
                    {
                        color_empty($erow, (position-1), color);
                    }
                }
                
                if(position < 6) // Keep a track on the Top, Bottom and Left after the Right is clicked
                {
                    var search_top = $('#row'+p_id).find('.space[data-id='+(position)+']').hasClass('click');//top
                    var search_bottom = $('#row'+(p_id+1)).find('.space[data-id='+(position)+']').hasClass('click');//bottom

                    var search_right = $erow.find('.space[data-id='+(position+1)+']').hasClass('click');//right
                    
                    // if the bottom, right and top are already clicked and available then once the left div is clicked the box completes and the player gets a point.
                    if(search_bottom === true && search_right === true && search_top === true)
                    {
                        color_empty($erow, position, color);
                    }
                }
            }
            
            // if the player gets a box then the same player gets another turn to play. 
            if(is_win === true)
            {
                click_counter--;
                is_win = false;
            }
            
        }
        
    }
});

// Players
var is_win = false;
var $player1 = $('#player1');
var $player2 = $('#player2');

// Scores
var player1_score = 0;
var player2_score = 0;

var click_counter = 0;

// Modal Box
var modal = document.getElementById('gameoverModal');

// Get the close icon that closes the modal
var close = document.getElementsByClassName("close")[0];


// When the user clicks on (x), close the modal
    close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to fill the box in between
function color_empty ($el, pos, color)
{
    $el.find('.empty[data-id='+(pos)+']').css('background-color', 'lightgrey');
    var txt = (color === 'gold') ? 'P1' : 'P2';
    
    // If colour is gold P1 appears on the box else P2
    (color === 'gold') ? player1_score++ : player2_score++;
    $player1.text(player1_score);
    $player2.text(player2_score);
    $el.find('.empty[data-id='+(pos)+']').text(txt);
    is_win = true;
    
    // Once all the boxes are filled then game over and determine the scores
    var total = player1_score + player2_score;
    if (total === 25) {
        if(player1_score > player2_score)
        {
        gameoverMsg.textContent = "Player 1 Wins!";
        console.log('Player 1 wins');
        }
        else {
        gameoverMsg.textContent = "Player 2 Wins!";
        console.log('Player 2 wins');
        }
        
        // Reset the game after all the boxes are complete.
        setTimeout(function() {
            modal.style.display = "block";
            $('.space').removeClass('click');
            $('.space').css('background-color', 'transparent');
            $('.empty').css('background-color', 'transparent');
            $('.empty').text('');
            $player1.text('0');
            $player2.text('0');
            player1_score = 0;
            player2_score = 0;
            click_counter = 0;
        }, 500);
    }
}
