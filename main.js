/* Game loop  */
$(document).ready(()=>{
    setInterval(()=>{
        moveSprite();
    },5000)
    setInterval(()=>{
        if(detectColision()){
            gameGoal();
        } 
    },500)
    createSprite();
    /* End Game loop */
    /* Controls */
    $(document).keypress((event)=>{
        let position = $("#spaceship").position();
        let top = position.top;
        let left = position.left;
        let SPEED = 25;
        switch(event.charCode){
            case 119:  
                let move_up = top - SPEED;
                if(isOnBounds(move_up,left)){
                    $("#spaceship").css("top",move_up);
                }
                break;
            case 97:
                let move_left = left - SPEED;
                if(isOnBounds(top,move_left)){
                    $("#spaceship").css("left",move_left);
                }
                break;
            case 115:
                let move_down = top + SPEED;
                if(isOnBounds(move_down,left)){
                    $("#spaceship").css("top",move_down);
                }
                break;
            case 100:
                let move_right = left + SPEED;
                if(isOnBounds(top,move_right)){
                    $("#spaceship").css("left",move_right);
                }
                break;
        }
    })

    /* Colisiones con la pantalla */
    function isOnBounds(top,left){
        let onBounds = true;
        let screenWidth = $(window).width() - 50;
        let screenHeight = $(window).height() - 50;
        let checkWidth = left > screenWidth || left < 0;
        let checkHeight = top > screenHeight || top < 0;

        if (checkWidth || checkHeight) onBounds = false;

        return onBounds;
    }
    /* Creamos el alien al que hay que perseguir  */
    function createSprite(){
        $("body").append("<img id='sprite' src='warriors.png'/>");
        moveSprite();
    }
    /* Mueve el alien a una posicion aleatoria del mapa */
    function moveSprite(){
        let sprite_left_position = parseInt(Math.random() * $(window).width() - 25);
        let sprite_top_position = parseInt(Math.random() * $(window).height() - 25);
        $("#sprite").css("top",sprite_top_position);
        $("#sprite").css("left",sprite_left_position);
    }
    /* Suma los puntos agranda la nave  */
    function gameGoal(){
        let points = parseInt($("#points").text());
        $("#points").text(points + 50);
        $("#spaceship").css("height",$("#spaceship").height()+10);
        $("#spaceship").css("width",$("#spaceship").width()+10);
        moveSprite();
    }
    /* Detección de colisiones entre la nave y el alien */
    function detectColision(){
        const round_position = $("#spaceship").position();
        const point_position = $("#sprite").position();
        let top_diff = round_position.top - point_position.top;
        let left_diff = round_position.left - point_position.left;

        let hit_box_top = top_diff > $("#spaceship").height() * -1 
        && top_diff < $("#spaceship").height();

        let hit_box_left = left_diff > $("#spaceship").height() *-1 
        && left_diff < $("#spaceship").height();

        let hit_box = hit_box_top && hit_box_left;
        if(hit_box) return true;
    }
})