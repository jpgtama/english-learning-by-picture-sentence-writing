/**
 * Created by Hu Xiao Yi on 2017/4/29.
 */
 
var PracticeListWidget = function(rootDom){
    this.rootDom = rootDom;
   
};
 
 
PracticeListWidget.getRootDomTemplate = function(){
  var templateStr = '<table class="table table-striped PracticeListWidget">     <thead>       <tr>           <th>#</th>           <th>标题</th>           <th>页数</th>       </tr>     </thead>     <tbody>     </tbody>     <tfoot>       <tr>          <td colspan="3" class="add-more-practice">Add Practice</td>       </tr>      </tfoot> </table>';
  var div = document.createElement('div');
  div.innerHTML = templateStr;
  var table = div.querySelector('table');
  table.parentElement.removeChild(table);
  return table;
};

PracticeListWidget.getRowDomTemplate = function(){
  var templateStr = '<table>     <tbody>         <tr>             <th scope="row" class="index-number"></th>             <td>                 <a href="page-list.html" class="title"></a>             </td>             <td>                 <span class="page-number"></span>             </td>         </tr>     </tbody> </table>';
  var div = document.createElement('div');
  div.innerHTML = templateStr;
  var tr = div.querySelector('tr');
  tr.parentElement.removeChild(tr);
  return tr;
};


PracticeListWidget.parse = function(){
  // check widget list
  if(!PracticeListWidget.widgetList){
    PracticeListWidget.widgetList = [];
  }
  
  var domList = document.querySelectorAll('[data-widget="PracticeListWidget"]');
  for(var i=0;i<domList.length;i++){
    var dom = domList[i];
    // replace dom with root template
    var rootDom = PracticeListWidget.getRootDomTemplate();
    dom.parentElement.insertBefore(rootDom, dom);
    dom.parentElement.removeChild(dom);
    
    // create widget with root dom 
    var widget = new PracticeListWidget(rootDom);
    PracticeListWidget.widgetList.push(widget);
  }
  
};


window.addEventListener('load', function(e){
  
  PracticeListWidget.parse();
  
});