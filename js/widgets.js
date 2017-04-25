
class ChineseEnglishSentenceWidget{
    constructor(rootDom){
        this.rootDom = rootDom;
        this.enableRemoveOperation();
        this.enableAddOperation();
    }



    getContentRowTemplate(chinese, english){
        var templateStr =  `    <tr>
                <th scope="row" class="index-number"></th>
                <td>
                    <div>
                        <div class="chinese">
                            <textarea >${chinese}</textarea>
                        </div>
                        <div class="english">
                            <textarea >${english}</textarea>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="operation-remove">Remove</span>
                </td>
            </tr>`;

        var div = document.createElement('table');
        div.innerHTML = templateStr;
        var result = div.querySelector('tr');
        result.parentElement.removeChild(result);
        return result;
    }

    get contentBody(){
        return this.rootDom.querySelector('tbody');
    }

    get contentTRs(){
        return this.rootDom.querySelectorAll('tbody tr');
    }

    get indexNumberDoms(){
        return this.rootDom.querySelectorAll('tbody .index-number');
    }

    getAncestor(dom, isAncestor){
        var check = p => {

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
    }

    enableAddOperation(){
        this.rootDom.querySelector('.operation-add').addEventListener('click', e =>{
            var rowTemplate = this.getContentRowTemplate('', '');
            this.contentBody.appendChild(rowTemplate);
            this.updateIndexNumber();
        });
    }

    enableRemoveOperation(){
        this.rootDom.addEventListener('click', e => {
            if(e.target.classList.contains('operation-remove')){
                var confirm = window.confirm('Are you sure?');
                if(confirm){
                    // remove
                    this.operation_remove(this.getAncestor(e.target, p => { return p.tagName === 'TR'; }));
                }
            }
        });
    }

    operation_remove(tr){
        tr.parentElement.removeChild(tr);
        this.updateIndexNumber();
    }

    updateIndexNumber(){
        var indexNumber = 1;
        this.indexNumberDoms.forEach(dom => {
            dom.innerText = indexNumber++;
        });
    }

    static get rootDomTemplate(){
        var div = document.createElement('div');
        var templateStr = `<table class="table table-striped chinese-english-sentence-widget">
                <thead>
                <tr>
                    <th>#</th>
                    <th>句子</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="operation-add">
                            Add
                        </td>
                    </tr>
                </tfoot>
            </table>`;

        div.innerHTML = templateStr;
        var table = div.querySelector('table');
        table.parentElement.removeChild(table);
        return table;
    }

    static parse(){
        // find out all element with 'data-widget=chinese-english-sentence-widget' and replace it with template
        document.querySelectorAll('[data-widget=chinese-english-sentence-widget]').forEach(dom => {
            // replace
            var templateDom = ChineseEnglishSentenceWidget.rootDomTemplate;
            dom.parentElement.insertBefore(templateDom, dom);
            dom.parentElement.removeChild(dom);
        });

        // parse, create widget instance and associate with root dom
        document.querySelectorAll('.chinese-english-sentence-widget').forEach(dom => {
            var widget = new ChineseEnglishSentenceWidget(dom);
            if(!ChineseEnglishSentenceWidget.widgetList){
                ChineseEnglishSentenceWidget.widgetList = [];
            }

            ChineseEnglishSentenceWidget.widgetList.push(widget);
        });
    }

    static list(){
        return ChineseEnglishSentenceWidget.widgetList;
    }
}


ChineseEnglishSentenceWidget.parse();