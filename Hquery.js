/**
 * Created by Administrator on 2016/1/9.
 */
function $( vArg ){
    return new Hquery( vArg );
}

function  Hquery ( vArg ){
    this.elements = [];  //
    switch( typeof vArg ) {
        case 'function':
            bindEvent(window,'load',vArg)
            break
        case 'string':
            switch( vArg[0] ){
                case '#':
                    this.elements.push( document.getElementById(vArg.substring(1)) );
                    break;
                case '.':
                    this.elements = getByClass( document,vArg.substring(1) ) ;
                    break;
                default :
                    this.elements = toArray( document.getElementsByTagName( vArg ) );
                    break;
            }
            break;
        case 'object':
            if( vArg.constructor = Array ){
                this.elements = vArg;
            }
            else{
                this.elements.push( vArg );
            }
            break;
    }
}

Hquery.prototype.css = function( attr,value ){
    if(arguments.length == 2){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style[attr] = value;
        }
    }
    else if(arguments.length == 1){
        return getStyle(this.elements[0],attr);
    }
    return this;
}

Hquery.prototype.html = function( str ){
    if(str){
        for(var i=0;i<this.elements.length;i++)  {
            this.elements[i].innerHTML = str;
        }
    }
    else{
        return this.elements[0].innerHTML;
    }
    return this;
}

Hquery.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        bindEvent(this.elements[i],'click',fn);
    }
    return this;
}

Hquery.prototype.on = function( events,fn ){
    for(var i=0;i<this.elements.length;i++){
        bindEvent(this.elements[i],events,fn);
    }
    return this;
}

Hquery.prototype.show = function( ){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
}

Hquery.prototype.hide = function( ){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
}

Hquery.prototype.hover = function( fn1,fn2 ){
    this.on('mouseover',fn1);
    this.on('mouseout',fn2);
        //bindEvent(this.elements[i],'mouseover',fn1);
        //bindEvent(this.elements[i],'mouseout',fn2);
    return this;
}

Hquery.prototype.attr = function( attr,value){
    if(arguments.length == 2){
        for(var i=1;i<this.elements.length;i++){
            this.elements[i].setAttribute(attr,value);
        }
    }
    else if(arguments.length == 1){
        return this.elements[0].getAttribute(attr);
    }
    return this;
}

Hquery.prototype.eq = function(num){
    return $(this.elements[num]);
}

Hquery.prototype.index = function( ){
    var elems = this.elements[0].parentNode.children
    for(var i=0;i<elems.length;i++){
        if( elems[i] == this.elements[0] ){
            return i;
        }
    }
    return this;
}

Hquery.prototype.find = function( sel ){
    var arr = [];
    if( sel.charAt(0) == '.' ){
        for( var i=0;i<this.elements.length;i++ ){
            arr = arr.concat(getByClass( this.elements[i],sel.substring(1) ))
        }

    }
    else {
        for( var i=0;i<this.elements.length;i++ ) {
            arr = arr.concat( toArray( this.elements[i].getElementsByTagName(sel) ) );
        }
    }
    return $(arr);
}

Hquery.prototype.bbb = function( ){


}
function bindEvent(obj,events,fn){
    if(obj.addEventListener){
        obj.addEventListener(events,fn,false);
    }
    else{
        obj.attachEvent('on'+events,fn);
    }
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}
function getByClass( oParent,sClass ){
    var arr = [];
    var elems = oParent.getElementsByTagName('*');
    for( var i=0;i<elems.length;i++ ){
        if( elems[i].className == sClass ){
            arr.push( elems[i] );
        }
    }
    return arr;

}
function toArray( elems ){
    var arr=[];
    for(var i=0;i<elems.length;i++){
        arr.push( elems[i] );
    }
    return arr;
}
