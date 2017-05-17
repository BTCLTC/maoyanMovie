//可复用函数
function getStyle(obj,attr){            //获取计算属性
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};
function getElementLeft(element){           //计算距离文档左偏移
    var actualLeft = element.offsetLeft; 
    var current = element.offsetParent; 
    while (current !== null){         
        actualLeft += current.offsetLeft; 
        current = current.offsetParent; 
    } 
    return actualLeft; 
} 
function getElementTop(element){            //计算距离文档上偏移
    var actualTop = element.offsetTop; 
    var current = element.offsetParent; 
    while (current !== null){         
        actualTop += current. offsetTop; 
        current = current.offsetParent; 
    } 
    return actualTop; 
} 

export {getStyle,getElementLeft,getElementTop};