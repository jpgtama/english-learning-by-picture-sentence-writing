/**
 * Created by Hu Xiao Yi on 2017/4/29.
 */
define(['../utils/URLRouter'], function(URLRouter){
  
    var PracticeListWidget = function (rootDom) {
      var init = function(){
          this.rootDom = rootDom;
      };

      var urlRouter = new URLRouter();

      // add more practice
      var enable_operation_add_more_practice = function(){
          this.addMorePracticeDom = this.rootDom.querySelector('.add-more-practice');
          this.addMorePracticeDom.addEventListener('click', function(e){
              // go to url add-practice.html
              urlRouter.goPath('./add-practice.html');
          });
      };
      
      //
      init();
      enable_operation_add_more_practice();

    };  


    PracticeListWidget.getRootDomTemplate = function () {
        var templateStr = '<table class="table table-striped PracticeListWidget">     <thead>       <tr>           <th>#</th>           <th>标题</th>           <th>页数</th>       </tr>     </thead>     <tbody>     </tbody>     <tfoot>       <tr>          <td colspan="3" class="add-more-practice">Add Practice</td>       </tr>      </tfoot> </table>';
        var div = document.createElement('div');
        div.innerHTML = templateStr;
        var table = div.querySelector('table');
        table.parentElement.removeChild(table);
        return table;
    };

    PracticeListWidget.getRowDomTemplate = function () {
        var templateStr = '<table>     <tbody>         <tr>             <th scope="row" class="index-number"></th>             <td>                 <a href="page-list.html" class="title"></a>             </td>             <td>                 <span class="page-number"></span>             </td>         </tr>     </tbody> </table>';
        var div = document.createElement('div');
        div.innerHTML = templateStr;
        var tr = div.querySelector('tr');
        tr.parentElement.removeChild(tr);
        return tr;
    };


    PracticeListWidget.parse = function () {
        // check widget list
        if (!PracticeListWidget.widgetList) {
            PracticeListWidget.widgetList = [];
        }

        var domList = document.querySelectorAll('[data-widget="PracticeListWidget"]');
        for (var i = 0; i < domList.length; i++) {
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
  
    PracticeListWidget.parse();
    
    // window.addEventListener('load', function (e) {



    // });
  
    return PracticeListWidget;
  
});
 
 
 



