/**
 * Created by 310199253 on 2017/4/26.
 */

window.addEventListener('load', function(e){

    var ImageWidget = function(rootDom, options){
        this.rootDom = rootDom;
        this.previewSrc = options.previewSrc;

        // button click
        var widget = this;
        var imgDom = this.rootDom.querySelector('img');
        var opAddDom = this.rootDom.querySelector('.operation-add');
        var inputFileDom = this.rootDom.querySelector('input[type=file]');
        opAddDom.addEventListener('click', function(e){
            inputFileDom.click();
        });

        // preview image
        inputFileDom.addEventListener('change', function(e){
            if(this.files.length> 0){
                var selectedFile = this.files[0];
                var reader = new FileReader();
                reader.addEventListener('load', function(e){
                    imgDom.src = e.target.result;
                });

                reader.readAsDataURL(selectedFile);
            }else{
                imgDom.setAttribute('src', widget.previewSrc);
            }
        });

    };

    ImageWidget.getRootDomTemplate = function(){
        var rootDomTemplateStr = '<div class="ImageWidget">\n                    <div>\n                        <img src="image/placeholder.png" style="width: 100%; height: auto;">\n                    </div>\n                    <div style="text-align: center">\n                        <input type="file" style="display: none;">\n        <button class="btn btn-primary operation-add" >Add</button>\n                    </div>\n                </div>';

        var div = document.createElement('div');
        div.innerHTML = rootDomTemplateStr;

        var template = div.querySelector('.ImageWidget');
        template.parentElement.removeChild(template);

        return template;
    };

    ImageWidget.parse = function(){
        if(!ImageWidget.widgetList){
            ImageWidget.widgetList = [];
        }

        var domList = document.querySelectorAll('[data-widget="ImageWidget"]');
        for(var i=0;i<domList.length;i++){
            var dom = domList[i];
            var previewSrc = dom.getAttribute('data-preview-src');
            var template = ImageWidget.getRootDomTemplate();
            // replace dom
            dom.parentElement.insertBefore(template, dom);
            dom.parentElement.removeChild(dom);

            // collect widget
            var widget = new ImageWidget(template, {previewSrc: previewSrc});
            ImageWidget.widgetList.push(widget);
        }
    };

    ImageWidget.listWidget = function(){
        return ImageWidget.widgetList;
    };

    ImageWidget.parse();
});


