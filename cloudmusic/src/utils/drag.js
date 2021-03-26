/**
 * EventUtil: 标准事件流处理对象(向后兼容浏览器)
 * EventTarget: 构造函数。实例化的对象暴露添加事件处理函数(addHandler)、执行事件处理函数(run)、清除事件处理函数(removeHandler)三个接口
 * dragdrop: 实例拖拽对象(dragObject)。监听鼠标事件，完成位移。
 * 用法：导出dragObject，className=="draggable"即可完成拖拽功能。
 */

//标准事件流(处理浏览器兼容性问题)
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  getEvent: function (event) {
    var e = event || window.event;
    if (!e) {
      var c = this.getEvent.caller;
      while (c) {
        e = c.arguments[0];
        if (e && Event == e.constructor) {
          break;
        }
        c = c.getEvent.caller;
      }
    }
    return e;
  },
  preventDefault: function (event) {
    if (event.preventDefault()) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};

function EventTarget() {
  //handlers是一个对象
  this.handlers = {};
}
EventTarget.prototype = {
  constructor: EventTarget,
  //初始化handlers的event.type属性是一个数组，并把函数成为该数组元素
  addHandler: function (type, handler) {
    //注意这里使用this
    if (typeof this.handlers[type] == "undefined") {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },
  //执行函数，在下面调用，如果event.type属性（这是一个数组）存入了函数作为元素，取出数组中元素依次运行
  run: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array) {
      var runs = this.handlers[event.type];
      for (var i = 0, len = runs.length; i < len; i++) {
        runs[i](event);
        console.log(runs[i]);
      }
    }
  },
  //遍历某event.type属性的每个元素，找到要删除的方法后删除该元素
  removeHandler: function (type, handler) {
    if (this.handlers[type] instanceof Array) {
      var remove = this.handlers[type];
      for (var i = 0, len = remove[type].length; i < len; i++) {
        if (remove[i] === handler) {
          break;
        }
      }
      remove.splice(i, 1);
    }
  }
};

//准备工作做完，开始封装一个拖拽函数，返回一个拖拽对象
var dragdrop = function () {  
  //定义一个EventTarget对象，最后作为返回值，因为EventTarget对象在上面有add和remove接口
  var dragObject = new EventTarget();
  var dragging = null, diffx = 0, diffy = 0, message;
  //针对ie5+，通用的获取浏览器长宽
  var browerWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var browerHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //真正实现拖拽功能的函数
  function handleEvent(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (event.type) {
      case "mousedown":
        //如果鼠标点击的标签className中有draggable，就可以拖拽
        if (target.className.indexOf("draggable") > -1) {
          dragging = target;
          //diffx是偏移量，鼠标选取位置和div最左边界的距离
          diffx = event.clientX - target.offsetLeft;
          diffy = event.clientY - target.offsetTop;
        }
        break;
      case "mousemove":
        if (dragging !== null) {
          // 获取拖拽对象的长宽
          if (dragging.currentStyle) {      //IE不支持getComputedStyle方法
            var draggingW = dragging.currentStyle.width;
            var draggingH = dragging.currentStyle.height;
          } else {                       //非IE浏览器可以用getComputedStyle方法
            var draggingW = document.defaultView.getComputedStyle(dragging, null).width;
            var draggingH = document.defaultView.getComputedStyle(dragging, null).height;
          }
          if ((event.clientX - diffx) < 0) {
            //如果鼠标位置比之前要往左了,重置为0
            dragging.style.left = 0 + "px";
          } else if ((event.clientX - diffx) > (browerWidth - parseInt(draggingW))) {
            //如果鼠标位置比之前要往右了,设置为最右值
            dragging.style.left = (browerWidth - parseInt(draggingW)) + "px";
          } else {
            //正常情况直接设置值
            dragging.style.left = (event.clientX - diffx) + "px";
          }
          if ((event.clientY - diffy) < 0) {
            dragging.style.top = 0 + "px";
          } else if ((event.clientY - diffy) > (browerHeight - parseInt(draggingH))) {
            dragging.style.top = (browerHeight - parseInt(draggingH)) + "px";
          } else {
            dragging.style.top = (event.clientY - diffy) + "px";
          }
          
        }
        break;
      case "mouseup":
        dragging = null;
        document.onmousemove = null;
        document.onmouseup = null;
        break;
    }
  };
  //外部接口
  dragObject.enable = function () {
    EventUtil.addHandler(document, "mousedown", handleEvent);
    EventUtil.addHandler(document, "mousemove", handleEvent);
    EventUtil.addHandler(document, "mouseup", handleEvent);
  };
  dragObject.disable = function () {
    EventUtil.removeHandler(document, "mousedown", handleEvent);
    EventUtil.removeHandler(document, "mousemove", handleEvent);
    EventUtil.removeHandler(document, "mouseup", handleEvent);
  };
  //返回该对象用于自定义拖拽事件
  return dragObject;
};
var dragObject = dragdrop();
dragObject.enable();