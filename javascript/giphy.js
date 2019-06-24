const fail = ['Car', 'Truck', 'Motorcycle'];
const gif = $('.GIF');
const buttons = $('.buttons');
const gifIt = $('.js-GIF-it');
const add = $('.js-add');
let gifCount = 10;
let gifCounter = 10;
let collapsed = true;
let text = [];

$('#toggler').on('click', function(event){
    event.preventDefault();
    console.log(collapsed)
    if (collapsed){
        $(this).html('Click to Collapse');
        collapsed = false;
    }
    else if(!collapsed){
        $(this).html('Click to search GIFs');
        collapsed = true;
    }
})
gif.keyup(function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
        add.click();
    }
})

for (let i=0; i<fail.length; i++){
    const btn = $('<button>').text(fail[i]).addClass('js-GIF-it');
    btn.appendTo('.buttons').attr('data-gif', fail[i]);
}

add.on('click', function(event){
    event.preventDefault();
    $('<button>').appendTo('.buttons').text(gif.val()).attr('data-gif', gif.val()).addClass('js-GIF-it');
    gif.val('')
})

$(document.body).on('click', '.js-GIF-it', function load(event){
    event.preventDefault();
    text.splice(0,1,$(this).attr('data-gif'))
    $('.result').empty();
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8dZZXNK8KMqOf8ctUav0BuFe8JYedKdP&limit=10&q=" + text[0] + "+fail";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        const result = response.data;
        console.log(response)
        for (let i = 0; i<result.length; i++){
            gifCounter++;
            const img = $('<img>').addClass('css-image');
            const div = $('<div>');
            const rating = result[i].rating.toUpperCase();
            const gifRate = $('<p class="rating">Rating: ' + rating + '</p>')
            img.attr('src', result[i].images.fixed_height_still.url).attr('data-name', i).attr('data-click', 'unclicked').addClass('js-img');
            div.append(gifRate);
            div.prepend(img);
            $('.result').append((div).addClass('js-gif-click'));
        }
        $(document).on('click', '.js-img', function click(){
            $('.js-img').off('click')
            const clicked = $(this).attr('data-click')
            console.log(result)
            if (clicked == 'clicked'){
                $(this).attr('src', result[$(this).attr('data-name')].images.fixed_height_still.url);
                $(this).attr('data-click', 'unclicked');
            }
            
            else {
                $(this).attr('src', result[$(this).data('name')].images.original.url);
                $(this).attr('data-click', 'clicked');
            }
        })

        $('.load-btn').html('<button class="btn border-info load">Load more...</button>')
    })
})
        $(document).on('click', '.load', function loadMore(){
            const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8dZZXNK8KMqOf8ctUav0BuFe8JYedKdP&limit=" + gifCounter + "&q=" + text[0] + "+fail";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                let result = response.data;
                console.log(result)
                for (let j = gifCount; j<result.length; j++){
                    gifCounter++;
                    gifCount++;
                    const img = $('<img>').addClass('css-image');
                    const div = $('<div>');
                    const rating = result[j].rating.toUpperCase();
                    const gifRate = $('<p class="rating">Rating: ' + rating + '</p>') 
                    img.attr('src', result[j].images.fixed_height_still.url).attr('data-name', j).addClass('js-load');
                    div.append(gifRate);
                    div.prepend(img);
                    $(div).appendTo('.result').addClass('js-gif-click');
                }
                
                $(document).on('click', '.js-load', function clickMore(event){
                    event.preventDefault();
                    const clicked = $(this).attr('data-click');
                    if (clicked == 'clicked'){
                        $(this).attr('src', result[$(this).attr('data-name')].images.fixed_height_still.url);
                        $(this).attr('data-click', 'unclicked');
                    }
                    
                    else {
                        $(this).attr('src', result[$(this).data('name')].images.original.url);
                        $(this).attr('data-click', 'clicked');
                    }
                })
            })
        })
