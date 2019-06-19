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
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8dZZXNK8KMqOf8ctUav0BuFe8JYedKdP&limit=50&q=" + text + "+fail";
    // gifCounter = gifCounter+4;
    console.log(gifCounter);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        const result = response.data;
        for (let i = gifCount; i<gifCounter; i++){
            console.log(gifCount)
            const img = $('<img>');
            const div = $('<div>');
            const rating = result[i].rating.toUpperCase();
            const gifRate = $('<p>Rating: ' + rating + '</p>')
            gifCount++;
            img.attr('src', result[i].images.fixed_height_still.url).attr('data-name', i).attr('data-click', 'false');
            div.append(gifRate);
            div.prepend(img);
            $(div).appendTo('.result').addClass('js-gif-click');
            console.log(gifCount)
        }
        
        $('.load-btn').html('<button class="btn border-info load">Load more...</button>')
        $(document).on('click', '.load', function(){
            gifCounter = gifCounter+4;
            
            for (let j = gifCount; j<gifCounter; j++){
                const img = $('<img>');
                const div = $('<div>');
                const rating = result[j].rating.toUpperCase();
                const gifRate = $('<p>Rating: ' + rating + '</p>') 
                img.attr('src', result[j].images.fixed_height_still.url).attr('data-name', j).attr('data-click', 'false');
                console.log(img.attr('src'))
                div.append(gifRate);
                div.prepend(img);
                $(div).appendTo('.result').addClass('js-gif-click');
            }
            gifCount = gifCount + 4
            console.log(response)
        })
        
        $(document).on('click', 'img', function(){
            if ($(this).data('click') === true){
                console.log()
                $(this).attr('src', result[$(this).data('name')].images.fixed_height_still.url).attr('data-click', 'false')
            }
            
            else if ($(this).data('click') === false){
                $(this).attr('src', result[$(this).data('name')].images.original.url).attr('data-click', 'true');
            }
        })
    })
    gifCount = gifCount + 4
})
