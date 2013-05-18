/**
 * TopicInspector namespace.
 */
if ("undefined" == typeof(TopicInspector)) {
  var TopicInspector = {};  //define here?
  var SideBar = {};  
  var TopicTable = new Array();
  var NewsTable = new Array();
};



/**
 * The main function
 */ 
TopicInspector.NewOverLay = {
  /**
   * Do Query with Yql
   */
  UpdateTimeLength = 10 ;  //unit by min.Can be set by user,not impletement.
  if (getTime()%UpdateTimeLength == 0) {
    this.Query();
  }
  
  Query : function() {
    src='http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20query%3D%22sushi%22%20and%20location%3D%22san%20francisco%2C%20ca%22&format=json&diagnostics=true&callback=top_stories'
    /*how to get the top_stories's contents?
    */
    function top_stories(o){  
      var items = o.query.results.Result;   
      var no_items=items.length;  
      for(var i=0;i<no_items;i++){  
        var title = items[i].Title;  
        var link = items[i].Url;  
        var desc = items[i].Description;
        /* run the circulation to find 
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
  var Index = 0;
  for (var i in TopicTable) {
    var index = Index++;
    var label = i;
    ListItem.newItem(index,label);
  }
}

List.add(label) {
  ListItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
}  

ListItem.NewsItem.onClick() {
  var url = NewsTable(NewsItem.Text());
  send url to httpget;
  NewsTable.remove(NewsItem.Text());  //decide the title must be key
  NewsItem.delete;
}

ListItem.NewsItem.update() {
  var Index = 0;
  for (var i in NewsTable) {
    var index = Index++;
    var label = i;
    ListItem.NewsItem.newItem(index,label);  //update but not ListItem open,so ok.
  }
}

ListItem.NewsItem.add(label) {
  ListItem.NewsItem.AddtoTop(label);   //don't know if having this method.if yes,then delete update()
}  

