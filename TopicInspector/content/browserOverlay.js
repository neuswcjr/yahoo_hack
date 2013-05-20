/**
 * TopicInspector namespace.
 */
if ("undefined" == typeof(TopicInspector)) {
  var TopicInspector = {};  //define here?
  var TopicTable = new Hashtable();
  var NewsTable = new Hashtable();
};

var TIME_INTERVEL = 10*60*1000 ;  //unit by min.Can be set by user,not impletement.

// Base URI for Web service  
var yql_base_uri = "http://query.yahooapis.com/v1/yql";
  
      
// Create a YQL query to get topstories data   
var yql_query  ="select * from rss where url= "http://rss.news.yahoo.com/rss/topstories"" ;
TopicInspector.NewOverLay = {
  TIME_INTERVEL : 10*60*1000 ,  //unit by min.Can be set by user,not impletement.

  // Base URI for Web service  
  yql_base_uri : "http://query.yahooapis.com/v1/yql",
  
  // Create a variable to make results available  
  // in the global namespace  
  yql_results : "",
      
  // Create a YQL query to get topstories data   
  yql_query : "select * from rss where url= "http://rss.news.yahoo.com/rss/topstories"",
 
  // This utility function creates the query string  
  // to be appended to the base URI of the YQL Web  
  // service.  
  toQueryString: function(obj) {      
    var parts = [];      
    for(var each in obj) if (obj.hasOwnProperty(each)) {  
      parts.push(encodeURIComponent(each) + '=' + encodeURIComponent(obj[each]));      
    }      
    return parts.join('&');    
  },

  // function calling the opensocial makerequest method 
  runQuery :function(ws_base_uri,query, handler) {  
    gadgets.io.makeRequest(ws_base_uri, handler, {  
      METHOD: 'POST',  
      POST_DATA: toQueryString({q: query, format: 'json'}),  
      CONTENT_TYPE: 'JSON',  
      AUTHORIZATION: 'OAuth'      
    });    
  },

  // Callback function for handling response data  
  handler :function (o) {     
    var items = o.query.results.item;   
    var no_items=items.length;  
    for(var i=0;i<no_items;i++){  
      var title = items[i].title;  
      var link = items[i].link;  
      var pubDate = items[i].pubDate; 
      var date = new Date(pubDate);  
      /* run the circulation to find something new
      */
      //for (var i in Hashtable.TopicTable.keys()) {
        //if (title.indexOf(i) > 0 & data.getTime() > new Date().getTime()-TIME_INTERVEL ) {  //may find the same news with different topics 
          //ListItem.Bracket++; //if ListItem has this attribute?will it update instantly?
          HashTable.NewsTable.put(title,link);
          //ListItem.NewsItem.update();  //if they can update simultaneously?
          //ListItem.NewsItem.add(); //or this one?
        }
      }
    }
  }
  onClick : function(aEvent) {
  /* Call the sidebar 
  */
    SideBar.NewLay.alert() ;
  },
  /*only one button whose label is "Add"
  ListItem label is key,time is value
  ListItem.Listopen is default,never change.
  */
  SideBar.NewLay.onButtonClick : function(aEvent) {
    let key = Text.Text();
    if (key == "") { } //User input nothing
    else {
      Hashtable.TopicTable.put(getTime().toString(),key) ;
      List.update();
      List.add(key); // select one 
    }
  } ,

  /*LeftClick to open/close the secondary list
  */
  ListItem.onClick: function(Item.Text()) {
    ListItem.ListOpen = not ListItem.ListOpen;
  
  },
  /*Index as a parameter specify the Topic item index
  */
  List.RightClick : function(ListItem.Text()) {
    Menu.Item = {'delete'};  // other items like "move up" "move down" "top" can impletement later
    Menu.Pop();
    Menu.onClick('delete') {
      Hashtable.TopicTable.remove(ListItem.Text());
    }
  },

  List.update :function() {
    var Id = 0;
    for (var i in Hashtable.TopicTable) {
      var index = Id++;
      var label = i;
      ListItem.newItem(index,label);
    }
  },

  List.add :function(label) {
    ListItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
  }  ,

  ListItem.NewsItem.onClick :function() {
    var url = Hashtable.NewsTable(NewsItem.Text());
    send url to httpget;
    Hashtable.NewsTable.remove(NewsItem.Text());  //decide the title must be key
    NewsItem.delete;
  },

  ListItem.NewsItem.update :function() {
    var Id = 0;
    for (var i in Hashtable.NewsTable) {
      var index = Id++;
      var label = i;
      ListItem.NewsItem.newItem(index,label);  //update but not ListItem open,so ok.
    }
  },

  ListItem.NewsItem.add :function(label) {
    ListItem.NewsItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
  }   

};

/* function run here
Call YQL Web service and use YQL query  
to get results from web 
*/
setInterval("TopicInspector.NewOverLay.runQuery(yql_base_uri,yql_query,TopicInspector.NewOverLay.handler)", TopicInspector.NewOverLay.TIME_INTERVEL);
for (var i in TopicTable.keys();i++) {
 
window.alert(i);
}

  
 

