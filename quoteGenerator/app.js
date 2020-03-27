document.querySelector('.generate').addEventListener('click', getJokes);

const twitterButton = document.querySelector(".twitter-share-button");
const facebookButton = document.querySelector('.facebook');



function getJokes(e) {

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.quotable.io/random', true);


  xhr.onload = function(){
    if(this.status === 200){
      const quote = JSON.parse(this.responseText);
 
      let content = `
        ${quote.content}
      `
      let author = `
      ${quote.author}`

      document.querySelector('.quote').innerHTML = content;
      document.querySelector('.author').innerHTML = author;

  
      twitterButton.setAttribute('href','https://twitter.com/intent/tweet?text='+encodeURI(quote.content + ', by ' + quote.author));
      facebookButton.setAttribute('href','https://www.facebook.com/sharer/sharer.php?u='+encodeURI(quote.content + ', by ' + quote.author));
      
    }
    document.querySelector('.share').style.display ='inline-block';
    document.querySelector('.facebook').style.display ='inline-block';
    document.querySelector('.content').style.height = '400px';
  }


  xhr.send();


}

/*
function tweet(e){
  e.preventDefault();



  var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
  if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;

    

  }
*/
