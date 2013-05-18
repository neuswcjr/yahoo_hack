/**
 * TopicInspector namespace.
 */
if ("undefined" == typeof(TopicInspector)) {
  var TopicInspector = {};  //define here?
  var SideBar = {};  
  var TopicTable = new Array();
  var NewsTable = new Array();
};

var TIME_INTERVEL = 10*60*1000 ;  //unit by min.Can be set by user,not impletement.

    
// This utility function creates the query string  
// to be appended to the base URI of the YQL Web  
// service.  
function toQueryString(obj) {      
  var parts = [];      
  for(var each in obj) if (obj.hasOwnProperty(each)) {  
    parts.push(encodeURIComponent(each) + '=' + encodeURIComponent(obj[each]));      
  }      
  return parts.join('&');    
};

// Store the anonymous function that wraps  
// the OpenSocial function makeRequest  
var runQuery = function(ws_base_uri,query, handler) {  
  gadgets.io.makeRequest(ws_base_uri, handler, {  
    METHOD: 'POST',  
    POST_DATA: toQueryString({q: query, format: 'json'}),  
    CONTENT_TYPE: 'JSON',  
    AUTHORIZATION: 'OAuth'      
  });    
}; 

// Base URI for Web service  
var yql_base_uri = "http://query.yahooapis.com/v1/yql"; 
// Create a variable to make results available  
// in the global namespace  
var yql_results = "";  
      
// Create a YQL query to get topstories data   
var yql_query = "select * from rss where url= "http://rss.news.yahoo.com/rss/topstories""; 

// Callback function for handling response data  
function handler(o) {     
  var items = o.query.results.item;   
  var no_items=items.length;  
  for(var i=0;i<no_items;i++){  
    var title = items[i].title;  
    var link = items[i].link;  
    var pubDate = items[i].pubDate; 
  
    /* run the circulation to find something new
    */
    for (var i in TopicTable.keys) {
      if (desc.FindValue(i)) {  //may find the same news with different topics 
        ListItem.Bracket++; //if ListItem has this attribute?will it update instantly?
        HashTable.NewsTable.put(title,url);
        ListItem.NewsItem.update();  //if they can update simultaneously?
        ListItem.NewsItem.add(); //or this one?
      }
    }
  }
}
/**
 * The main function
 */ 
TopicInspector.NewOverLay = {
  /**
   * Do Query with Yql
   */
  var d = new Date();
  if (d.getTime()%TIME_INTERVEL == 0) {
    this.Query();
  }
  
  function Query() {
    // Call YQL Web service and use YQL query  
    // to get results from web   
    runQuery(yql_base_uri,yql_query,handler);  
      }
    }    
  } 
  
  onClick : function(aEvent) {
  /* Call the sidebar 
  */
    SideBar.NewLay.alert() ;
  }
};

SideBar  {
  /*only one button label is "Add"
  ListItem label is key,time is value
  ListItem.Listopen is default,never change.
  */
  onButtonClick : function(aEvent) {
    let key = Text.Text();
    if (key == "") { } //User input nothing
    else {
      TopicTable.put(getTime().toString(),key) ;
      List.update();
      List.add(key); // select one 
      }
  }
} 

/*LeftClick to open/close the secondary list
*/
ListItem.onClick(Item.Text()) {
  ListItem.ListOpen = not ListItem.ListOpen;
  
}
/*Index as a parameter specify the Topic item index
*/
List.RightClick(ListItem.Text()) {
  Menu.Item = {'delete'};  // other items like "move up" "move down" "top" can impletement later
  Menu.Pop();
  Menu.onClick('delete') {
    TopicTable.remove(ListItem.Text());
  }
}  

List.update() {
  var Id = 0;
  for (var i in TopicTable) {
    var index = Id++;
    var label = i;
    ListItem.newItem(index,label);
  }
}

List.add(label) {
  ListItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
	alert("sdf");
}  

ListItem.NewsItem.onClick() {
  var url = NewsTable(NewsItem.Text());
  send url to httpget;
  NewsTable.remove(NewsItem.Text());  //decide the title must be key
  NewsItem.delete;
}

ListItem.NewsItem.update() {
  var Id = 0;
  for (var i in NewsTable) {
    var index = Id++;
    var label = i;
    ListItem.NewsItem.newItem(index,label);  //update but not ListItem open,so ok.
  }
}

ListItem.NewsItem.add(label) {
  ListItem.NewsItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
}  

