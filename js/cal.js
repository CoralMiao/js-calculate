var getScreen = document.getElementById('cal-screen');
var getNum = document.getElementById('cal_btn');
var x1 = 0,
    y1 = 0,
    result = 0,
    flag = false; //标志位，区分第一个和第二个数字
var operation; //定义操作符
// var nums = [],
//     opers = [];
//设置屏幕显示
function setValue(num) {
    getScreen.value = num;
}
// 获取屏幕显示值
function getValue() {
    return getScreen.value;
}
// 绑定点击事件
getNum.onclick = function(e) {
    var evt = e || window.event;
    var target = evt.target || evt.srcElement; //兼容IE属性
    if (target.type == "button") {
        var mark = target.getAttribute("title"); //获取当前button的title值
        var curVal = target.value;
        var num = getValue(); //获取当前输入框的值
        if (mark == "num") {
            // var numbers = [];
            if ((num == "0") || flag) { //当输入的值为零或者是操作符时显示当前数字
                setValue(curVal);
                // console.log(flag);
                flag = false;
                return;
            }
            var showVal = String(num).concat(curVal);
            setValue(showVal);

        } else if (mark == "op") {
            if (flag)
                return;
            flag = true;
            if (!operation) {
                result = +num;
                operation = curVal;
                return;
            }
            result = getOper(result, num, operation);
            setValue(result);
            operation = curVal;
            // console.log(curVal);

        } else if (mark == ".") { //小数点
            var point = String(num).indexOf(".") > -1; //获取小数点位置
            if (point) { //如果小数点前没有数字输出时添加零
                if (flag) {
                    setValue("0" + curVal);
                    flag = false;
                    return;
                }
                return;
            }
            setValue(String(num).concat(curVal));
        } else if (mark == "opers") {
            operation = curVal;
            result = complexCounter(num, operation);
            setValue(result);
            flag = false;
        } else if (mark == "±") {
            setValue(-num);
        } else if (mark == "clear") {
            setValue(0);
            flag = false;
        } else if (mark == "=") {
            if (!operation) return;
            result = getOper(result, num, operation);
            setValue(result);
            operation = null;
            flag = false;
        } else if (mark == "←") {
            var curNum = String(Math.abs(num));
            if ((curNum.length < 2) || num == 0) {
                setValue(0);
            } else {
                setValue(String(num).slice(0, -1)); //显示前0到Length-1之间的数字，即删除最后一个数字
            }
        }
    }
}

function complexCounter(x, com_oper) {
    x = Number(x);
    switch (com_oper) {
        case 'sin':
            return Math.sin((parseFloat(x*Math.PI/180))).toFixed(1);
            break;
        case 'cos':
            return Math.cos(parseFloat((x*Math.PI/180))).toFixed(1);
            break;
        case 'tan':
            return Math.tan(parseFloat((x*Math.PI/180))).toFixed(1);
            break;
        case 'x²':
            return parseFloat((x * x)).toFixed(2);
            break;
        case '√':
            if (x < 0) {
                return Math.sqrt(parseFloat(x.toFixed(2)));
                alert("请输入一个大于零的数");
            } else {
                return Math.sqrt(parseFloat(x)).toFixed(2);
                // console.log(Math.sqrt(x));
            }
            break;
        default:
            alert("error!");
            break;
    }
}
// 运算对象
var counter = {
        '+': function(x, y) {
            return x + y;
        },
        '-': function(x, y) {
            return x - y;
        },
        '*': function(x, y) {
            return x * y;
        },
        '/': function(x, y) {
            if (y == "0") {
                return parseFloat(x / y).toFixed(2);
                alert("请输入一个不为零的数");
            }
            return parseFloat(x / y).toFixed(2);
        }
    }
    //计算函数
function getOper(x, y, oper) {
    //保证num1,num2都为数字
    x = Number(x);
    y = Number(y);
    return counter[oper](x, y);
}
