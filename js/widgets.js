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