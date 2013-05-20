/**
 * TopicInspector namespace.
 */

if ("undefined" == typeof(TopicInspector)) {
  var TopicInspector = {};  //define here?

/*  var TopicTable = new Hashtable();
  var NewsTable = new Hashtable(); */
};
      
// Create a YQL query to get topstories data   
var SideBar = {};
var TopicTable = new Array();
var NewsTable = new Array();



TopicInspctor.BrowserOverlay= {
  TIME_INTERVEL :10*60*1000 ,  //unit by min.Can be set by user,not impletement.

  // Base URI for Web service  
  yql_base_uri :"http://query.yahooapis.com/v1/yql" ;
  
  // Create a variable to make results available  
  // in the global namespace  
  yql_results : "";
      
  // Create a YQL query to get topstories data   
  yql_query :"select * from rss where url= 'http://rss.news.yahoo.com/rss/topstories'";
 
  // This utility function creates the query string  
  // to be appended to the base URI of the YQL Web  
  // service.  
  toQueryString : function(obj) {      
    var parts = [];      
    for(var each in obj) if (obj.hasOwnProperty(each)) {  
      parts.push(encodeURIComponent(each) + '=' + encodeURIComponent(obj[each]));      
  }      
    return TopicInspctor.yql_base_uri + '?' + parts.join('&');    
  },

  // ******* 
  //between * is the part get json data from url

  createXMLHttpRequest : function(xmlHttp) {
    if(window.ActiveXObject) {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest) {
      xmlHttp=new XMLHttpRequest();
    }
    else
    { document.write("your browser don't support ajax");
    }
  },
   
  runQuery  : function(query) {
    var xmlHttp; 
    TopicInspctor.createXMLHttpRequest(xmlHttp);
    if(xmlHttp!=null) {
      xmlHttp.open("get",toQueryString({q: query, format: 'json'}),true);
    xmlHttp.onreadystatechange=TopicInspctor.httpStateChange();
    xmlHttp.send(null);
    }
  },
  
  httpStateChange  : function() {  
    if(xmlHttp.readyState == 4) {      
      if (xmlHttp.status == 200 || xmlHttp.status == 0) {
        var result = xmlHttp.responseText;
        var json = eval("(" + result + ")");
          TopicInspctor.handler(json); //read json data
      }
    }
  },
  
  //*******

  // Callback function for handling response data  
  handler(o)  : function{     
    var items = o.query.results.item;   
    var no_items=items.length;  
    for(var i=0;i<no_items;i++){  
      var title = items[i].title;  
      var link = items[i].link;  
      var pubDate = items[i].pubDate; 
      var date = new Date(pubDate);  
      /* run the circulation to find something new
      */
      for (var i in TopicTable.keys()) {
        if (title.indexOf(i) > 0 & data.getTime() > new Date().getTime()-TIME_INTERVEL ) {  //may find the same news with different topics 
          ListItem.Bracket++; //if ListItem has this attribute?will it update instantly?
          NewsTable.put(title,link);
          ListItem.NewsItem.update();  //if they can update simultaneously?
          ListItem.NewsItem.add(); //or this one?
        }
      }
    }
  },
  onClick : function(aEvent) {
  /* Call the sidebar 
  */
    TopicInspctor.SideBar.NewLay.alert() ;
  },
  /*only one button whose label is "Add"
  ListItem label is key,time is value
  ListItem.Listopen is default,never change.
  */
  SideBar.NewLay.onButtonClick :function(aEvent) {
    let key = Text.value;
    if (key == "") {alert("nothing"); } //User input nothing
    else {
      Hashtable.TopicTable.put(getTime().toString(),key) ;
      TopicInspctor.List.update();
      TopicInspctor.List.add(key); // select one 
    }
  } ,

  /*LeftClick to open/close the secondary list
  */
  ListItem.onClick : function(Item.Text()) {
    TopicInspctor.ListItem.ListOpen = not TopicInspctor.ListItem.ListOpen;
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

  TopicInspctor.List.update() : function {
    var Id = 0;
    for (var i in Hashtable.TopicTable) {
      var index = Id++;
      var label = i;
      ListItem.newItem(index,label);
    }
  },

  List.add(label) : function {
    ListItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
  }   ,

  ListItem.NewsItem.onClick()  : function{
    var url = Hashtable.NewsTable(NewsItem.Text());
    send url to httpget;
    NewsTable.remove(NewsItem.Text());  //decide the title must be key
    NewsItem.delete;
  },

  ListItem.NewsItem.update : function() {
    var Id = 0;
    for (var i in Hashtable.NewsTable) {
      var index = Id++;
      var label = i;
      ListItem.NewsItem.newItem(index,label);  //update but not ListItem open,so ok.
    }
  },

  ListItem.NewsItem.add : function(label) {
    ListItem.NewsItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
  }   
};
/* function run here
Call YQL Web service and use YQL query  
to get results from web 
*/
setInterval("runQuery(", TIME_INTERVEL);

  
 

