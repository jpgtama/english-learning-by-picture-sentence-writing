/**
 * Created by evan on 2017/4/18.
 */


class Util {
    constructor() {
        this.helperDom = document.createElement('div');
    }

    toDom(str) {
        this.helperDom.innerHTML = str;

        var child = this.helperDom.firstElementChild;

        this.helperDom.innerHTML = '';

        return child;
    }

}


class MyHttpRequest{
    constructor(url){
        this.url = url;
        this.httpRequest = new XMLHttpRequest();
    }

    _setCallback(cb){
        this.httpRequest.onreadystatechange = () => {
            if(this.httpRequest.readyState === XMLHttpRequest.DONE){
                if(this.httpRequest.status === 200){
                    var data = this.httpRequest.responseText;
                    cb(data);
                }else{
                    throw 'response code is not 200, it is '+ this.httpRequest.status;
                }
            }
        };
    }

    get(callback){
        // this.httpRequest.onreadystatechange = () => {
        //     if(httpRequest.readyState === XMLHttpRequest.DONE){
        //         if(httpRequest.status === 200){
        //             var data = httpRequest.responseText;
        //             callback(data);
        //         }else{
        //             throw 'response code is not 200, it is '+ httpRequest.status;
        //         }
        //     }
        // };
        this._setCallback(callback);
        this.httpRequest.open('GET', this.url, true);
        this.httpRequest.send();
    }

}

class BaseWidget{
    constructor(parentNode, domNodeStr){
        this.domNode = new Util().toDom(domNodeStr);
        parentNode.appendChild(this.domNode);
    }
}


// Image Widget
class ImageWidget extends BaseWidget{
    constructor(parentNode) {
        super(parentNode, `<div class="picture-widget">
            <input type="file"/>
            <div class="preview"></div>
        </div>`);

        // get inner node
        this.uploadNode = this.domNode.querySelector('input');
        this.previewNode = this.domNode.querySelector('.preview');


        // handle file select
        var handleFileSelect =  (evt) => {
            var files = evt.target.files; // FileList object

            // check file count
            if (files.length !== 1) {
                throw 'only 1 file should be selected';
            }

            this.selectedFile = files[0];

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

                // Only process image files.
                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                reader.onload = (e) => {
                    this.previewNode.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', escape(this.selectedFile.name), '"/>'].join('');
                };

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
        };

        this.uploadNode.addEventListener('change', handleFileSelect, false);
    }


}

class ChineseEnglishSentenceWidget extends BaseWidget{
    constructor(parentNode, chineseSentence = '', englishSentence = ''){
        super(parentNode, `<div class="chinese-english-sentences-widget">
            <div class="chinese-sentence">
                
            </div>

            <div class="english-sentence">
                
            </div>
        </div>`);

        // add EditorTextAreaWidget
        new EditorTextAreaWidget(this.domNode.querySelector('.chinese-sentence'), 'readonly', chineseSentence);
        new EditorTextAreaWidget(this.domNode.querySelector('.english-sentence'), 'readonly', englishSentence);


    }
}

class ChineseEnglishSentenceListWidget extends BaseWidget{
    constructor(parentNode, sentenceListStr){
        super(parentNode, `<div class="chinese-english-sentence-list-widget">
        </div>`);

        if(sentenceListStr){
            var sentenceListArray = sentenceListStr.split('\n').filter(el => {return el.trim().length > 0;});
            for(var i=0;i<sentenceListArray.length;i+=2){
                var chineseSentence = sentenceListArray[i];
                var englishSentence = sentenceListArray[i+1];
                new ChineseEnglishSentenceWidget(this.domNode, chineseSentence, englishSentence);
            }
        }


    }
}

class EditorTextAreaWidget extends BaseWidget{
    constructor(parentNode, /* String('readonly', 'editable') */mode = 'readonly', contentStr){
        super(parentNode, `<div class="EditorTextAreaWidget">
            <div class="readOnlyNode">
                <div class="toolbar"></div>
                <div class="content"></div>
            </div>
            <div class="editableNode">
                <div class="toolbar"></div>
                <textarea class="content" cols="100" rows="2"></textarea>
            </div>
        </div>`);

        this.readOnlyNode = this.domNode.querySelector('.readOnlyNode');
        this.editableNode = this.domNode.querySelector('.editableNode');

        // add tool bar widget
        new ToolBarWidget(this.readOnlyNode.querySelector('.toolbar'), {Edit: ()=>{
            this.editableMode();
        }});

        new ToolBarWidget(this.editableNode.querySelector('.toolbar'), {Done: ()=>{
            this.readonlyMode();
        }});

        // set content
        if(contentStr){
            this.readOnlyValue = contentStr;
            this.editableValue = contentStr;
        }

        // select mode
        if(mode === 'readonly'){
            this.readonlyMode();
        }else if(mode === 'editable'){
            this.editableMode();
        }else{
            throw 'not supported mode';
        }
    }

    set readOnlyValue(v){
        this.readOnlyNode.querySelector('.content').innerText = v;
    }
    get readOnlyValue(){
        return this.readOnlyNode.querySelector('.content').innerText;
    }

    set editableValue(v){
        this.editableNode.querySelector('textarea').value = v;
    }

    get editableValue(){
        return this.editableNode.querySelector('textarea').value;
    }

    readonlyMode(){
        this.readOnlyValue = this.editableValue;

        this.setEditableNodeDisplay(false);
        this.setReadOnlyNodeDisplay(true);
    }

    editableMode(){
        this.setReadOnlyNodeDisplay(false);
        this.setEditableNodeDisplay(true);
    }

    setEditableNodeDisplay(isShow){
        this.editableNode.style.display = isShow? 'table' : 'none';
    }

    setReadOnlyNodeDisplay(isShow){
        this.readOnlyNode.style.display = isShow? 'table' : 'none';
    }
}

class ToolBarWidget extends BaseWidget{
    constructor(parentNode, buttons = {Done: ()=> {alert('Default Toolbar Item')}}){

        //  parse buttons
        var itemsHtml = '';

        Object.keys(buttons).forEach(k => {
            var span = `<span class="item">${k}</span>`;
            itemsHtml += span;
        });


        var template = `<div class="toolbarWidget">${itemsHtml}</div>`;


        super(parentNode, template);

        this.buttons = buttons;
        this.setListener();
    }

    setListener(){
        this.domNode.addEventListener('click', e => {
            var innerText = e.target.innerText;

            if(this.buttons[innerText]){
                this.buttons[innerText]();
            }

        });
    }

}
