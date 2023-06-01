import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import './main.html';
import './component/navbar.html';
import './component/redline.html';
import './component/footer.html';


function apiCall() {

    var options = {
        headers: {
          'Authorization': 'apikey 2clwJgoLd8kNJymLJdaxQi:2vNf107MfyLIs8IxLXZboM',
          'Content-Type': 'application/json'
       }
    };

    HTTP.call('GET', 'https://api.collectapi.com/news/getNews?country=tr&tag=general', options, (error, response) => {
        if (error) {
            console.log('API yanıtında hata:', response.error);
        } else {
            console.log(response.data.result);
            const news = [];

            response.data.result.forEach(element => {
                const item = {
                    key: element.key,
                    url: element.url,
                    description: element.description,
                    image: element.image,
                    name: element.name,
                    source: element.source,
                    date: element.date,
                    tag: element.tag,
                }
                news.push(item);
          });
        }
    });
    return news;
}


// Restful apiye istek at ve gelen responsu ekrana yazdır 

Template.newsList.onCreated(function () {

    this.newsList     = new ReactiveVar([]);
    this.firstItem    = new ReactiveVar([]);

    var options = {
      headers: {
         'Authorization': 'apikey 2clwJgoLd8kNJymLJdaxQi:2vNf107MfyLIs8IxLXZboM',
         'Content-Type': 'application/json'
      }
   };

   this.autorun(() => {
      HTTP.call('GET', 'https://api.collectapi.com/news/getNews?country=tr&tag=general', options, (error, response) => {

         if (error) {
            console.log('API yanıtında hata:', response.error);
         } else {
            console.log(response.data.result);
            const news = [];
            
            response.data.result.forEach(element => {
               const item = {
                  key: element.key,
                  url: element.url,
                  description: element.description,
                  image: element.image,
                  name: element.name,
                  source: element.source,
                  date: element.date,
                  tag: element.tag,
               }
               news.push(item);
            });

            // get other items from news 
            this.newsList.set(news.slice(1,));
            // gets keys from news
            this.firstItem.set(news.slice(0,1));
            // console.log("haberler tüm: " + JSON.stringify(this.newsList.get()));

         }
      });
   });
});


Template.newsList.helpers({
  
  firstNews() {
    const tempIns = Template.instance();
    console.log("Buradayım first")
    console.log(tempIns.firstItem.get())
    return tempIns.firstItem.get();
  },

  otherNewsItems() {
    // console.log("Buradayım others")
      const tempIns = Template.instance();
      return tempIns.newsList.get() ;
  },
  isFirstNewsItem(key) {
    return key === "0";
  }
 });



