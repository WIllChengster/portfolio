

$(document).ready(initiateApp);



function initiateApp(){
    createCards();
    $('#game-area').on('click', '.flip' , flipOnClick);
    $('#game-area').on('click', '.flip', card_clicked);
    display_stats();
    $('.container').on('click','.reset', function(){
        reset_stats();
        display_stats();

})
}

function flipOnClick(){
    $(this).addClass('flipped')
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var cardData = {
    dbs:{
        front:'url(../images/dbs.png)',
        video: 'https://www.youtube.com/embed/v56GdAx2YZM?start=81&end=140&autoplay=1&showinfo=0',
        id: 'dbs',
        background: 'url(../images/dbsBG.jpg)'
    },
    heroAcademia:{
        front:'url(../images/hero-academia.jpg)',
        video: 'https://www.youtube.com/embed/CDW2ReQZOQU?start=0&autoplay=1&controls=0&showinfo=0',
        id: 'heroAcademia',
        background: 'url(../images/myHerobg.png)'

    },
    haikyuu:{
        front: 'url(../images/haikyuu.jpg)',
        video: 'https://www.youtube.com/embed/OLN2N2MAe60?sttart=6&end1203&autoplay=1&controls=0&showinfo=0',
        id: 'haikyuu',
        background: 'url(../images/haikyuuBG.jpg)'
    },
    FMA:{
        front: 'url(../images/FMA.png)',
        video:'https://www.youtube.com/embed/UXbskDZKD7o?start=93&autoplay=1&showinfo=0&controls=0',
        id:'FMA',
        background: 'url(../images/FMA-BG.png)'
    },
    erased:{
        front: 'url(../images/erased.jpeg)',
        video: 'https://www.youtube.com/embed/Y6c8MaTHKfM?start=33&autoplay=1&controls=0&showinfo=0',
        id:'erased',
        background: 'url(../images/erasedBG.jpg)'
    },
    tokyoGhoul:{
        front: 'url(../images/tokyo-ghoul.jpg)',
        video: 'https://www.youtube.com/embed/1wx-hWSTN6k?autoplay=1&controls=0&showinfo=0',
        id:'tokyoGhoul',
        background: 'url(../images/tokyo-ghoul-BG.jpg'
    },
    onePunch:{
        front: 'url(../images/one-punch.jpg)',
        video: 'https://www.youtube.com/embed/km2OPUctni4?start=178&autoplay=1&controls=0&showinfo=0',
        id:'onePunch',
        background: 'url(../images/one-punch-bg.jpg)'
    },
    naruto:{
        front: 'url(../images/naruto.jpg)',
        video: 'https://www.youtube.com/embed/1_6eg-KpHJ8?start=54&end=96&autoplay=1&controls=0&showinfo=0',
        id: 'naruto',
        background:'url(../images/narutoBG.jpg)'
    },
    yourName:{
        front: 'url(../images/your-name.jpg)',
        video: 'https://www.youtube.com/embed/woAHwpOLmyY?autoplay=1&controls=0&showinfo=0',
        id: 'yourName',
        background:'url(../images/your-name-BG.jpg)'
    }
};


function createCards(){
    var cards=[];
    for(var index in cardData){
        var cardflip = $('<div>').addClass('flip').attr('id',cardData[index].id);
        var card = $('<div>').addClass('card');
        var front = $('<div>').addClass('front');
        var back = $('<div>').addClass('back');
        var gameArea = $('#game-area');
        $(front).css(
            'background-image', cardData[index].front
        );
        console.log('cardData[index].front');
        $(back).css(
            'background-image', 'url(../images/yugioh-card-back.jpg)'
        );
        $(card).append(front);
        $(card).append(back);
        $(cardflip).append(card);
        var cardflip2 = $(cardflip).clone();
        cards.push(cardflip);
        cards.push(cardflip2);


    }
    var amountOfCards = cards.length;
    for(var i=0; i<amountOfCards; i++){
        var randomIndex = Math.floor(Math.random()*(cards.length-1));
        console.log(randomIndex);
        $(gameArea).append(cards[randomIndex]);
        cards.splice(randomIndex,1)
    }

}

function card_clicked(){
    if (first_card_clicked === null){
        $(this).addClass('click1');
        first_card_clicked=$('.click1').attr('id')
    } else {
        $(this).addClass('click2');
        attempts +=1;
        second_card_clicked = $('.click2').attr('id');
        if (first_card_clicked === second_card_clicked){
            console.log("matched!");
            match_counter +=1;
            $('iframe').attr('src', cardData[second_card_clicked].video);
            $('body').css('background-image', cardData[second_card_clicked].background);



            first_card_clicked = null;
            second_card_clicked = null;
            $('div').removeClass('click1 click2');
            if (match_counter === total_possible_matches){
                alert("You have own!");
                $('.background').css({
                    'background-image': 'url(../images/confetti.gif)',
                    'width': '100%',
                    'height': '100%',
                    'position': 'absolute'
                })

            }
        } else {
            $('#game-area').off('click', flipOnClick);
            $('#game-area').off('click', card_clicked);
            setTimeout(function(){
                first_card_clicked = null;
                second_card_clicked = null;
                $('.click1, .click2').removeClass('flipped click1 click2');
                $('#game-area').on('click','.flip', flipOnClick);
                $('#game-area').on('click','.flip', card_clicked);

            }, 1100)
        }
    } display_stats();
}

function display_stats(){
    console.log('updating stats');
    $('.games-played > .value ').text(games_played);
    $('.attempts > .value').text(attempts);
    accuracy = (match_counter/attempts)*100;
    if(match_counter===0){
        accuracy=0;
    }
    $('.accuracy > .value').text(accuracy.toFixed(2) +'%')
}

function reset_stats(){
    $('button').removeClass('reset');
    $('iframe').removeAttr('src');
    games_played +=1 ;
    matches = 0;
    attempts = 0;
    display_stats();
    $('.flip').addClass('flipped');
    setTimeout(function(){
        $('div').removeClass('flipped');

    },2000);


    setTimeout(function(){
        setTimeout(function(){
            $('div').removeClass('flipped');
        },2000);
        $('.flip').remove();
        createCards();
        $('button').addClass('reset');
    },3000);

    $('iframe').attr('src','https://www.youtube.com/embed/mAH7CLUmvhE?autoplay=1&controls=0&showinfo=0')
    $('body').css('background-image','url(../images/sky-background.jpg')

}

function pokemon(){
    $('.back').css('background-image', 'url(../images/pokemonCardBack.png)')
}

function yugioh(){
    $('.back').css('background-image', 'url(../images/yugioh-card-back.jpg)')
}

function redBicycle(){
    $('.back').css('background-image', 'url(../images/red-bicycle.png)')
}
function blueBicycle(){
    $('.back').css('background-image', 'url(../images/blue-bicycle.png)')
}












