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


// Image Widget
class ImageWidget {
    constructor(parentNode) {
        this.domNode = new Util().toDom(`<div class="picture-widget">
            <input type="file"/>
            <div class="preview"></div>
        </div>`);

        // append to parent
        parentNode.appendChild(this.domNode);

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
