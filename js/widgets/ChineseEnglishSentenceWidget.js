/**
 * Created by 310199253 on 2017/4/26.
 */
window.addEventListener('load', function(e){

    var ChineseEnglishSentenceWidget = function(rootDom, options){
        this.rootDom = rootDom;

        var widget = this;
        var contentBody = this.rootDom.querySelector('tbody');

        // enable add operation
        var opAddDom = this.rootDom.querySelector('.operation-add');
        opAddDom.addEventListener('click', function (e) {
            var rowTemplate = ChineseEnglishSentenceWidget.getRowTemplate('', '');
            contentBody.appendChild(rowTemplate);
            widget.updateIndexNumber();
        });

        var getAncestor = function(dom, isAncestor){
            var check = function(p) {
                if(!p){
                    return undefined;
                }
                if(isAncestor(p)){
                    return p;
                }else{
                    return check(p.parentElement);
                }
            };

            return check(dom.parentElement);
        };

        // enable remove operation
        contentBody.addEventListener('click', function (e) {
            if(e.target.classList.contains('operation-remove')){
                var confirm = window.confirm('Are you sure?');
                if(confirm){
                    // remove
                    var tr = getAncestor(e.target, function(p){ return p.tagName === 'TR'; });
                    tr.parentElement.removeChild(tr);
                    widget.updateIndexNumber();
                }
            }
        });


        this.getIndexNumberDoms = function () {
            return this.rootDom.querySelectorAll('tbody .index-number');
        };


        this.updateIndexNumber = function(){
            var indexNumberDomList = this.getIndexNumberDoms();
            for(var i=0;i<indexNumberDomList.length;i++){
                var dom =  indexNumberDomList[i];
                dom.innerText = i+1;
            }
        };



    };



    ChineseEnglishSentenceWidget.getRootDomTemplate = function () {
        var div = document.createElement('div');
        var templateStr = '<table class="table table-striped ChineseEnglishSentenceWidget">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>\u53E5\u5B50</th>\n                    <th>\u64CD\u4F5C</th>\n                </tr>\n                </thead>\n                <tbody>\n                </tbody>\n                <tfoot>\n                    <tr>\n                        <td colspan="3" class="operation-add">\n                            Add\n                        </td>\n                    </tr>\n                </tfoot>\n            </table>';

        div.innerHTML = templateStr;
        var table = div.querySelector('table');
        table.parentElement.removeChild(table);
        return table;
    };

    ChineseEnglishSentenceWidget.getRowTemplate = function (chinese, english) {
        var templateStr = '    <tr>\n                <th scope="row" class="index-number"></th>\n                <td>\n                    <div>\n                        <div class="chinese">\n                            <textarea >' + chinese + '</textarea>\n                        </div>\n                        <div class="english">\n                            <textarea >' + english + '</textarea>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class="operation-remove">Remove</span>\n                </td>\n            </tr>';

        var div = document.createElement('table');
        div.innerHTML = templateStr;
        var result = div.querySelector('tr');
        result.parentElement.removeChild(result);
        return result;
    };

    ChineseEnglishSentenceWidget.parse = function(){
        if(!ChineseEnglishSentenceWidget.widgetList){
            ChineseEnglishSentenceWidget.widgetList = [];
        }

        var domList = document.querySelectorAll('[data-widget="ChineseEnglishSentenceWidget"]');
        for(var i=0;i<domList.length;i++){
            var dom = domList[i];
            var template = ChineseEnglishSentenceWidget.getRootDomTemplate();
            // replace dom
            dom.parentElement.insertBefore(template, dom);
            dom.parentElement.removeChild(dom);

            // collect widget
            var widget = new ChineseEnglishSentenceWidget(template, {});
            ChineseEnglishSentenceWidget.widgetList.push(widget);
        }
    };

    ChineseEnglishSentenceWidget.listWidget = function(){
        return ChineseEnglishSentenceWidget.widgetList;
    };

    ChineseEnglishSentenceWidget.parse();

});