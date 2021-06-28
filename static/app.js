let score = 0;
let canPlay = true;
let guessedWords = []

setTimeout(async function(){
  canPlay = false;
  resp = await makeStats();
  bestScore = resp.data.best_score;
  plays = resp.data.times_played;
  alert(`your score was ${score} your best score was ${bestScore} you played ${plays} times`)
}, 60000);

async function makeGuess(word){
    resp = await axios({
        method: 'POST',
        url: '/boggle-form',
        data: {
          guess: word,
        }
      });
    return resp
    
}

async function makeStats(){
  resp = await axios({
      method: 'POST',
      url: '/boggle-stats',
      data: {
        new_score: score,
      }
    });
  return resp
}

$('#btn').click(async function(e){
    e.preventDefault();
    if(canPlay){
      guess = $('#guess').val();
      if(guessedWords.includes(guess)){
        alert(';)')
        return
      }
      guessedWords.push(guess);
      resp = await makeGuess(guess)
      $('#results').text(resp.data.result)
      if(resp.data.result == 'ok'){
        score += guess.length;
      }
    }else{
      alert('time is up')
    }
})

