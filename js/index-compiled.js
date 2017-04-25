'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by evan on 2017/4/18.
 */

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);

        this.helperDom = document.createElement('div');
    }

    _createClass(Util, [{
        key: 'toDom',
        value: function toDom(str) {
            this.helperDom.innerHTML = str;

            var child = this.helperDom.firstElementChild;

            this.helperDom.innerHTML = '';

            return child;
        }
    }]);

    return Util;
}();

var MyHttpRequest = function () {
    function MyHttpRequest(url) {
        _classCallCheck(this, MyHttpRequest);

        this.url = url;
        this.httpRequest = new XMLHttpRequest();
    }

    _createClass(MyHttpRequest, [{
        key: '_setCallback',
        value: function _setCallback(cb) {
            var _this = this;

            this.httpRequest.onreadystatechange = function () {
                if (_this.httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (_this.httpRequest.status === 200) {
                        var data = _this.httpRequest.responseText;
                        cb(data);
                    } else {
                        throw 'response code is not 200, it is ' + _this.httpRequest.status;
                    }
                }
            };
        }
    }, {
        key: 'get',
        value: function get(callback) {
            this._setCallback(callback);
            this.httpRequest.open('GET', this.url, true);
            this.httpRequest.send();
        }
    }]);

    return MyHttpRequest;
}();

// class BaseWidget{
//     constructor(parentNode, domNodeStr){
//         this.domNode = new Util().toDom(domNodeStr);
//         if(parentNode){
//             parentNode.appendChild(this.domNode);
//         }
//
//     }
// }


// Image Widget
// class ImageWidget extends BaseWidget{
//     constructor(parentNode) {
//         super(parentNode, `<div class="picture-widget">
//             <input type="file"/>
//             <div class="preview"></div>
//         </div>`);
//
//         // get inner node
//         this.uploadNode = this.domNode.querySelector('input');
//         this.previewNode = this.domNode.querySelector('.preview');
//
//         // handle file select
//         var handleFileSelect =  (evt) => {
//             var files = evt.target.files; // FileList object
//
//             // check file count
//             if (files.length !== 1) {
//                 throw 'only 1 file should be selected';
//             }
//
//             this.selectedFile = files[0];
//
//             // Loop through the FileList and render image files as thumbnails.
//             for (var i = 0, f; f = files[i]; i++) {
//
//                 // Only process image files.
//                 if (!f.type.match('image.*')) {
//                     continue;
//                 }
//
//                 var reader = new FileReader();
//
//                 reader.onload = (e) => {
//                     this.previewNode.innerHTML = ['<img class="thumb" src="', e.target.result,
//                         '" title="', escape(this.selectedFile.name), '"/>'].join('');
//                 };
//
//                 // Read in the image file as a data URL.
//                 reader.readAsDataURL(f);
//             }
//         };
//
//         this.uploadNode.addEventListener('change', handleFileSelect, false);
//     }
//
//
// }
//
// class ChineseEnglishSentenceWidget extends BaseWidget{
//     constructor(parentNode, chineseSentence = '', englishSentence = '', mode='readonly'){
//         super(parentNode, `<div class="chinese-english-sentences-widget">
//             <div class="content">
//                 <div class="chinese-sentence">
//                 </div>
//                 <div class="english-sentence">
//                 </div>
//             </div>
//         </div>`);
//
//         // add EditorTextAreaWidget
//         // new EditorTextAreaWidget(this.domNode.querySelector('.chinese-sentence'), mode, chineseSentence);
//         // new EditorTextAreaWidget(this.domNode.querySelector('.english-sentence'), mode, englishSentence);
//
//         // add AreaWidget
//         new TextAreaWidget(this.domNode.querySelector('.chinese-sentence'), chineseSentence);
//         new TextAreaWidget(this.domNode.querySelector('.english-sentence'), englishSentence);
//
//     }
// }
//
// class ChineseEnglishSentenceListWidget extends BaseWidget{
//     constructor(parentNode, sentenceListStr){
//         super(parentNode, `<div class="chinese-english-sentence-list-widget">
//         </div>`);
//
//         if(sentenceListStr){
//             var sentenceListArray = sentenceListStr.split('\n').filter(el => {return el.trim().length > 0;});
//             for(var i=0;i<sentenceListArray.length;i+=2){
//                 var chineseSentence = sentenceListArray[i];
//                 var englishSentence = sentenceListArray[i+1];
//
//                 this.addOne(chineseSentence, englishSentence);
//             }
//         }
//
//         // add AddMoreWidget
//         this.addMoreWidget = new AddMoreWidget(this.domNode, e => {
//             this.addOne('', '');
//             this.domNode.appendChild(this.addMoreWidget.domNode);
//         });
//
//     }
//
//     addOne(chineseSentence, englishSentence){
//         var cesw = new ChineseEnglishSentenceWidget(null, chineseSentence, englishSentence);
//         new ToolBarWrapper(this.domNode, {Remove: (item)=>{
//             var isRemove = window.confirm('Are you sure?');
//             if(isRemove){
//                 item.parentElement.removeChild(item);
//             }
//         }}, cesw.domNode);
//     }
//
// }
//
// class TextAreaWidget extends BaseWidget{
//     constructor(parentNode, contentStr = '') {
//         super(parentNode, `<div class="TextAreaWidget">
//             <div class="editableNode">
//                 <textarea class="content" cols="100" rows="2"></textarea>
//             </div>
//         </div>`);
//         this.content = contentStr;
//     }
//
//     get content(){
//         this.contentNode.value;
//     }
//
//     set content(c){
//         this.contentNode.value = c;
//     }
//
//     get contentNode(){
//         return this.domNode.querySelector('textarea');
//     }
// }
//
//
//
// class AddMoreWidget extends BaseWidget{
//     constructor(parentNode, callback = ()=>{alert('Default Add More Widget')}){
//         super(parentNode, `<div class="AddMoreWidget">
//             <span>+</span>
//         </div>`);
//
//         // add event listener
//         this.domNode.addEventListener('click', callback);
//     }
// }
//
// class ToolBarWrapper extends BaseWidget{
//     constructor(parentNode, buttons = {Done: ()=> {alert('Default Toolbar Item')}}, workingAreaDom){
//         //  parse buttons
//         var itemsHtml = '';
//
//         Object.keys(buttons).forEach(k => {
//             var span = `<div class="item">${k}</div>`;
//             itemsHtml += span;
//         });
//
//         var template = `<div class="toolbar-wrapper">
//             <div class="toolbar">
//                 ${itemsHtml}
//             </div>
//
//             <div class="working-area-attach-point"></div>
//         </div>`;
//
//         super(parentNode, template);
//
//         // add workingAreaDom
//         if(workingAreaDom){
//             this.workingAreaDom = workingAreaDom;
//             this.workingAreaAttachPoint.appendChild(workingAreaDom);
//         }else{
//             throw 'no workingAreaDom';
//         }
//
//         this.buttons = buttons;
//         this.setListener();
//     }
//
//
//     get workingAreaAttachPoint(){
//         return this.domNode.querySelector('.working-area-attach-point');
//     }
//
//     setListener(){
//         this.domNode.addEventListener('click', e => {
//             var innerText = e.target.innerText;
//
//             if(this.buttons[innerText]){
//                 // TODO toolwrapper domNode as parameter
//                 this.buttons[innerText](this.domNode);
//             }
//
//         });
//     }
// }

//# sourceMappingURL=index-compiled.js.map