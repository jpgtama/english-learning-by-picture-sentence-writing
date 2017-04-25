'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageUploadWidget = function () {
    function ImageUploadWidget(rootDom) {
        var _this = this;

        _classCallCheck(this, ImageUploadWidget);

        this.rootDom = rootDom;
        // get img dom
        this.imageDom = this.rootDom.querySelector('img');
        this.fileChooseDom = this.rootDom.querySelector('input[type=file]');
        this.buttonDom = this.rootDom.querySelector('button');

        this.buttonDom.addEventListener('click', function (e) {
            _this.fileChooseDom.click();
        });

        this.fileChooseDom.addEventListener('change', function (e) {
            if (_this.fileChooseDom.files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    _this.imageDom.src = e.target.result;
                };
                reader.readAsDataURL(_this.fileChooseDom.files[0]);
            } else {
                _this.imageDom.src = _this.imageDom.getAttribute('data-preview-src');
            }
        });
    }

    _createClass(ImageUploadWidget, null, [{
        key: 'parse',
        value: function parse() {
            alert('begin to parse ImageWidget');

            var testDiv = document.querySelector('#test');
            // testDiv.appendChild(document.createElement('input'));
            testDiv.innerHTML = '<input>';

            // replace all data-widget=image-uploader-widget and replace with template
            document.querySelectorAll('[data-widget=image-uploader-widget]').forEach(function (dom) {
                // get image preview src
                var previewImageSrc = dom.getAttribute('data-preview-src');

                var template = ImageUploadWidget.rootDomTemplate;
                var img = template.querySelector('img');
                img.setAttribute('data-preview-src', previewImageSrc);
                img.setAttribute('src', previewImageSrc);

                // replace
                dom.parentElement.insertBefore(template, dom);
                dom.parentElement.removeChild(dom);
            });

            // find out all image-uploader-widget
            if (!ImageUploadWidget.widgetList) {
                ImageUploadWidget.widgetList = [];
            }
            document.querySelectorAll('.image-uploader-widget').forEach(function (dom) {
                var widget = new ImageUploadWidget(dom);
                ImageUploadWidget.widgetList.push(widget);
            });
        }
    }, {
        key: 'list',
        value: function list() {
            return ImageUploadWidget.widgetList;
        }
    }, {
        key: 'rootDomTemplate',
        get: function get() {
            var templateStr = '<div class="image-uploader-widget">\n                    <div>\n                        <img src="" style="width: 100%; height: auto;">\n                    </div>\n                    <div style="text-align: center">\n                        <input type="file" style="display: none;">\n                        <button class="btn btn-primary" >Upload</button>\n                    </div>\n                </div>';

            var div = document.createElement('div');
            div.innerHTML = templateStr;

            var template = div.querySelector('.image-uploader-widget');
            template.parentElement.removeChild(template);

            return template;
        }
    }]);

    return ImageUploadWidget;
}();

;

window.addEventListener('load', function (e) {
    ImageUploadWidget.parse();
});

var ChineseEnglishSentenceWidget = function () {
    function ChineseEnglishSentenceWidget(rootDom) {
        _classCallCheck(this, ChineseEnglishSentenceWidget);

        this.rootDom = rootDom;
        this.enableRemoveOperation();
        this.enableAddOperation();
    }

    _createClass(ChineseEnglishSentenceWidget, [{
        key: 'getContentRowTemplate',
        value: function getContentRowTemplate(chinese, english) {
            var templateStr = '    <tr>\n                <th scope="row" class="index-number"></th>\n                <td>\n                    <div>\n                        <div class="chinese">\n                            <textarea >' + chinese + '</textarea>\n                        </div>\n                        <div class="english">\n                            <textarea >' + english + '</textarea>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class="operation-remove">Remove</span>\n                </td>\n            </tr>';

            var div = document.createElement('table');
            div.innerHTML = templateStr;
            var result = div.querySelector('tr');
            result.parentElement.removeChild(result);
            return result;
        }
    }, {
        key: 'getAncestor',
        value: function getAncestor(dom, isAncestor) {
            var check = function check(p) {

                if (!p) {
                    return undefined;
                }

                if (isAncestor(p)) {
                    return p;
                } else {
                    return check(p.parentElement);
                }
            };

            return check(dom.parentElement);
        }
    }, {
        key: 'enableAddOperation',
        value: function enableAddOperation() {
            var _this2 = this;

            this.rootDom.querySelector('.operation-add').addEventListener('click', function (e) {
                var rowTemplate = _this2.getContentRowTemplate('', '');
                _this2.contentBody.appendChild(rowTemplate);
                _this2.updateIndexNumber();
            });
        }
    }, {
        key: 'enableRemoveOperation',
        value: function enableRemoveOperation() {
            var _this3 = this;

            this.rootDom.addEventListener('click', function (e) {
                if (e.target.classList.contains('operation-remove')) {
                    var confirm = window.confirm('Are you sure?');
                    if (confirm) {
                        // remove
                        _this3.operation_remove(_this3.getAncestor(e.target, function (p) {
                            return p.tagName === 'TR';
                        }));
                    }
                }
            });
        }
    }, {
        key: 'operation_remove',
        value: function operation_remove(tr) {
            tr.parentElement.removeChild(tr);
            this.updateIndexNumber();
        }
    }, {
        key: 'updateIndexNumber',
        value: function updateIndexNumber() {
            var indexNumber = 1;
            this.indexNumberDoms.forEach(function (dom) {
                dom.innerText = indexNumber++;
            });
        }
    }, {
        key: 'contentBody',
        get: function get() {
            return this.rootDom.querySelector('tbody');
        }
    }, {
        key: 'contentTRs',
        get: function get() {
            return this.rootDom.querySelectorAll('tbody tr');
        }
    }, {
        key: 'indexNumberDoms',
        get: function get() {
            return this.rootDom.querySelectorAll('tbody .index-number');
        }
    }], [{
        key: 'parse',
        value: function parse() {
            // find out all element with 'data-widget=chinese-english-sentence-widget' and replace it with template
            document.querySelectorAll('[data-widget=chinese-english-sentence-widget]').forEach(function (dom) {
                // replace
                var templateDom = ChineseEnglishSentenceWidget.rootDomTemplate;
                dom.parentElement.insertBefore(templateDom, dom);
                dom.parentElement.removeChild(dom);
            });

            // parse, create widget instance and associate with root dom
            document.querySelectorAll('.chinese-english-sentence-widget').forEach(function (dom) {
                var widget = new ChineseEnglishSentenceWidget(dom);
                if (!ChineseEnglishSentenceWidget.widgetList) {
                    ChineseEnglishSentenceWidget.widgetList = [];
                }

                ChineseEnglishSentenceWidget.widgetList.push(widget);
            });
        }
    }, {
        key: 'list',
        value: function list() {
            return ChineseEnglishSentenceWidget.widgetList;
        }
    }, {
        key: 'rootDomTemplate',
        get: function get() {
            var div = document.createElement('div');
            var templateStr = '<table class="table table-striped chinese-english-sentence-widget">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>\u53E5\u5B50</th>\n                    <th>\u64CD\u4F5C</th>\n                </tr>\n                </thead>\n                <tbody>\n                </tbody>\n                <tfoot>\n                    <tr>\n                        <td colspan="3" class="operation-add">\n                            Add\n                        </td>\n                    </tr>\n                </tfoot>\n            </table>';

            div.innerHTML = templateStr;
            var table = div.querySelector('table');
            table.parentElement.removeChild(table);
            return table;
        }
    }]);

    return ChineseEnglishSentenceWidget;
}();

window.addEventListener('load', function (e) {
    ChineseEnglishSentenceWidget.parse();
});

//# sourceMappingURL=widgets-compiled.js.map