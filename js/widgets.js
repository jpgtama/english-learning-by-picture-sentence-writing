// /**
//  * Created by 310199253 on 2017/4/19.
//  */
//
// class BaseWidget{
//     constructor(parentNode, domNodeStr){
//         this.domNode = new Util().toDom(domNodeStr);
//         parentNode.appendChild(this.domNode);
//     }
// }
//
//
// // Image Widget
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
//     constructor(parentNode, chineseSentence, englishSentence){
//         super(parentNode, `<div class="chinese-english-sentences-widget">
//             <div class="chinese-sentence">
//                 <textarea cols="100" rows="1"></textarea>
//             </div>
//
//             <div class="english-sentence">
//                 <textarea cols="100" rows="2"></textarea>
//             </div>
//         </div>`);
//
//         this.chineseSentenceTextarea = this.domNode.querySelector('.chinese-sentence textarea');
//         this.englishSentenceTextarea = this.domNode.querySelector('.english-sentence textarea');
//
//         // set sentence
//         if(chineseSentence){
//             this.chineseSentenceTextarea.value = chineseSentence;
//         }
//
//         if(englishSentence){
//             this.englishSentenceTextarea.value = englishSentence;
//         }
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
//                 new ChineseEnglishSentenceWidget(this.domNode, chineseSentence, englishSentence);
//             }
//         }
//
//
//     }
// }
//
// class EditorTextAreaWidget extends BaseWidget{
//     constructor(parentNode){
//         super(parentNode, `<div class="EditorTextAreaWidget">
//             <div class="content-readonly"></div>
//             <div class="content-editable">
//                 <textarea></textarea>
//             </div>
//         </div>`);
//     }
// }
