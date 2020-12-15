# let和const命令

## 1.let命令

* 基本用法

    let用来声明变量，它所声明的变量，只在let命令所在的代码块内有效。

```js
{
    var a = 1;
    let b = 1;
}
a  //1
b  //ReferenceError: b is not defined
```

* 不存在变量提升

    let声明的变量一定要在声明后使用。

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

* 暂时性死区（temporal dead zone，简称 TDZ）

    只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

* 不允许重复声明

    let不允许在相同作用域内，重复声明同一个变量。

## 2.块级作用域

* 为什么需要块级作用域？

    1.内层变量可能会覆盖外层变量
    ```js
    let a = 1;
    function f() {
        consoel.log(a);
        if(false) {
            var a = 2;
        }
    }
    f();  //undefined
    ```

    2.用来计数的循环变量泄露为全局变量
    ```js
    var s = 5;

    for(var i = 0;i < s; i++){
        //dosomething...
    }

    console.log(i);  // 5
    ```

* ES6的块级作用域

    1.外层代码块不受内层代码块的影响

    2.ES6允许块级作用域的任意嵌套

    3.内层作用域可以定义外层作用域的同盟变量

* 块级作用域与函数声明

    1.ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

    2.但是，浏览器没有遵守这个规定

    3.ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。

```js
//es5环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();  // I am inside!
}());
```

```js
//es6环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();  // Uncaught TypeError: f is not a function
}());
```

## 3.const命令

* 基本用法

    1.const声明一个只读的常量，一旦声明，常量的值就不能改变

    2.这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
    ```js
    const foo;
    // SyntaxError: Missing initializer in const declaration
    ```
    3.const命令和let命令相同点：

        a.只在声明所在的块级作用域内有效

        b.声明的值不提升，同样存在暂时性死区
        
        c.不可重复声明

* 本质

    1.const实际上保证的，是变量指向的内存地址所保存的数据不得改动。

    2.对应复合类型的数据，const只能保证这个指针是固定的，不能控制它指向的数据结构是不是可变的。

* ES6声明变量的六种方法

    1.ES5：var命令 和 function命令

    2.ES6：let,const,import,class

## 4.顶层对象的属性

    a.顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。

    b.es5中，顶层对象的属性与全局变量是等价的。

    c.es6中，let命令、const命令、class命令声明的全局变量，不属于顶层对象的是属性。

## 5.globalThis对象

    ES2020 在语言标准的层面，引入globalThis作为顶层对象。
    也就是说，任何环境下，globalThis都可以指向全局环境下的this。