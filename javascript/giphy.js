$(document).onload = function(){

}

const fail = ['Car', 'Truck', 'Motorcycle'];
const gif = $('.GIF');
const buttons = $('.buttons');
const gifIt = $('.js-GIF-it');
const add = $('.js-add');
let gifCount = 0;
let gifCounter = 4;

for (let i=0; i<fail.length; i++){
    const btn = $('<button>').text(fail[i]).addClass('js-GIF-it');
    btn.appendTo('.buttons').attr('data-gif', fail[i]);
}

add.on('click', function(){
    $('<button>').appendTo('.buttons').text(gif.val()).attr('data-gif', gif.val()).addClass('js-GIF-it');
})

$(document).on('click', '.js-GIF-it', function(){
    const text = $(this).attr('data-gif');
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8dZZXNK8KMqOf8ctUav0BuFe8JYedKdP&q=" + text + "+fail";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(gifCounter);
        console.log(gifCount)
        const result = response.data;
        for (let i = 0; i<4; i++){
            console.log(gifCount)
            const img = $('<img>');
            const div = $('<div>');
            const rating = result[i].rating.toUpperCase();
            const gifRate = $('<p>Rating: ' + rating + '</p>')
            gifCount++;
            img.attr('src', result[i].images.fixed_height_still.url).attr('data-name', i).attr('data-click', 'false').addClass('js-img');
            div.append(gifRate);
            div.prepend(img);
            $(div).appendTo('.result').addClass('js-gif-click');
            console.log(gifCount)
        }
        
        $('.load-btn').html('<button class="btn border-info load">Load more...</button>')
        $(document).on('click', '.load', function(){
            console.log(gifCounter);
            console.log(gifCount);
            
            for (let j = gifCounter; j<gifCount; j++){
                console.log($(this).attr('class'))
                const img = $('<img>');
                const div = $('<div>');
                const rating = result[j].rating.toUpperCase();
                const gifRate = $('<p>Rating: ' + rating + '</p>') 
                img.attr('src', result[j].images.fixed_height_still.url).attr('data-name', j).attr('data-click', 'false').addClass('js-img');
                console.log(img.attr('src'))
                div.append(gifRate);
                div.prepend(img);
                $(div).appendTo('.result').addClass('js-gif-click');
                console.log(response)
            }
            gifCounter = gifCounter+4;
            gifCount = gifCount + 4
        })
        
        let clicked = false
        $(document).on('click', '.js-img', function(){
            if (clicked){
                $(this).attr('src', result[$(this).data('name')].images.fixed_height_still.url);
                return clicked = false;
                console.log(clicked)
            }
            
            else {
                $(this).attr('src', result[$(this).data('name')].images.original.url);
                clicked = true;
                console.log(clicked)
            }
        })
    })
    gifCount = gifCount + 4
})
