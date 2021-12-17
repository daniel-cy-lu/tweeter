// Function that count the remaining letters in the chat box using jQuery

$(() => {
  $('textarea').keyup(function() {
    
    let characterCount = $(this).val().length;
    let remaining = $('#remaining');
    let remainingNum = 140 - characterCount;
    if (remainingNum < 0) {
      remaining.css('color', '#F00001');
    }
    if (remainingNum > 0) {
      remaining.css('color', 'black');
    }
    remaining.text(remainingNum);
  });
});




