import {XMLHttpRequest} from 'xmlhttprequest';

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.collectapi.com/news/getNews?country=tr&tag=general");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 2clwJgoLd8kNJymLJdaxQi:2vNf107MfyLIs8IxLXZboM");

xhr.send(data);