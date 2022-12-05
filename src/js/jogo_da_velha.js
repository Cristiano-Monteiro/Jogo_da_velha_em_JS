let icone_x = 'url(/src/images/icon_x.svg)';
let icone_o = 'url(/src/images/icon_o.svg)';
let column = document.querySelectorAll('.column');
let game_end = document.querySelector('.game_end');
let x_victory = document.getElementById('x_victory');
let o_victory = document.getElementById('o_victory');

let game_board = [
    ['.', ',', '.'],
    [',', ';', ','],
    ['.', ',', '.']
];

let id_array = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']
];

let player_turn = 1;
let cont_x_victory = 0;
let cont_o_victory = 0;

function choose_player(col){
    let row_position = col.target.classList[1];
    let col_position = col.target.classList[2];
    let id_column = col.target.id;

    if(col_position == undefined){
        col_position = row_position;
    };
    
    let choose = document.getElementById(id_column);
    if(player_turn == 1){
        choose.style.backgroundImage = icone_x;
        game_board[row_position][col_position] = 'X';
        player_turn = 2;
    }
    else{
        choose.style.backgroundImage = icone_o;
        game_board[row_position][col_position] = 'O';
        player_turn = 1;
    };

    choose.removeEventListener('click', choose_player);
    game_result_check();
};

let round = 0
function game_result_check(){
    round++;
    let victory = game_victory(game_board);
    if(victory == 'X'){
        cont_x_victory++;
        x_victory.innerText = cont_x_victory;
    } else if(victory == 'O'){
        cont_o_victory++;
        o_victory.innerText = cont_o_victory;
    };
    if(victory == '' && round == 9){
        game_end.style.transform = 'scale(1)';
        for(col of column){
            col.style.backgroundColor = '#f00';
        };
    };
};

for(col of column){
    col.addEventListener('click', choose_player);
};

function game_victory(array){
    let player_victory = '';
    for(let i = 0; i < 3; i++){
        /*== Line victory ==*/
        if(array[i][0] == array[i][1] && array[i][1] == array[i][2]){
            document.getElementById(id_array[i][0]).style.backgroundColor = '#0f0';
            document.getElementById(id_array[i][1]).style.backgroundColor = '#0f0';
            document.getElementById(id_array[i][2]).style.backgroundColor = '#0f0';
            game_end.style.transform = 'scale(1)';
            player_victory = array[i][0];
            break
        };
        /*== Column victory ==*/
        if(array[0][i] == array[1][i] && array[1][i] == array[2][i]){
            document.getElementById(id_array[0][i]).style.backgroundColor = '#0f0';
            document.getElementById(id_array[1][i]).style.backgroundColor = '#0f0';
            document.getElementById(id_array[2][i]).style.backgroundColor = '#0f0';
            game_end.style.transform = 'scale(1)';
            player_victory = array[0][i];
            break
        };
    };
    /*== Diagonal victory ==*/
    if(array[0][0] == array[1][1] && array[1][1] == array[2][2]){
        document.getElementById(id_array[0][0]).style.backgroundColor = '#0f0';
        document.getElementById(id_array[1][1]).style.backgroundColor = '#0f0';
        document.getElementById(id_array[2][2]).style.backgroundColor = '#0f0';
        game_end.style.transform = 'scale(1)';
        player_victory = array[0][0];
    } else if(array[0][2] == array[1][1] && array[1][1] == array[2][0]){
        document.getElementById(id_array[0][2]).style.backgroundColor = '#0f0';
        document.getElementById(id_array[1][1]).style.backgroundColor = '#0f0';
        document.getElementById(id_array[2][0]).style.backgroundColor = '#0f0';
        game_end.style.transform = 'scale(1)';
        player_victory = array[0][2];
    };
    return player_victory;
};

/*== Game reset ==*/
game_end.addEventListener('click', game_reset);

function game_reset(){
    game_board = [
        ['.', ',', '.'],
        [',', ';', ','],
        ['.', ',', '.']
    ];
    for(col of column){
        col.style.backgroundImage = 'none';
        col.style.backgroundColor = '#fff';
        col.addEventListener('click', choose_player);
    };
    game_end.style.transform = 'scale(0)';
    player_turn = 1;
    round = 0;
};