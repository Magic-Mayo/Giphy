const fail = ['Car', 'Truck', 'Motorcycle'];
const gif = $('.GIF');
const buttons = $('.buttons');
const gifIt = $('.js-GIF-it');
const add = $('.js-add');
let gifCount = 0;
let gifCounter = 4;

for (let i=0; i<fail.length; i++){
    const btn = $('<button>').text(fail[i]).addClass('js-GIF-it');
    btn.appendTo('.buttons').attr('data-gif', fail[i])
}

add.on('click', function(){
    $('<button>').appendTo('.buttons').text(gif.val()).attr('data-gif', gif.val()).addClass('js-GIF-it')
})

$(document).on('click', '.js-GIF-it', function(){
    const text = $(this).attr('data-gif');
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8dZZXNK8KMqOf8ctUav0BuFe8JYedKdP&limit=50&q=" + text + "+fail";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        const result = response.data;
        let rating;
        let gifRate;
        for (let i = 0; i<4; i++){
            const img = $('<img>');
            const div = $('<div>');
            const rating = result[i].rating.toUpperCase();
            const gifRate = $('<p>Rating: ' + rating + '</p>')
            gifCount++;
            img.attr('src', result[i].images.fixed_height_still.url);
            console.log(img.attr('src'))
            div.append(gifRate);
            div.prepend(img);
            $(div).appendTo('.result').addClass('js-gif-click');
            console.log(gifCount)
        }
        $('.load-btn').html('<button class="btn border-info load">Load more...</button>')
        $(document).on('click', '.load', function(){
            gifCounter = gifCounter+4;
            console.log(gifCounter);
            console.log(gifCount);
            
            for (let i = gifCount; i<gifCounter; i++){
                const img = $('<img>');
                const div = $('<div>');
                const rating = result[i].rating.toUpperCase();
                const gifRate = $('<p>Rating: ' + rating + '</p>') 
                img.attr('src', result[i].images.fixed_height_still.url);
                console.log(img.attr('src'))
                div.append(gifRate);
                div.prepend(img);
                $(div).appendTo('.result').addClass('js-gif-click');
            }
            gifCount = gifCount + 4
                console.log(response)
        })
        
        $(document).on('click', '.js-gif-click', function(){
        })
    })
})
