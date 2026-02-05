---
title: C++理论题总结
publishDate: 2024-11-30
description: 'C++理论题总结'
tags:
  - Course
language: 'Chinese'
---

# C++理论题总结

By lhr 2024/7/7

## 目录

[toc]

# 第一周

## PPT

- namespace
	- 所有全局变量共享一个命名空间——默认namespace

## 题目

- Question 4 - 单选题

当x = 24, y = 4 时，语句cout<<( x > 23 && x - y <=20) << endl; 的执行结果为：

A.true

B.1

C.0

D.false

------

Standard Answer: B

只能记住，C++条件运算输出的是1/0



- Question 5 - 单选题

在Linux系统下，选择与下述代码输出相同的选项：

```c
cout << "The answer is:" << ends << 3.14 * 4 << endl;
```

A.`double a = 3.14 * 4; printf("The answer is: %f", a); `

B.`cout << "The answer is: "; cout << 3.14 * 4 << endl; `

C.`printf("The answer is:"); putchar('\0'); printf("%.2f\n", 3.14 * 4); `

D.`printf("The answer is: %d\n", 3.14 * 4); `

------

Standard Answer: C

解释：

* ==`std::ends` 的主要功能是向输出流中插入一个空字符（null character）==，即 ASCII 码为 0 的字符。
* 这个空字符通常用于标记 C 风格字符串的结束。在 C 和 C++ 中，字符串通常以空字符结尾。
* 不同于 `std::endl`，`std::ends` 不会刷新输出流的缓冲区。它只是简单地插入一个空字符。



- Question 7 - 单选题

下述语句的输出是：

```c
cout << 1 + "20.24" << endl << 20.24;

```

A.编译错误

B.21.24

20.24

C.120.24 20.24

D.0.24\n20.24

------

Standard Answer: D

解释：一个整型加一个字符串，其实是地址+1，从0开始输出



Question 8 - 单选题

当输入为`x`时下面语句的输出是？

```c
int x;
cin>>x;
cout<<x;

```

A.0

B.x

C.编译错误

D.字符x的ASKII码

------

Standard Answer: A

解释：

在C++中，如果你运行了上面的代码并尝试输入一个非整数值（如字母`x`），那么`cin >> x;`这一行将会失败，因为它期待的是一个整数。当输入流`cin`遇到它不能解析为整数的字符时，它会停止读取，并设置一个错误状态（failbit），并将x设置为0。

Question 12 - 单选题

下面代码在输入2以后，输出为？

```C++
#include<iostream>
using namespace std; 
int main(){
	int cout;
	cin>>cout;
	std::cout<<(cout<<cout);
}

```

A.2

B.编译错误

C.4

D.8

------

Standard Answer: D

解释：

注意命名空间之间的嵌套，全局cout覆盖了std的cout，<< 左操作数是整数，所以移位



Question 13 - 单选题

下面代码在输入2以后，输出为？

```c
#include<iostream>
using namespace std; 
int main(){
	int cout;
	cin>>cout;
	cout<<cout;
}

```

A.没有任何输出

B.编译错误

C.运行错误

D.2

------

Standard Answer: A



Question 17 - 单选题

判断：引用就是某一变量（目标）的一个别名，对引用的操作与对变量直接操作完全一样。

A.正确

B.错误

------

Standard Answer: A



# 第二周

- Question 4 - 单选题当输入内容是“ Hello World! ”时（注意开头和结尾处各有一个空格），下列语句的输出结果是？

```C++
int main() {
	string str1, str2;
	cin >> str1 >> str2;
	cout << str1 << str2;
	return 0;
}
```

A.`HelloWorld!`

B.` Hello`（开头处有一空格）

C.`Hello `（结尾处有一空格）

D.`Hello World`

------

Standard Answer: A

无论输入多少个空格如“                     hello        world        ”都会输出helloworld



- Question 5 - 单选题

	# 问题

	当输入内容是“ Hello World! ”时（注意开头和结尾处各有一个空格），下列语句的输出结果是？

	```C++
	int main(){
		string str;
		getline(cin, str);
		cout << str;
		return 0;
	}
	```
	
	A.`HelloWorld!`

	B.`Hello World! `（注意结尾处有一空格）

	C.` Hello World!`（注意开头处有一空格）

	D.` Hello World! `（注意开头和结尾处各有一个空格）

	------

	Standard Answer: D

- Question 6 - 单选题

	# 问题

	下列选项的操作符中，不属于string对象的比较运算符的是？

	A.!=

	B.<=

	C.=

	D.<=>

	------

	Standard Answer: C

	注意审题：比较运算符，C是赋值运算符

	在C++中，`<=>` 是一个称为“三向比较运算符”（也称为“spaceship operator”）的C++20引入的新特性。这个运算符用于返回一个整数，该整数表示两个操作数之间的相对顺序。

	具体来说，对于`a <=> b`：

	* 如果 `a` 小于 `b`，则返回负整数。
	* 如果 `a` 等于 `b`，则返回零。
	* 如果 `a` 大于 `b`，则返回正整数。

	对于`std::string`，`<=>`运算符允许你以一种简洁且类型安全的方式比较两个字符串。

	例如，如果你有两个`std::string`对象`str1`和`str2`，你可以这样使用`<=>`：


~~~C++
```cpp
#include <string>
#include <iostream>

int main() {
    std::string str1 = "apple";
    std::string str2 = "banana";

    auto result = str1 <=> str2;

    if (result < 0) {
        std::cout << "str1 is less than str2\n";
    } else if (result == 0) {
        std::cout << "str1 is equal to str2\n";
    } else {
        std::cout << "str1 is greater than str2\n";
    }

    return 0;
}
```
~~~

- Question 8 - 单选题

	# 问题

	现有如下三个string对象：

	```C++
	string s1 = "Hello", s2 = ", ", s3 = "C++!";
	
	```

	则下列哪个选项的语句中string对象的初始化会出错？

	A.`string s4 = s1 + ", " + s3; `

	B.`string s5 = s1 + ", " + "C++!"; `

	C.`string s6 = "Hello" + s2 + "C++!"; `

	D.`string s7 = "Hello" + ", " + s3; `

	------

	Standard Answer: D

	解释：没有定义两个字符串数组的加法，而前面三个选项都有一个字符串跟在运算符的两边，所以可以运算

- Question 10 - 单选题

	# 问题

	下列语句的执行结果是？

	```C++
	int main()
	{
		string str = "sysu-computer";
		int pos1 = str.find('u');
		int pos2 = str.find('u', 10);
		int pos3 = str.rfind('u');
		cout << pos1 << " " << pos2 << " " << pos3;
		return 0;
	}
	
	```

	A.3 9 9

	B.3 -1 9

	C.3 -1 -4

	D.3 -1 3

	------

	Standard Answer: B

	解释：这个题容易错误的地方在于，无论从左边还是从右边——都是返回他的下标

- `for(auto &c : str)`注意使用你用和不用引用的区别。如果不用引用的话是复制一个拷贝出来，不会改变原来的对象。如果是用引用的话，可以直接修改原来的对象。

- Question 12 - 单选题

	# 问题

	现有一个长度大于等于 4 的string对象`str`，需要判断`str`是否以“Sysu”开头（即，前 4 个字符所构成的子串内容是否为“Sysu”）。

	下列选项中的表达式，单独作为判断条件，无法实现上述功能的是？

	A.str.find("Sysu") == 0

	B.str >= "Sysu"

	C.str.substr(0, 4) == "Sysu"

	D.str.compare(0, 4, "Sysu") == 0

	------

	Standard Answer: B

	解释：想要得到答案非常容易。但是想强调的是C选项里面，它是左闭右开区间。

- Question 14 - 单选题

	# 问题

	下列两段程序的运行情况为：
	程序一：

	```C++
	void func1(const int n){
		array <bool, n> arr;
		arr[0] = true;
	}
	int main()
	{
		func1(2);
		return 0;
	}
	```

	程序二：

	```c++
	void func2(){
		const int n = 2;
		array <bool, n> arr;
		arr[0] = true;
	}
	int main()
	{
		func2();
		return 0;
	}
	```

	A.程序一和程序二均可正常运行

	B.程序一和程序二均不可正常运行

	C.程序一可正常运行，程序二不可正常运行

	D.程序一不可正常运行，程序二可正常运行

	------

	Standard Answer: D

	解释：程序一不可以运行的原因是——他要到运行时传参的时候才可以确定尖括号里面的值。但是程序二，它在编译的时候就可以确定尖括号里面的值是常量。

- Question 18 - 单选题

	# 问题

	关于下列语句，说法正确的是：

	```C++
	const int func1(int arg){
	    return 2 * arg;
	}
	constexpr int func2(int arg){
	    return 2 * arg;
	}
	int main()
	{
	    array<int, func1(10)> a;
	    array<int, func2(10)> b;
	    return 0;
	}
	
	```

	A.a, b 均能完成初始化

	B.a 能完成初始化， b 不能完成初始化

	C.a 不能完成初始化， b 能完成初始化

	D.a, b 均不能完成初始化

	------

	Standard Answer: C

	解释：同理

- 在 C++11 标准中，建议按照以下方式将 const 和 constexpr 的功能区分开：

	* 凡是表达“只读”语义的场景都使用 const
	* 凡是表达“常量”语义的场景都使用 constexpr

- Question 16 - 单选题

  # 问题

  下列语句的运行结果为：

  ```C++
  int main(void) {
      int a = 1;
      const int & const_b = a;
      cout << const_b << endl;
      a = 2;
      cout << const_b << endl;
      return 0;
  }
  ```

  A.1
  1

  B.1
  2

  C.2
  1

  D.2
  2

  ------

  Standard Answer: B

  解释：他只是不能通过const_b来改变a

  但是注意：<img src="C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240618232307666.png" alt="image-20240618232307666" style="zoom:50%;" />是绝对不可以反过来的

  变式：

  ```C++
  int main() {
  	double a = 3.14;
      const double & b = a;
      const int & c = a;
      
      cout << a << b << c << endl;
      // output:3.14, 3.14, 3
      
      a *= 2;
      
      cout << a << b << c << endl;
      // output:6.28, 6.28, 3
  }
  ```

  为什么c不会跟着变呢，因为`const int & c`必须要指向一个`int`的变量，所以在第4行的时候，创建了一个临时变量，然后c指向这个临时变量



- Question 17 - 单选题

  # 问题

  关于下列语句（1）和语句（2），说法正确的是：

  （1）const int a = 3 + 6;
  （2）constexpr int a = 3 + 6;

  A.（1）和（2）均合法

  B.（1）和（2）均不合法

  C.（1）合法，（2）不合法

  D.（1）不合法，（2）合法

  ------

  Standard Answer: A

  在C++中，`const` 和 `constexpr` 都用于声明常量，但它们之间有一些关键的区别。

  1. **编译时和运行时**：


		* 使用 `const` 声明的常量在运行时具有确定的值。这意味着这个值在编译时可能不知道，但在程序执行时它必须有一个确定的值。
		* 使用 `constexpr` 声明的常量在编译时就有确定的值。编译器在编译阶段就会计算其值，并将其嵌入到生成的代码中。因此，`constexpr` 常量可以用于那些需要常量表达式的地方，比如数组的大小、模板参数等。
	2. **初始化**：


		* `const` 常量可以使用任何在编译时或运行时能够确定的表达式进行初始化。
		* `constexpr` 常量必须使用常量表达式进行初始化，这通常意味着它只能包含编译时常量、文字值以及只调用其他 `constexpr` 函数的函数调用。
	3. **函数和类构造函数**：


		* 除了变量，你还可以将 `constexpr` 应用于函数或类的构造函数。这表示这些函数或构造函数在编译时就能计算出结果。
		* `const` 不能这样使用。
	4. **内存位置**：


		* `const` 和 `constexpr` 在内存中的位置没有固定的区别。它们都可能存储在只读数据段中，但这不是由 `const` 或 `constexpr` 关键字直接决定的，而是由它们的使用方式和上下文决定的。
	
	对于你给出的两个例子：
	
	（1）`const int a = 3 + 6;`
	这里，`a` 是一个常量，它的值在运行时是确定的（尽管在这种情况下，编译器可能在编译时就能计算出它的值）。
	
	（2）`constexpr int a = 3 + 6;`
	这里，`a` 是一个编译时常量。它的值在编译时就被确定为9，并且这个值会被嵌入到生成的代码中。由于它是一个编译时常量，它可以用于那些需要常量表达式的地方。
	
	注意：虽然在这个例子中，`const` 和 `constexpr` 的效果看起来是一样的，但在更复杂的场景中，它们之间的区别可能会更加明显。

- Question 19 - 单选题

	# 问题

	下列关于 auto 关键字的说法，错误的是：

	A.使用 auto 声明的变量必须初始化

	B.函数和模板参数不能被声明为 auto

	C.auto 不能用于类型转换或其他一些操作，如 sizeof 和 typeid 操作

	D.定义在一个 auto 序列的变量不必始终推导成同一类型

	------

	Standard Answer: D

	解释：auto的一些知识点，通过这个题来熟悉







# 第三周

- 类内定义的函数一定是内联的

- 判断：sizeof(引用)是指所指向变量的大小；sizeof(指针)结果为对象地址的大小

	A.正确

	B.错误

	------

	Standard Answer: A

	解释：在C++中，`sizeof` 是一个操作符，用于获取对象或类型在内存中所占用的字节大小。但是，当 `sizeof` 应用于引用（reference）时，情况有些特殊。

	引用本身并不是一个对象，它只是一个别名，或者说是一个已存在对象的另一个名字。因此，你不能直接取一个引用的 `sizeof`，因为引用本身并不占用额外的内存空间（除了在编译时用于一些内部处理，但这与 `sizeof` 无关）。

	当你写 `sizeof(引用)` 时，你实际上是在获取该引用所指向的对象类型的大小。



# 第四周

## PPT

- 默认参数只能在普通参数的右边

- 析构函数不能直接调用

- 友元函数没有this指针

- static成员没有this指针

- 只有动态成员才有this指针

- this指针是所有成员函数的隐含参数

- static成员函数不接收this指针做参数

- 当成员参数与成员数据重名时，必须用this访问成员数据

- 在C++中，`static` 成员（无论是数据成员还是成员函数）都是<u>与类本身关联的</u>，<u>而不是与类的任何特定实例（对象）关联的</u>。因此，它们不需要通过类的实例（即对象）来访问，而是可以<u>直接通过类名来访问</u>。

	当你尝试在 `static` 成员函数中使用 `this` 指针时，编译器会报错，因为 `this` 指针是指向调用该函数的对象的指针，而 `static` 成员函数并不与任何特定对象关联。

	以下是一些关于 `static` 成员的基本点：

	1. **静态数据成员**：


		* 静态数据成员在类的所有实例之间共享。
		* 静态数据成员需要在类定义之外进行有且只有一次的初始化。注意格式为 Typename ClassName::VarName = 0;(不要再加static)
		* 可以通过类名或对象名来访问静态数据成员，但推荐使用类名。ClassName::VarName = 1;
		* 具有全局生存期，所有对象共享的储存空间
	2. **静态成员函数**：


		* 静态成员函数只能访问静态数据成员、其他静态成员函数和全局变量。
		* 静态成员函数没有 `this` 指针。
		* 静态成员函数不能访问非静态数据成员或调用非静态成员函数（没有this指针做参数）（除非它们通过对象名或指针/引用显式传递）。
	
	示例：


	```cpp
	class MyClass {
	public:
	    static int staticVar; // 静态数据成员
	
	    static void staticFunc() {
	        // this->staticVar; 	 // 错误：静态成员函数不能使用this指针
	        MyClass::staticVar = 42; // 正确：使用类名访问静态数据成员
	    }
	
	    void nonStaticFunc() {
	        MyClass::staticVar = 10; // 正确：也可以在非静态成员函数中通过类名访问静态数据成员
	        this->nonStaticVar = 20; // 正确：非静态成员函数可以使用this指针访问非静态数据成员
	    }
	
	    int nonStaticVar; // 非静态数据成员
	};
	
	int MyClass::staticVar = 0; // 静态数据成员的初始化（不能再加static，否则报错）
	
	int main() {
	    MyClass obj;
	    MyClass::staticFunc(); // 调用静态成员函数
	    std::cout << MyClass::staticVar << std::endl; // 输出：42
	    return 0;
	}
	```
	在这个示例中，`staticVar` 是一个静态数据成员，而 `staticFunc` 是一个静态成员函数。`staticFunc` 使用类名 `MyClass` 来访问和修改 `staticVar`，而不是使用 `this` 指针。同样，你也可以通过对象名（如 `obj.staticVar`）来访问静态数据成员，但这通常不是推荐的做法，因为它可能会导致混淆。

- `mutable` 关键字用于修饰类的非静态成员变量，<u>表示即使该类的对象是 `const` 的，这个成员变量也可以被修改。</u>这在某些特定的场景下是有用的，比如当你需要在 `const` 成员函数内部修改某个成员变量的值，但又不希望改变对象本身的逻辑状态时。

	==好好学这个，可以偷鸡！==

	以下是一个简单的C++示例，展示了 `mutable` 的用法：


	```cpp
	class MyClass {
	public:
	    int value;
	    mutable int mutableValue;
	
	    MyClass(int v, int mv) : value(v), mutableValue(mv) {}
	
	    // 一个const成员函数，可以修改mutableValue但不能修改value
	    void printAndIncrementMutable() const {
	        std::cout << "Before increment: " << mutableValue << std::endl;
	        mutableValue++; // 这是允许的，因为mutableValue是可变的
	        std::cout << "After increment: " << mutableValue << std::endl;
	
	        // value++; // 这是不允许的，因为value不是mutable的，且我们在一个const成员函数中
	    }
	};
	
	int main() {
	    const MyClass obj(10, 20);
	    obj.printAndIncrementMutable(); // 输出: Before increment: 20, After increment: 21
	    // obj.value = 30; // 这是不允许的，因为obj是const的
	    obj.mutableValue = 1; // it's ok！
	    return 0;
	}
	```
	在上面的示例中，尽管 `obj` 是一个 `const` 对象，我们仍然可以在 `printAndIncrementMutable` 函数中修改 `mutableValue` 的值，因为 `mutableValue` 被声明为 `mutable`。但是，尝试修改 `value` 的值会导致编译错误，因为 `value` 不是 `mutable` 的，且我们在一个 `const` 成员函数中。

- Question 6 - 单选题

	关于构造函数和析构函数的区别，表述正确是

	A.它们具有不相同的函数名

	B.构造函数不会返回类型，而析构函数会

	C.构造函数允许传入函数参数，而析构函数不能

	D.构造函数不允许传入函数参数，而析构函数能

	------

	Standard Answer: C

	解释：A: 根据网上，是同名的

- Question 7 - 单选题

	下列哪个选项是程序的输出：

	```cpp
	#include<iostream>
	
	using namespace std;
	
	class Foo {
	public:
	    int x;
	    int y;
	    Foo() {
	        x = 1;
	        y = 1;
	    }
	    Foo(int x_ = 10, int y_ = 10) {
	        x = x_;
	        y = y_;
	    }
	
	    void p() {
	        int x = 20;  // local variable
	        cout << "x is " << x << " ";
	        cout << "y is " << y << endl;
	    }
	};
	int main() {
	    Foo foo;  //"message": "类 \"Foo\" 包含多个默认构造函数",
	    cout << x << " " << y << endl; // x was not declare in this scope
	    return 0;
	}
	```

	A.1 1

	B.10 10

	C.编译错误

	D.无法预期的值

	------

	Standard Answer: C

- Question 10 - 单选题

	下列c++代码的输出是什么

	```C++
	#include <iostream>  
	using namespace std;
	class A{
		A(){
			cout<<"Constructor called";
		}
	};
	int main(int argc, char const *argv[]){
		A a;
		return 0;
	}
	```

	A.Constructor called

	B.程序没有输出

	C.编译错误

	D.Segmentation fault

	------

	Standard Answer: C

	解释：一定要小心，默认是private

- Question 20 - 单选题

	下列c++代码的输出是什么

	```C++
	#include<iostream>
	using namespace std;
	 
	class Test{
	private:
	  int x;
	  int y;
	public:
	  Test(int x = 0, int y = 0) { this->x = x; this->y = y; }
	  static void fun1() { cout << "Inside fun1()"; }
	  static void fun2() { cout << "Inside fun2()"; this->fun1(); }
	};
	 
	int main(){
	  Test obj;
	  obj.fun2();
	  return 0;
	}
	```

	A.Inside fun2() Inside fun1()

	B.Inside fun2()

	C.Inside fun1() Inside fun2()

	D.编译错误

	------

	Standard Answer: D

	解释：小心！！static成员函数没有this指针





# 第五周

- Question 2 - 单选题

	下列说法正确的是

	```c++
	#include <iostream>
	
	#include "Circle.h"
	using namespace std;
	int main()
	{
	cout << Circle(5).getArea() << endl;
	cout << (new Circle(5))->getArea() << endl;
	
	return 0;
	}
	```

	A.Circle(5).getArea() 编译出错

	B.new Circle(5).getArea() 编译出错

	C.该程序能够编译通过，但不能运行

	D.该程序能够通过编译，也能够运行，但 new Circle(5) 在堆上创建了匿名对象，这将导致内存泄漏。

	------

	Standard Answer: D

- Question 4 - 单选题

	删除空指针会发生什么？

	A.不会报错

	B.不会报错，但必须提前将空指针指定一个类型(例如`int * p = nullptr;` `delete p;`)

	C.编译错误

	D.运行时错误

	------

	Standard Answer: B

- Question 7 - 单选题

	```c++
	int* t = new int(5);
	int* p = t;
	delete t;
	delete p;
	cout << *p << endl;
	
	```

	该段代码的输出是

	A.不确定的脏值

	B.0

	C.5

	D.出现运行时错误

	------

	Standard Answer: D

	解释：上一题是空指针nullptr，但是这里是有所指但是无法访达的指针，所以runtime error

- Question 6 - 单选题

	```c++
	class A
	{
	public:
		int x;
		A() :x(0) { cout << "A::A() x=" <<x<<endl; }
		~A() { cout << "A::~A() x=" << x << endl; }
	};
	
	int main()
	{
		A* p = new A[3];
		for (int i = 0; i < 3; i++)
		{
			p[i].x = i;
		}
		delete []p;
		return 0;
	}
	```

	运行结果为？

	A.`A::A() x=0 `

	 `A::A() x=0`

	 ` A::A() x=0` 

	 ` A::~A() x=2` 

	 ` A::~A() x=1` 

	 ` A::~A() x=0 `

	---

	就考了一件事情：析构顺序与构造顺序相反

- Question 20 - 单选题

	```cpp
	A* arr[4]={new A(0),NULL,new A(0)};
	```

	该语句生成了几个A对象

	A.1

	B.2

	C.3

	D.4

	------

	Standard Answer: B

	解释：上一题直接new了3个，这里只new了两个

- Question 8 - 单选题

	以下程序段的执行结果是

	```c++
	class A{
		int x;
	public:
		A() :x(0) { cout << "A::A()" << endl; }
		~A() { cout << "A::~A()" << endl; }
	};
	
	int main(){
		A* p = new A[10];
		p += 1;
		delete []p;
		return 0;
	}
	```

	A.编译不通过

	B.打印10个A::A(), 10个A::~A()

	C.打印10个A::A(), 9个A::~A()

	D.打印10个A::A()，运行异常终止

	------

	Standard Answer: D

	解释：因为 `p` 不再指向数组的起始地址，所以这里的行为是未定义的（Undefined Behavior, UB）。在大多数实现中，这会导致运行时异常终止，因为 `delete []` 操作符期望一个指向数组第一个元素的指针，以便正确地释放整个数组的内存并调用每个对象的析构函数。

- Question 13 - 不定项选择题

	在下列有关类、抽象、封装和数据隐藏的说法中，正确的有？

	A.类表示可以通过类方法的公共接口对类对象执行的操作；这是抽象。

	B.类隐藏了实现的细节，例如数据表示和方法代码；这就是封装。

	C.类可以对数据成员使用私有可见性，这意味着只能通过成员函数访问数据；这是数据隐藏。

	D.使用类是C++中可以轻松实现面向对象功能抽象、数据隐藏和封装的方式。

	------

	Standard Answer: C, A, B, D



# 第六周

- Question 1 - 单选题

	**静态联编(static binding)**是指在运行阶段就能确定调用的动态对象的方法的技术。

	A.正确

	B.错误

	------

	Standard Answer: B

	解释：也称为早期联编或编译时联编，是在编译阶段就确定了方法调用与其实现的对应关系。这通常发生在非虚方法（非多态方法）的调用中。

	在静态联编中，编译器在编译时会根据调用方法的对象的类型来确定要调用的方法。由于这种确定是在编译时进行的，因此它不会受到运行时对象实际类型的影响。

- 注意区别

	- ```C++
		//已经重写拷贝构造函数
		Test t1;
		Test t2 = t1;// 调用拷贝构造函数
		t2 = t1;	 // 只是调用=
		```

- Question 3 - 单选题

	```cpp
	A func()
	{
		A tmp(1);
		return tmp;
	}
	int main()
	{
		A a = func(); 
	        A aa(a);
		return 0; 
	}
	
	```

	A是一个具有拷贝构造函数的类，如果**考虑**编译优化，该段程序调用了几次拷贝构造函数。

	A.0

	B.1

	C.2

	D.3

	------

	Standard Answer: B

	解释：

	1. `func()` 返回 `tmp` 时，编译器可能会应用命名返回值优化（NRVO），直接在返回值的位置构造 `tmp`，避免拷贝构造函数的调用。
	2. 在 `A a = func();` 这行代码中，如果应用了（NRVO），则不会调用拷贝构造函数。
	3. `A aa(a);` 这行代码会调用拷贝构造函数来初始化 `aa`。

	因此，在考虑编译器优化的情况下，这段程序最少可能调用拷贝构造函数**1次**。这是因为编译器优化可以消除`func()`返回时的拷贝构造函数调用，但`A aa(a);`这行代码中的拷贝构造函数调用无法被优化掉。

- Question 4 - 单选题

	```cpp
	A func1(A a)
	{
		return a;
	}
	
	
	A& func2(A& a)
	{
		return a;
	}
	
	
	
	int main()
	{
		A a(1); 
		func1(a); 
	    func2(a);
		return 0; 
	}
	```

	A是一个具有拷贝构造函数的类，如果**不考虑**编译优化，该段程序调用了几次拷贝构造函数，几次析构函数。

	---

	2， 3     0,   1

	解释：注意，不考虑编译优化，返回的时候会先拷贝到一个新的临时对象上

- Question 8 - 单选题

	```cpp
	double a = 3.14;
	const int & b = a;
	a = 6.28;
	cout<<a<<","<<b<<endl;
	
	```

	这段代码的输出是？

	A.6.28, 6

	B.6.28, 3

	C.6.28, 6.28

	D.6.28, 3.14

	------

	Standard Answer: B

	解释：由于`const int & b`必须要指向一个`int`的变量，所以第二行的时候会生成一个整型临时变量来给b指，所以a改变的时候，b不变

- Question 9 - 单选题

	```
	void func(string& s)
	{
	    cout << s;
	}
	
	int main()
	{
	    func("123");
	    return 0;
	}
	
	```

	该段代码的输出是

	A.编译不通过

	B.123

	------

	Standard Answer: A

	解释：这段代码不能编译通过。原因在于`func`函数期望的参数是一个`string&`（非const引用），而在`main`函数中调用`func("123");`时，传递的是一个字符串字面量。字符串字面量是一个常量字符数组，它可以被隐式转换为`const string`，但不能直接绑定到非const引用上。下面的代码同理

	```cpp
	void func(int& x){
	    cout<<x<<endl;
	}
	
	int main(){
	    int i = 1;
	    func(i * 3);
	    return 0;
	}
	```

- <img src="C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240629153919970.png" alt="image-20240629153919970" style="zoom:50%;" />

- 那反过来是不是就对了呢？

- <img src="C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240629153838861.png" alt="image-20240629153838861" style="zoom:50%;" />

- Question 14 - 不定项选择题

	关于const引用，以下说法正确的是

	A.const引用是一个比较万能的类型，可以初始化为左值，右值，类型转换的左值对象。

	B.把const引用作为函数参数，可以防止程序错误修改不该修改的实参。

	C.非const的引用可以初始化为右值

	D.把const引用作为函数参数，可以提高程序的运行效率

	------

	Standard Answer: D, B, A



# 第八周

Question 1 - 不定项选择题

若定义正常对象的形式为`A a(parameter);`,那么定义常对象的形式为

A.A const a(parameter);

B.A a(parameter);

C.A a(parameter) const;

D.const A a(parameter);

------

Standard Answer: A, D

解析：注意！！AD等价



Question 2 - 不定项选择题

如果在一个类中声明以下4个重载函数，有哪两个是互相冲突的？

```C++
Point fun1();  // 1
const Point fun1();  // 2
Point fun1() const;  // 3
const Point fun1() const;  // 4
```

A.1、2

B.1、3

C.2、3

D.3、4

------

Standard Answer: A, D

解析：

前面那个`const`只是表示返回值类型
括号里的`const`表示`this指针`的类型，限定`this指针`的修改权限
分号前的`const`表示所有成员的修改权限

函数签名：名称，参数类型，不考虑返回值，也即是前面的`const`不影响重载，后面反之



# 第九周

- 下面关于继承说法不正确的是:

A.继承可以使用现有类的所有功能，并在无需重新编写原来类的情况下对这些功能进行扩展。

B.继承体系中派生类应体现出与基类的不同。

C.派生类对象一定比基类对象大。

D.继承呈现了面向对象程序设计的层次结构，体现了由简单到复杂的认知过程。

---

Standard Answer: C

解析：如果派生类没有新的成员变量，而且没有因为内存对齐而改变存储填充，派生类大小和基类相同；但是，如果派生类添加了新的成员变量或因为内存对齐而增加了额外的填充，那么派生类对象的大小就会比基类对象大。



- 派生类析构函数的作用是什么？

A.释放派生类新增的资源

B.释放基类的资源

C.释放派生类和基类的所有资源

D.不需要做任何操作

------

Standard Answer: A

解析：派生类的构造函数和析构函数并不是释放派生类和基类的所有资源

本质上都只是`构造/销毁 派生的变量 + 调用基类的构造/析构函数`

- Question 8 - 单选题

	在派生类析构函数中，可以如何调用基类的析构函数？

	A.直接调用基类的析构函数

	B.使用基类的析构函数的名称作为成员初始化列表的一部分调用

	C.不需要调用，基类的析构函数会自动被调用

	D.只能调用公有基类的析构函数

	------

	Standard Answer: C

- 如果派生类没有定义构造函数和析构函数，会发生什么？

A.编译错误

B.调用基类的默认构造函数和析构函数

C.调用派生类的默认构造函数和析构函数

D.不做任何操作

------

Standard Answer: C

解析：调用默认构造/析构函数然后在这些默认函数里调用基类的函数



# 第十周

- 在C++中，重载（overloading）、覆盖（overriding）和隐藏（hiding）是三种不同的函数处理方式。它们在继承和多态性方面有着各自不同的作用和行为。以下是对这三者的详细解释和区别：

  ### 重载（Overloading）
  重载指的是在同一个作用域中，定义多个具有相同名字但参数列表不同的函数。这些函数可以是普通函数，也可以是类成员函数。

  示例：

  ```cpp
  class Example {
  public:
      void func(int x) {
          // 实现1
      }
  
      void func(double y) {
          // 实现2
      }
  
      void func(int x, double y) {
          // 实现3
      }
  };
  ```

  在这个例子中，`func`函数被重载了三次，每次都有不同的参数列表。编译器通过参数列表来区分这些函数。

  ### 覆盖（Overriding）
  覆盖指的是在派生类中重新定义基类中已存在的虚函数。覆盖函数必须具有与基类中被覆盖函数相同的函数签名（参数列表和返回类型）。覆盖通常用于实现多态性。

  示例：

  ```cpp
  class Base {
  public:
      virtual void show() {
          // 基类实现
      }
  };
  
  class Derived : public Base {
  public:
      void show() override {
          // 派生类实现
      }
  };
  ```

  在这个例子中，`Derived`类中的`show`函数覆盖了`Base`类中的`show`函数。使用`override`关键字可以显式地表示该函数是覆盖基类中的虚函数。

  ### 隐藏（Hiding）
  隐藏指的是在派生类中定义一个与基类中同名的函数，这个函数可能具有不同的参数列表。此时，基类中所有同名的函数都会被隐藏，而不是被重载。

  示例：

  ```cpp
  class Base {
  public:
      void func(int x) {
          // 基类实现
      }
  };
  
  class Derived : public Base {
  public:
      void func(double y) {
          // 派生类实现
      }
  };
  ```

  在这个例子中，`Derived`类中的`func`函数隐藏了`Base`类中的`func`函数。在派生类的对象上调用`func`时，只有`Derived`类中的`func`函数是可见的。要调用基类的函数，可以使用作用域解析运算符。

  ### 区别总结
  1. **重载**：在同一个作用域中，定义多个具有相同名字但参数列表不同的函数。
  2. **覆盖**：在派生类中重新定义基类中的虚函数，必须具有相同的函数签名。
  3. **隐藏**：在派生类中定义一个与基类同名但参数列表不同的函数，这会隐藏基类中的所有同名函数。

  理解这些概念对于正确使用C++中的继承和多态性非常重要。

- 关于虚继承

  - C++在设计虚继承机制时，会提供一个虚表（vtable）和一个虚指针（vptr）。虚指针指向虚表，虚表用于存放虚基类（祖父类）成员的地址。通过虚指针和虚表，可以在使用公共基类时快速找到正确的成员。
  - 菱形（钻石）继承的时候，编译器会默认调用父类的默认构造函数（记得提供），左右的类，不再调用父类的构造函数。

  - 在类中，如果要使用父类的同名函数，要用域运算符: :

  ```C++
  Human& Human::operator=(const Human& other) {
      Creature::operator=(other);
      // 基类的指针可以指向继承类——开头的结构是相同的
      delete [] languages;
      languages = new char[strlen(other.languages) + 1];
      strcpy(languages, other.languages);
      return *this;
  }
  ```

- virtual的范围只有上下两个

- 恢复访问方式

  - ```C++
  	using  Base::data;
  	```

  - 注意是，恢复为原来的访问方式，不受继承的时候的protected和private影响‘

- 在派生类中显式调用基类构造函数的时候，如果有拷贝构造，可以直接把派生类对象作为参数，如下

	- ```C++
		Derived(const Derived & other) : Base(other), z(other.z) {}
		```

	- 在C++中，当你在派生类的构造函数中显式调用基类的构造函数时，使用`Derived`类的引用`other`作为参数是合法的，原因如下：

		1. **向上转型（Upcasting）**：在C++中，派生类的对象可以被隐式地转换（向上转型）为基类的引用或指针。这意味着，当你将派生类的引用或指针传递给需要基类引用或指针的函数或构造函数时，转换是自动进行的。这种转换是安全的，因为派生类对象包含了基类的部分。
		2. **基类部分的初始化**：在派生类构造函数中显式调用基类构造函数是初始化派生类对象中基类部分的标准方式。通过将`Derived`类的引用`other`传递给基类的拷贝构造函数，你实际上是在告诉编译器：“请使用`other`对象中的基类部分来初始化当前对象的基类部分。”这样做是必要的，因为基类可能有自己的成员变量需要根据`other`对象的状态来初始化。
		3. **保持对象状态的一致性**：通过这种方式，你可以确保派生类对象的基类部分是通过基类的拷贝构造函数正确初始化的，这有助于保持对象状态的一致性，特别是当基类有自己的资源管理逻辑（如动态分配的内存）时




# 第十一周

- Question 1 - 单选题

	什么是多重继承？

	A.从派生类派生出基类

	B.从基类派生出派生类

	C.从多个基类派生出派生类

	D.派生出一个派生基类

	------

	Standard Answer: C

- 下面代码输出什么

	```C++
	#include <iostream>
	using namespace std;
	
	class Base {
	public:
	    virtual void print() const = 0;
	};
	
	class DerivedOne : public Base {
	public:
	    void print() const {
	        cout << "DerivedOne\n";
	    }
	};
	
	class DerivedTwo : public Base {
	public:
	    void print() const {
	        cout << "DerivedTwo\n";
	    }
	};
	
	class Multiple : public DerivedOne, public DerivedTwo {
	public:
	    void print() const {
	        DerivedTwo ::print();
	    }
	};
	
	int main() {
	    int i;
	    Multiple both;
	    DerivedOne one;
	    DerivedTwo two;
	    Base *array[3];
	    array[0] = &both; // error: 由于没有虚继承，基类的指向不明确
	    array[1] = &one;
	    array[2] = &two;
	    array[i]->print();
	    return 0;
	}
	```

- Question 9 - 单选题

  从基类继承了哪些内容？

  A.构造函数及其析构函数

  B.Operator=() 成员

  C.友元

  D.以上所有均不是

  ------

  Standard Answer: D

  在C++中，派生类从基类继承时，有几种成员和特性是不会被继承的：

  1. **构造函数**：基类的构造函数不会被派生类继承。派生类需要定义自己的构造函数。如果需要，派生类的构造函数可以显式地调用基类的构造函数。

  2. **析构函数**：基类的析构函数不会被派生类继承。派生类需要定义自己的析构函数。析构函数总是按照派生类到基类的顺序被调用。

  3. **拷贝构造函数和拷贝赋值运算符**：这些用于控制对象如何被复制的特殊成员函数不会被自动继承。派生类需要定义自己的拷贝构造函数和拷贝赋值运算符，如果需要的话，它们可以在其实现中调用基类的对应成员。

  4. **友元函数**：友元函数是指定的外部函数，它可以访问类的所有私有和保护成员。友元关系不是继承的。如果派生类需要某个函数作为友元，需要在派生类中显式声明。

  5. **私有成员**：基类的私有成员虽然被派生类继承，但是派生类不能直接访问它们。如果派生类需要访问基类的私有成员，可以通过基类提供的公共或保护的成员函数来实现。

  6. **默认参数的使用规则**：虽然派生类会继承基类的成员函数，但是成员函数的默认参数是静态绑定的，而不是动态绑定的。这意味着，如果通过基类的指针或引用调用一个继承自基类的函数，使用的默认参数值是基类中定义的值，而不是派生类中可能重新定义的值。

  这些限制确保了对象的构造和析构、复制行为可以被适当地控制，并且保护了类的封装性，同时也避免了潜在的多态性相关的问题。

  

- Question 10 - 不定项选择题

	c++的类型兼容规则所指的替代包括以下情况:

	A.父类指针可以直接指向子类对象

	B.子类对象可以直接赋值给父类对象

	C.子类对象可以直接初始化父类对象

	D.将父类对象直接赋值给子类对象

	------

	Standard Answer: A, B, C

- Question 11 - 单选题

	在C++中，什么是虚拟继承？

	A.C++ 中增强多重继承的技术

	B.C++ 中确保基类的私有成员可以以某种方式被访问的技术

	C.C++ 中避免类的多重继承的技术

	D.C++ 中避免基类在子类/派生类中出现多个副本的技术

	------

	Standard Answer: D

- Question 16 - 单选题

	下面叙述不正确的是

	A.在单一继承中，基类的构造函数不可被派生类直接继承或调用

	B.对基类成员的访问必须是无二义性的

	C.赋值兼容规则也适用于多重继承的组合

	D.基类的公有成员在派生类中仍然是公有的

	------

	Standard Answer: D

- Question 20 - 不定项选择题

	哪种访问修饰符的成员会被继承？

	A.Public

	B.Protected

	C.Private

	D.以上都不会

	------

	Standard Answer: A, B，C

	其实都能被继承的，只是访问权限上有不同





## 程序题出现的问题

```C++
/*
    private:
        char* sound;
        int age;
 */

//-----------------------------------------------------

/Creature::Creature(const char* _sound, int _age) : sound(_sound), age(_age) {} // error: invalid conversion from 'const char*' to 'char*' [-fpermissive]

Creature::Creature(const char* _sound, int _age) : age(_age) {
    sound = new char[strlen(_sound) + 1];
    strcpy(sound, _sound);
}	//correct

//-----------------------------------------------------

Human& Human::operator=(const Human& other) {
    if (this != &other) {
        // this->Creature = other; // error: invalid use of 'Creature::Creature'
        this->Creature::operator=(other); // 正确地调用基类的赋值运算符
        delete[] languages;
        languages = new char[strlen(other.languages) + 1];
        strcpy(languages, other.languages);
    }
    return *this;
}
```



# 第十二周

- Question 1 - 单选题

	在C++中，多态意味着什么？

	A.只具有单一形态的类

	B.编译时决定行为的类

	C.允许对象表现出多种行为形态的特性

	D.仅具备静态行为的类

	------

	Standard Answer: C

	概念题

- 第三题

```C++
class Object {
private:
    int value;

public:
    Object(int x = 0) : value(x) {}
    void print() {
        cout << "Object::print" << endl;
        add(1);
    }
    virtual void add(int x) {
        cout << "Object::add" << x << endl;
    }
};

class Base : public Object {
private:
    int num;

public:
    Base(int x = 0) : Object(x + 10), num(x) {}
    void show() {
        cout << "Base::show" << endl;
        print();
    }
    virtual void add(int x) {
        cout << "Base::add:" << endl;
    }
};
int main() {
    Base base;
    base.show();
    return 0;
}
```

在C++中，**<u>构造函数和析构函数中调用虚函数不会发生多态</u>**的原因是为了保证对象状态的安全和一致性。具体来说，有以下几个原因：

1. **构造函数中的虚函数调用**：当构造函数被执行时，对象的派生类部分尚未被初始化。如果此时调用虚函数，并且该虚函数被派生类覆盖，那么该虚函数可能会操作派生类的成员变量，但这些成员变量此时还没有被初始化，这可能会导致不可预知的行为或错误。因此，在构造函数中，虚函数调用不会被动态绑定到派生类的实现。

2. **析构函数中的虚函数调用**：当析构函数被执行时，派生类的部分已经被销毁，对象被“降级”为其基类的状态。如果此时调用虚函数，并且该虚函数在派生类中有覆盖实现，那么调用派生类的实现就可能操作已经被销毁的成员变量，同样会导致不可预知的行为或错误。因此，在析构函数中，虚函数调用也不会被动态绑定到派生类的实现。

这种设计是为了确保在构造和析构过程中对象的完整性和一致性，避免在对象构造未完成或析构已开始时调用派生类的方法，这些方法可能会错误地操作尚未初始化或已经销毁的成员变量。



- 第五题

```C++
class Object {
public:
    virtual void func(int a = 10) {
        cout << "Object::func:a" << a << endl;
    }
};
//---------------------------------------------
class Base : public Object {
public:
    virtual void func(int b = 20) {
        cout << "Base::fun:b" << b << endl;
    }
};
//---------------------------------------------
int main() {
    Base base;
    Object* op = &base;
    op->func();
    return 0;
}

//out put Base::fun:b10
```

在这个C++代码中，有几个关键点需要注意来解释为什么输出时`b`等于10，而不是20。

在C++中，当通过基类指针或引用来调用虚函数时，会发生动态绑定（或晚期绑定）。但是，这里的关键是==默认参数值是在编译时确定的==，基于函数声明的上下文。由于`op`是`Object*`类型，编译器只知道`Object`类中的`func`函数及其默认参数值（`a = 10`），而不知道`Base`类中的默认参数值（`b = 20`）。

因此，当你执行`op->func();`时，调用的是`Base`类中的`func`函数，但是使用了`Object`类中定义的默认参数值10。这就是为什么输出是"Base::func:a10"。



在C++中，当通过基类指针调用一个覆盖的虚函数时，会使用派生类的函数实现，这是多态的表现。然而，函数的**<u>默认参数值是静态绑定</u>**的，而不是动态绑定的。这意味着默认参数值的选择是根据指针或引用的静态类型来决定的，而不是对象的实际类型。

在给定的代码中，[`op`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)是一个指向[`Base`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)对象的[`Object`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)类型指针。当调用[`op->func()`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)时，由于[`func`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)是一个虚函数，并且在[`Base`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)类中被覆盖，所以会调用[`Base`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)类中的[`func`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)实现。然而，因为[`func`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)的调用是通过一个类型为[`Object*`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)的指针[`op`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)进行的，所以使用的默认参数值是在[`Object`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)类中声明的[`func`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)函数的默认参数值`10`，而不是[`Base`](vscode-file://vscode-app/d:/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)类中的默认参数值`20`。



- 第8题

==**虚函数不能是静态成员函数**。==

这是因为在C++中，虚函数和静态成员函数在语义和设计目的上存在根本的差异。

1. **虚函数**：虚函数主要用于实现动态多态性。当通过基类指针或引用调用虚函数时，实际调用的是指针或引用所指向的对象的实际类型（即派生类）中的虚函数版本（如果已经被重写）。这是通过虚函数表（`vtable`）和虚指针（`vptr`）实现的。
2. **静态成员函数**：静态成员函数与类的一个特定实例无关，而是与类本身相关。它们不能访问类的非静态成员（因为它们不依赖于任何特定的对象实例），并且它们不能是虚函数。静态成员函数主要用于访问静态数据成员或执行与类相关的但与任何特定对象无关的操作。

由于静态成员函数与类的特定实例无关，因此它们没有与对象的动态类型相关的概念。因此，将它们声明为虚函数是没有意义的。

- Question 10 - 不定项选择题

	以下哪些情况会导致虚函数表的创建？

	A.定义至少一个虚函数的类

	B.使用虚继承的类

	C.包含纯虚函数的类（抽象类）

	D.所有类都会自动创建虚函数表

	------

	Standard Answer: A, C

	解释：好好区分虚继承的概念，虚继承是为了解决菱形继承的过程中出现的多个基类的问题，和虚函数表完全是两码事

- 13.以下哪些是实现运行时多态的方式？

A.函数重载

B.虚函数

C.重写（Override）

D.模板函数

---standard answer BC

解释：

A. 函数重载（Overloading）虽然是实现多态的一种方式，但它实现的是编译时的多态性，而不是运行时的多态性。函数重载允许在同一个作用域内使用相同的函数名，但具有不同的参数列表（参数类型不同、参数个数不同或者二者都不同）。

B. 虚函数（Virtual Functions）是实现运行时多态的关键机制。当基类中的成员函数被声明为虚函数时，它就可以在派生类中被重写（Override）。这样，通过基类指针或引用来调用虚函数时，就会根据指针或引用所指向的实际对象类型来调用相应的函数实现，从而实现运行时的多态性。

C. 重写（Override）是子类对父类中虚函数的重新实现。通过重写，子类可以改变父类中虚函数的行为。这也是实现运行时多态的一种方式。

D. 模板函数（Template Functions）主要用于实现泛型编程，它与运行时多态没有直接关系。模板函数在编译时根据提供的类型参数生成具体的函数实例，这属于**<u>编译时的多态性</u>**。

- Question 14 - 不定项选择题

  关于动态类型，以下哪些说法是正确的？

  A.动态类型是在运行时确定的

  B.动态类型可以通过向下转型来改变

  C.动态类型决定了实际调用哪个函数版本

  D.动态类型与静态类型总是相同的

  ------

  Standard Answer: A, C

  解释：动态类型和静态类型的概念主要用于指针和引用的上下文中，尤其是在涉及到继承和多态时。

  - **静态类型**：是变量声明时的类型，或者说是编译时可知的类型。对于指针和引用，静态类型决定了你可以在该指针或引用上调用哪些成员函数，以及这些函数调用是如何被解析的（比如是否发生动态绑定）。

  - **动态类型**：是指针或引用实际指向的对象的类型。动态类型只有在运行时才能确定，它可能与静态类型相同，也可能是静态类型的派生类类型。在使用虚函数时，动态类型决定了哪个函数实现被调用。

  这两个概念是理解和实现多态性的关键。在非指针或引用的情况下，变量的类型在编译时是固定的，不存在动态类型的概念，因此通常不会讨论静态类型和动态类型。

  对于B：动态类型是指指针或引用所指向对象的实际类型。动态类型可以在运行时通过向下转型（downcasting）来“改变”，但实际上并不改变对象本身的类型，而是改变我们对该对象类型的解释或访问方式。



- 17.以下哪种情况会发生动态类型转换？

  A.将基类对象赋值给派生类对象

  B.使用static_cast进行类型转换

  C.通过基类指针调用非虚成员函数

  D.显式地使用dynamic_cast进行转换

  ---answer: D

  

  在C++中，关于动态类型转换的描述，我们来分析这些选项：

  A. 将基类对象赋值给派生类对象

  这是不允许的，因为基类对象通常不包含派生类可能添加的所有成员，因此无法直接将基类对象转换为派生类对象。这会导致编译错误。

  

  B. 使用static_cast进行类型转换

  `static_cast` 是一种编译时类型转换，它不会进行运行时检查。虽然它可以用于多种类型转换，包括基类和派生类之间的转换（当进行安全的上转型或明确知道转换是安全时），但它本身并不直接代表动态类型转换。

  

  C. 通过基类指针调用非虚成员函数

  通过基类指针调用非虚成员函数不会导致动态类型转换。这种调用将总是解析为基类中的函数版本，因为非虚函数是在编译时绑定的。

  

  D. 显式地使用dynamic_cast进行转换

  `dynamic_cast` 是C++中的一种类型转换运算符，它用于安全地执行运行时类型检查。它主要用于在类层次结构中进行向上转型（这通常是不必要的，因为自动转换就足够了）和向下转型（从基类指针或引用到派生类指针或引用）。当使用 `dynamic_cast` 进行向下转型时，如果转换不安全（即基类指针不指向派生类对象），它将返回空指针（对于指针类型）或抛出异常（对于引用类型）。因此，这是动态类型转换的一个例子。

  所以，正确答案是 D：显式地使用dynamic_cast进行转换。

- Question 20 - 不定项选择题

  下列关于函数重载的规则，哪些是正确的？

  A.参数类型或个数不同

  B.函数返回类型必须相同

  C.函数名称必须相同

  D.参数名称可以不同

  ------

  Standard Answer: A, C, D

## 补充

- 虚表

  - from  [C++ 虚函数表剖析 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/75172640)

  - 虚表是一个指针数组，其元素是虚函数的指针，每个元素对应一个虚函数的函数指针。需要指出的是，普通的函数即非虚函数，其调用并不需要经过虚表，所以虚表的元素并不包括普通函数的函数指针。
  	虚表内的条目，即虚函数指针的赋值发生在**编译器的编译阶段**，也就是说在代码的编译阶段，虚表就可以构造出来了。（解释上面的第五题）

  - 虚表是属于类的，而不是属于某个具体的对象，一个类只需要一个虚表即可。同一个类的所有对象都使用同一个虚表。

  - 为了指定对象的虚表，对象内部包含一个虚表的指针，来指向自己所使用的虚表。为了让每个包含虚表的类的对象都拥有一个虚表指针，编译器在类中添加了一个指针，`*__vptr`，用来指向虚表。这样，当类的对象在创建时便拥有了这个指针，且这个指针的值会自动被设置为指向类的虚表。

  - 一个继承类的基类如果包含虚函数，那个这个继承类也有拥有自己的虚表，故这个继承类的对象也包含一个虚表指针，用来指向它的虚表。（解释一旦为虚，永远为虚）

  - ==对象的虚表指针用来指向自己所属类的虚表，虚表中的指针会指向其继承的最近的一个类的虚函数==

  - 非虚函数的调用不用经过虚表，故不需要虚表中的指针指向这些函数。

  - ```C++
  	int main() 
  	{
  	    B bObject;
  	    A *p = & bObject;
  	    p->vfun1();
  	}
  	
  	//虽然p是基类的指针只能指向基类的部分，但是虚表指针亦属于基类部分，所以p可以访问到对象bObject的虚表指针。bObject的虚表指针指向类B的虚表，所以p可以访问到B vtbl.
  	
  	//程序在执行p->vfunc1()时，会发现p是个指针，且调用的函数是虚函数，接下来便会进行以下的步骤。
  	
  	//首先，根据虚表指针p->__vptr来访问对象bObject对应的虚表。虽然指针p是基类A*类型，但是*__vptr也是基类的一部分，所以可以通过p->__vptr可以访问到对象对应的虚表。
  	
  	//然后，在虚表中查找所调用的函数对应的条目。由于虚表在编译阶段就可以构造出来了，所以可以根据所调用的函数定位到虚表中的对应条目。对于p->vfunc1()的调用，B vtbl的第一项即是vfunc1对应的条目。
  	
  	//最后，根据虚表中找到的函数指针，调用函数。
  	```

  	

  - 我们把经过虚表调用虚函数的过程称为动态绑定，其表现出来的现象称为运行时多态。动态绑定区别于传统的函数调用，传统的函数调用我们称之为静态绑定，即函数的调用在编译阶段就可以确定下来了。

  - 当对象指针被向上转型为基类指针时，如果没有涉及到多态（即没有使用虚函数机制），**<u>调用的是基类的函数</u>**，原因在于编译时的静态类型决定了可以调用哪些成员函数。这种行为是基于静态绑定的，意味着函数调用在编译时就已经确定了，而不是在运行时。

  	在没有多态的情况下，<u>即使派生类隐藏了基类中的同名函数</u>，当通过基类指针调用函数时，<u>编译器只能看到指针的静态类型</u>（即基类），<u>因此它会调用基类中的函数。</u>这是因为在编译时，<u>编译器只能根据指针的类型</u>（而不是指针所指向的对象的实际类型）来解析函数调用。

  	多态通过虚函数实现，它允许在运行时根据对象的动态类型来决定调用哪个函数。当基类中的函数被声明为 `virtual`，并且派生类提供了一个覆写版本时，通过基类指针调用该函数将会根据指针所指向的对象的实际类型来调用相应的函数实现，这是动态绑定的结果。

- 向上转型

  - **向上转型**是将派生类（或子类）的引用赋值给基类（或父类）的引用。这种转型是安全的，因为派生类是基类的一个特殊化版本，所以基类引用可以安全地引用派生类对象。在向上转型过程中，不需要进行显式转换，因为编译器会自动进行这种转换。
  - 收窄

- 如果派生类中的函数与基类中的函数同名，不管参数列表是否相同，都会导致基类中同名函数的隐藏。这种现象在 C++ 中被称为“隐藏”（不是“覆写”或 overwrite，覆写一词通常用于虚函数的上下文）。隐藏发生在派生类中声明了一个与基类中某个函数同名的函数时，无论这两个函数的参数列表是否相同，基类中的所有同名函数都将在派生类的作用域中被隐藏。

	这意味着，如果你想在派生类中调用被隐藏的基类函数，你需要在派生类中显式地引用它们，通常是通过使用基类的作用域解析运算符（`::`）来实现。

### static

**<u>静态成员变量是</u>**C++中类的一个特殊特性，它不属于任何一个类实例，而是属于类本身。以下是使用静态成员变量时需要注意的一些关键事项：

1. **定义与声明**：静态成员变量==必须在类定义之外进行定义和初始化==。在类定义中，你只能声明静态成员变量，而不能定义它。例如：


```cpp
class MyClass {
public:
    static int myStaticVar;  // 声明
};

int MyClass::myStaticVar = 0;  // 定义和初始化
```
2. **访问方式**：你可以通过类名直接访问静态成员变量，而无需创建类的实例。同时，你也可以通过类的对象访问静态成员变量，但这不是推荐的做法，因为这可能会导致混淆。


```cpp
MyClass::myStaticVar = 10;  // 通过类名访问
MyClass obj;
obj.myStaticVar = 20;  // 通过对象访问，不推荐
```
3. **初始化顺序**：静态成员变量的初始化顺序是按照它们在文件中出现的顺序进行的，而不是按照它们在类定义中的顺序。因此，如果静态成员变量的初始化依赖于其他静态成员变量或全局变量，那么你需要特别小心以确保正确的初始化顺序。
4. **生命周期**：静态成员变量的生命周期与整个程序的生命周期相同。它们在程序开始执行时创建，在程序结束时销毁。
5. **线程安全**：在多线程环境中，对静态成员变量的访问需要特别注意线程安全。如果没有适当的同步机制，多个线程可能同时修改静态成员变量，导致数据不一致或其他问题。
6. **内存管理**：静态成员变量存储在程序的静态存储区，而不是堆或栈上。因此，你不需要（也不能）使用`new`或`delete`来管理它们的内存。
7. **继承**：如果基类有静态成员变量，那么派生类不会继承这个静态成员变量。每个类都有自己的静态成员变量。但是，通过派生类的名字也可以访问基类的静态成员变量。

**<u>静态成员函数</u>**是C++类中的一种特殊函数，它属于类本身而不是类的实例对象。以下是关于静态成员函数的一些主要特点和注意事项：

1. **声明与定义**：静态成员函数在类内部声明时，使用`static`关键字进行修饰。其定义（实现）通常在类外部完成，且不需要`static`关键字。
2. **访问方式**：静态成员函数可以通过类名直接调用，而不需要创建类的实例。这使得静态成员函数成为执行与类本身相关的操作而非特定于某个对象的操作的理想选择。同时，静态成员函数不能访问类的非静态成员变量和非静态成员函数，因为它们需要依赖于特定的对象实例。但是，静态成员函数可以访问静态成员变量和静态成员函数。
3. **用途**：静态成员函数通常用于执行与类相关但不依赖于对象实例的操作。例如，它们可以用于计算类的静态成员变量的值，或者执行一些全局性的操作。
4. **线程安全**：在多线程环境中，对静态成员函数的访问需要特别注意线程安全。如果没有适当的同步机制，多个线程可能同时调用静态成员函数，导致数据竞争或其他问题。
5. **继承**：如果基类有静态成员函数，派生类可以访问基类的静态成员函数。这是因为静态成员函数属于类本身，而不是类的实例。

请注意，虽然静态成员函数在类定义中声明时使用了`static`关键字，但在其定义（实现）时==不需要再次使用`static`关键字==。此外，静态成员函数由于没有隐式的`this`指针，因此不能访问类的非静态成员。

总的来说，静态成员函数是C++类的一个强大工具，可以在不需要特定对象实例的情况下执行与类相关的操作。然而，在使用它们时，需要注意它们的一些限制和特性，以确保代码的正确性和安全性。







#第十三周

- Question 3 - 单选题

	以下关于虚函数和多态的说法中错误的是：

	A.只要基类的函数被声明为虚函数，则派生类的同名函数就能自动实现对基类函数的覆盖（override）。

	B.一般不建议在派生类中把从基类继承来的非虚函数声明为虚函数。

	C.当基类的某个成员函数在派生类中被隐藏（overwrite）时，程序将根据引用或指针的类型选择函数方法。

	D.关键字virtual只用于类声明的函数原型中，而不会用于类外的函数方法定义中。

	------

	Standard Answer: A

	这句话的错误之处在于它忽略了函数签名的匹配要求和`override`关键字的作用。要正确实现对基类虚函数的覆盖（override），派生类中的函数不仅需要与基类中的虚函数同名，还必须具有相同的参数列表（包括参数类型和数量）和兼容的返回类型。此外，C++11引入了`override`关键字，虽然它不是必需的，但使用它可以让编译器帮助检查派生类的函数确实覆盖了基类的一个虚函数。

	因此，更准确的表述应该是：

	只要基类的函数被声明为虚函数，且派生类中有一个同名函数，该函数具有相同的参数列表和兼容的返回类型，则派生类的这个函数就能实现对基类函数的覆盖。为了确保这种覆盖是有意为之，可以在派生类的函数声明中使用`override`关键字，这样如果没有正确覆盖基类的虚函数，编译器将报错。

- Question 5 - 不定项选择题

	以下关于up/downcasting的说法正确的有：

	A.upcasting时必须显式转换；

	B.upcasting显隐式转换均合法；

	C.downcasting时必须显式转换；

	D.downcasting显隐式转换均合法；

	------

	Standard Answer: B, C

	解释：
	B.将派生类指针(或引用)转换为基类指针(或引用)的过程称为upcasting

	C.将基类指针(或引用)转换为派生类指针(或引用)的过程称为downcasting

	往下是危险的，所以要用dynamic_cast保护

- 不能声明为虚函数的函数

	- 1）普通函数。普通函数不属于成员函数，是不能被继承的。普通函数只能被重载，不能被重写，因此声明为虚函数没有意义。因为编译器会在编译时绑定函数。而多态体现在运行时绑定。通常通过基类指针指向子类对象实现多态。

	- 2）友元函数。友元函数不属于类的成员函数，不能被继承。对于没有继承特性的函数没有虚函数的说法。
	- 3）构造函数。假如子类可以继承基类构造函数，那么子类对象的构造将使用基类的构造函数，而基类构造函数并不知道子类的有什么成员，显然是不符合语义的。从另外一个角度来讲，多态是通过基类指针指向子类对象来实现多态的，在对象构造之前并没有对象产生，因此无法使用多态特性，这是矛盾的。因此构造函数不允许继承。
	- 4）内联成员函数。我们需要知道内联函数就是为了在代码中直接展开，减少函数调用花费的代价。也就是说内联函数是在编译时展开的。而虚函数是为了实现多态，是在运行时绑定的。因此显然内联函数和多态的特性相违背。
	- 5）静态成员函数。首先静态成员函数理论是可继承的。但是静态成员函数是编译时确定的，无法动态绑定，不支持多态，因此不能被重写，也就不能被声明为虚函数。

- Question 3 - 单选题

	以下关于虚函数和多态的说法中错误的是：

	A.只要基类的函数被声明为虚函数，则派生类的同名函数就能自动实现对基类函数的覆盖（override）。

	B.一般不建议在派生类中把从基类继承来的非虚函数声明为虚函数。

	C.当基类的某个成员函数在派生类中被隐藏（overwrite）时，程序将根据引用或指针的类型选择函数方法。

	D.关键字virtual只用于类声明的函数原型中，而不会用于类外的函数方法定义中。

	答案：A

	选项分析：

	A. 只要基类的函数被声明为虚函数，则派生类的同名函数就能自动实现对基类函数的覆盖（override）。

	* 这个说法有误。虽然基类函数被声明为虚函数允许派生类进行覆盖，但并不是派生类的同名函数就能“自动”实现对基类函数的覆盖。派生类中的函数需要有相同的函数签名（包括返回类型、函数名和参数列表），并且需要使用 `override` 关键字（在C++11及以后的版本中）来显式地表明这是一个覆盖基类的虚函数。所以，A 选项是错误的。

	B. 一般不建议在派生类中把从基类继承来的非虚函数声明为虚函数。

	* 这个说法通常被认为是正确的。如果基类中的函数不是虚函数，而在派生类中将其声明为虚函数，这可能会导致一些设计上的问题，比如切片问题等。通常，如果一个函数在基类中应当是虚函数，那么它应该在基类中就被声明为虚函数。

	C. 当基类的某个成员函数在派生类中被隐藏（overwrite）时，程序将根据引用或指针的类型选择函数方法。

	* 这个说法是正确的。当派生类中的函数与基类中的函数同名但签名不同，或者基类中的函数没有被声明为虚函数时，基类的函数将被隐藏。在这种情况下，程序将根据对象的静态类型（即引用或指针的类型）来选择调用的函数。

	D. 关键字virtual只用于类声明的函数原型中，而不会用于类外的函数方法定义中。

	* 这个说法是正确的。`virtual` 关键字只在类内部声明虚函数时使用，不需要在类外部的函数定义中重复。


- Question 5 - 不定项选择题

	以下关于up/downcasting的说法正确的有：

	A.upcasting时必须显式转换；

	B.upcasting显隐式转换均合法；

	C.downcasting时必须显式转换；

	D.downcasting显隐式转换均合法；

	答案：BC

	收窄安全，隐式即可，无强制要求显式；拓宽危险，需要显式



```C++
#include <iostream>
#include <string>

using namespace std;

class Cat {
public:
    // three overloaded functions
    virtual void func() const {
        cout << "func default" << endl;
    }

    virtual void func(int a) const {
        cout << "func with int" << endl;
    }

    virtual void func(double x) const {
        cout << "func with double" << endl;
    }

    virtual void func(string str) const {
        cout << "func with string" << endl;
    }
};

class persianCat : public Cat {
public:
    // new redefined functions
    // 有同名函数，不管参数是否相同，都隐藏了基类的函数

    // 同名且参数相同，重写了基类的无参函数
    virtual void func() const {
        cout << "new func default" << endl;
    }

    // 同名且参数相同，重写了基类的int函数
    virtual void func(int a_) const {
        cout << "new func with int" << endl;
    }
};

int main() {
    Cat bai;
    persianCat hei;

    //--------------------------------------------------------

    Cat *c1 = &hei;
    persianCat *c2 = &hei;
    string s("hello");
    // hei.func(s);  // error:找不到这个函数，被隐藏了，强制类型转换又不行（string->int）
    // c2->func(s);  // error:
    c1->func(s);  // correct，输出func with string
    c1->func(2);  // correct, 输出func with int
    /*
    Q:为什么派生对象和派生类指针找不到这个函数？是因为隐藏吗
    A:是的，派生类同名函数隐藏了基类函数

    Q:为什么基类指针就可以调用
    A:基类指针调用的是基类的函数，基类的函数在基类指针的解释下都是可以找到的，再根据动态类型来调用派生类的函数
    */

    //-------------------------------------------------------

    // object of base class
    cout << "12" << endl;
    bai.func(2.1);  // 输出func with double，基类成员调用基类函数

    //-------------------------------------------------------

    cout << "13" << endl;
    hei.func(2.1);  // 输出func with new int，由于隐藏，无法调用基类的int函数，只能强转之后调用派生类的int函数
    // 因为基类的虚表已经被隐藏，只有在派生类中重定义了的函数才会出现在派生类的虚表里面。既然找不到函数，只好强制类型转换后调用int的函数了。

    //-------------------------------------------------------

    // hei.func("adsasd");
    cout << "14" << endl;
    cout << "error" << endl;

    //-------------------------------------------------------

    // pointer to base class
    cout << "15" << endl;
    Cat *p2Cat = &bai;  // 基类指针指向基类对象
    p2Cat->func();      // 输出func default
    p2Cat->func(2);     // 输出func with int
    p2Cat->func(2.1);   // 输出func with double
    // 这仨都是基类指针指向基类对象，动态类型也是基类的，所以都是调用基类的函数

    //-------------------------------------------------------

    // pointer to base class
    cout << "16" << endl;
    // Cat *p2Cat
    p2Cat = &hei;      // 基类指针指向派生类对象
    p2Cat->func();     // 输出new func default
    p2Cat->func(2);    // 输出new func with int
    p2Cat->func(2.1);  // 输出func with double
    // 基类指针指向派生类对象，从基类函数中找匹配参数的函数
    // 如果有，看看有无重写，有则调用派生类的函数，没有则调用基类的函数

    //----------------------------------------------------

    // pointer to derived class
    cout << "17" << endl;
    persianCat *p2persianCat = &hei;  // 派生类指针指向派生类对象
    p2persianCat->func();             // 输出new func default
    p2persianCat->func(2);            // 输出new func with int
    p2persianCat->func(2.1);          // 输出nfunc with int
    // 派生类指针指向派生类对象，基类函数已经被隐藏了，直接调用派生类的函数
    // 如果没有完全匹配的，尝试类型转换

    //---------------------------------------------------

    // reference to base class
    cout << "18" << endl;
    Cat &ref2Cat = bai;  // 基类引用指向基类对象
    ref2Cat.func();      // 输出func default
    ref2Cat.func(2);     // 输出func with int
    ref2Cat.func(2.1);   // 输出func with double
    // 基类引用指向基类对象，动态类型也是基类的，所以都是调用基类的函数

    //----------------------------------------------------

    // reference to base class
    cout << "19" << endl;
    Cat &ref3Cat = hei;  // 基类引用指向派生类对象
    ref3Cat.func();      // 输出new func default
    ref3Cat.func(2);     // 输出new func with int
    ref3Cat.func(2.1);   // 输出func with double
    // 基类引用指向派生类对象，从基类函数中找匹配参数的函数
    // 找到了，看看有无重写，有则调用派生类的函数，没有则调用基类的函数

    //----------------------------------------------------

    // reference to derived class
    cout << "20" << endl;
    persianCat &r2persianCat = hei;  // 派生类引用指向派生类对象
    r2persianCat.func();             // 输出new func default
    r2persianCat.func(2);            // 输出new func with int
    r2persianCat.func(2.1);          // 输出new func with int
    // 派生类引用指向派生类对象，基类函数已经被隐藏了，直接调用派生类的函数
    // 如果没有完全匹配的，尝试类型转换

    system("pause");

    return 0;
}
```

- 13周课堂1，要输出类名，注意函数，只有基类或者次基类要用virtual，然后调用的函数，接受的形参必须是引用或者指针





# 第十四周（模板）

- Question 2 - 单选题

	模板函数的真正代码是在哪个时期产生的？

	A.源程序中声明函数时

	B.源程序中定义函数时

	C.源程序中调用函数时

	D.运行执行函数时

	------

	Standard Answer: C

	解释：编译器的“调用”过程实际上是一个代码生成过程，而不是像程序运行时那样的函数执行过程。编译器通过分析源代码中的模板函数调用，确定需要生成的具体函数版本。这个过程包括确定模板参数的具体类型，并根据这些类型生成相应的函数实例代码。这一切都发生在编译时，而非运行时。

- Question 3 - 单选题

	下列关于模板的描述中，错误的是？

	A.模板把数据类型作为一个设计参数，称为参数化程序设计

	B.使用时，模板参数与函数参数相同，是按位置而不是名称对应的

	C.模板参数表中可以有类型参数和非类型参数

	D.类模板与模板类是同一个概念

	------

	Standard Answer: D

	解释：类模板是一个蓝图，不是一个具体的类，但是模板类是一个具体的类

- Question 10 - 单选题

	关于类模板，描述错误的是?

	A.一个普通基类不能派生类模板

	B.类模板可以从普通类派生，也可以从类模板派生

	C.根据建立对象时的实际数据类型，编译器把类模板实例化为模板类

	D.函数的类模板参数需生成模板类并通过构造函数实例化

	------

	Standard Answer: A

- Question 16 - 不定项选择题

	根据如下类模板定义，下列语句中可正常运行的有：

	```C++
	template<typename T>
	class Point{
	    T x,y;
	public:
	    Point(T x_, T y_):x(x_),y(y_){}
	};
	
	template<typename T>
	class Circle : public Point<T>{
	    T r;
	public:
	    Circle(T x_, T y_, T r_):Point<T>(x_,y_),r(r_){}
	};
	
	```

	A.`Circle<double>* a = new Circle<int>(4,5,6); `

	B.`Point<int>* a = new Circle<int>(4,5,6); `

	C.`Circle<int> a(4,5,6);  Circle<double> b(1,2,3);  a=b; `

	D.`Circle<int> a(1,2,2.5);  Point<int> b(1,2);  b=a; `

	------

	Standard Answer: B, D

	解释：这个语句试图将 `Circle<int>` 类型的对象赋值给一个指向 `Circle<double>` 类型的指针。这是类型不匹配的，因为模板参数 `T` 在两边不一致，导致类型不兼容。因此，这个语句不能正常运行。

	一旦实例化，就是不同类的了，如果将不同类非继承关系的指针之间进行直接赋值，是错的，而D选项里，基类和派生类都是int的，因而父类指针可以指向派生类

- Question 17 - 单选题

	下述关于函数模板和类模板的说法中错误的是：

	A.调用函数模板时，编译器允许根据函数调用中所给出的实参类型来确定相应的模板实参

	B.调用函数模板时允许显示指定模板实参

	C.实例化类模板时，编译器允许不显式提供模板实参而根据构造函数的实参类型来推断模板实参

	D.实例化类模板时，必须显式地提供模板实参

	------

	Standard Answer: C

	解释：对于类模板，当前的 C++ 标准（包括 C++17）要求在实例化类模板时必须显式提供模板实参。这意味着编译器不会尝试根据构造函数的实参类型来推断模板实参。

Question 15 - 单选题

对模板进行实例化时，传递给非类型形参的实参可以是：

A.动态对象

B.局部变量

C.非const的全局变量

D.编译时常量表达式

---

ans: D 
由于模板实例化发生在编译期，所以必须传递编译器常量才能识别，也就是说尖括号里面的内容必须是一个常量表达式。



- 函数模板调用的是同一个函数吗

**函数模板是一个蓝图，它本身并不是函数，是编译器用使用方式产生特定具体类型函数的模具。所以其实模板就是将本来应该我们做的重复的事情交给了编译器。**

![image-20240529203345238](C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240529203345238.png)

- 类函数分离声明与定义的写法

```C++
#include "Stack.h"
 
template<class T1>
// 构造函数
Stack<T1>::Stack(int capacity)
	:_a(new T1[capacity])
	,_capacity(capacity)
	,_size(0)
{}
template<class T1>
// 插入函数
void Stack<T1>::Push(T1 data){
	_a[_size] = data;
	_size++;
}
// 析构函数
template<class T1>
Stack<T1>::~Stack(){
	delete[]_a;
	_a = nullptr;
	_capacity = _size = 0;
}
```



## 补充

<img src="C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240529204002583.png" alt="image-20240529204002583" style="zoom:80%;" />

explicit表示不发生隐式类型转换，所以调用失败（注意：explicit只能在构造函数中使用）

<img src="C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240602111820936.png" alt="image-20240602111820936" style="zoom:67%;" />

## 程序题

```C++
#include <iostream>
#include <string>

using namespace std;

// 函数模板demoPrint
template <typename T>
void demoPrint(const T v1, const T v2) {
    cout << "the first version of demoPrint()" << endl;
    cout << "the arguments: " << v1 << " " << v2 << endl;
}

// 函数模板demoPrint的指定特殊
template <>
void demoPrint(const char v1, const char v2) {
    cout << "the specify special of demoPrint()" << endl;
    cout << "the arguments: " << v1 << " " << v2 << endl;
}

// 函数模板demoPrint重载的函数模板
template <typename T>
void demoPrint(const T v) {
    cout << "the second version of demoPrint()" << endl;
    cout << "the argument: " << v << endl;
}

// 非函数模板demoPrint
void demoPrint(const double v1, const double v2) {
    cout << "the nonfunctional template version of demoPrint()" << endl;
    cout << "the arguments: " << v1 << " " << v2 << endl;
}

int main() {
    string s1("rabbit"), s2("bear");
    char c1('k'), c2('b');
    int iv1 = 3, iv2 = 5;
    double dv1 = 2.8, dv2 = 8.5;
    
    // 调用第一个函数模板
    demoPrint(iv1, iv2);
    
    // 调用第一个函数模板的指定特殊
    demoPrint(c1, c2);
    
    // 调用第二个函数模板
    demoPrint(iv1);
    
    // 调用非函数模板
    demoPrint(dv1, dv2);
    
    // 模板不会发生隐式类型转换，所以隐式转换后调用非函数模板
    demoPrint(iv1, dv2);

    return 0;
}
```



# 第十五、十六周（STL）

- ```C++
	//1
	int main() {
	    vector<int> vec;
	    for (int i = 0; i < 5; i++) {
	        vec.push_back(i + 1);
	    }
	    // 1 2 3 4 5
	    auto it2 = vec.begin() + 2; // 3
	    auto it = vec.begin() + 3;  // 4
	    vec.insert(it2, 5); // 在3的前面插入5
	    // 1 2 5 3 4 5
	    cout << *(it2) << " " << *(it) << endl; // 5 3（it没有移动）
	}
	
	//2
	int main() {
	    vector<int> vec;
	    for (int i = 0; i < 5; i++) {
	        vec.push_back(i + 1);
	    }
	    // 1 2 3 4 5
	    auto it2 = vec.begin() + 2; // 3
	    auto it = vec.begin() + 3;  // 4
	    vec.insert(it2, 5);     // 1 2 5 3 4 5
	    sort(vec.begin(), vec.end()); // 1 2 3 4 5 5
	    cout << *(it2) << " " << *(it) << endl; // 3 4（迭代器不会跟随数据移动而移动，只是指向一个位置）
	}
	```

- 关于stack，下列哪项描述是正确的？

	A.stack是一种先进先出（FIFO）的数据结构

	B.stack支持随机访问其中的元素

	C.stack提供的主要操作是push、pop和top等

	D.stack可以直接使用迭代器进行遍历

	------

	Standard Answer: C

	解释：

	* **A**：错误。栈是一种后进先出（LIFO）的数据结构，而不是先进先出（FIFO）。先进先出描述的是队列（`std::queue`）的行为。
	* **B**：错误。栈不支持随机访问其内部元素。栈的操作主要集中在栈顶，你不能直接访问栈中间的元素，这是由栈的设计和目的决定的。
	* **D**：错误。`std::stack`不提供直接使用迭代器进行遍历的能力。这是因为栈是一种只能从一端（栈顶）访问元素的容器，不支持像数组或链表那样的随机访问模式。如果需要遍历栈中的元素，你需要将元素从栈中移除，这通常不是遍历操作所期望的。
	* 请注意：stack，queue等==是一个容器适配器，而不是一个顺序容器==。它提供了一组特定的接口（如 `push`, `pop`, `front`, `back` 等）来支持先进先出（FIFO）的数据结构模型。`std::queue`通常使用`std::deque`或`std::list`作为其底层容器实现，但它限制了对这些底层容器的直接访问，仅提供了队列操作的接口。这种设计允许`std::queue`专注于实现队列的行为，而不是容器的存储细节。

- ![image-20240707115553040](C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240707115553040.png)

	- 第二次输出的容量不会因为 `resize` 调用而减少。即使 `vector` 的大小被调整为4，其容量仍然保持不变，因为 `resize` 减少大小不会自动减少容量。

- ![image-20240707120031314](C:/Users/19912/AppData/Roaming/Typora/typora-user-images/image-20240707120031314.png)

	- 这个地方很好地说明了capacity和size的区别

- ```c++
	int main() {
	    int n = 16;
	    vector<int> a;
	    for (int i = 0; i < n; i++) {
	        a.push_back(i);
	    }
	    // 0~15 capacity = 16 size = 16
	    cout << a.capacity() << " ";  // 16
	
	    int m = 50;
	    a.reserve(m);
	    cout << a.capacity() << " " << a.size() << endl;
	    // capacity = 50 size = 16
	    for (int i = 0; i < m; i++) {
	        a.push_back(i);
	    }
	    // capacity = 100 size = 66
	    cout << a.capacity() << " " << a.size() << endl;  // 100 66
	    return 0;
	}
	```

- ```C++
	int main() {
	    int n = 17;
	    vector<int> a;
	    for (int i = 0; i < n; i++) {
	        a.push_back(i);
	    }
	    // 0~16, size = 17, capacity = 32
	    cout << a.capacity() << " ";
	    
	    a.shrink_to_fit();
	    // 0~16, size = 17, capacity = 17
	    
	    a.push_back(n + 1);
	    // 0~17, size = 18, capacity = 34
	    cout << a.capacity();
	    return 0;
	}
	```

- ```C++
	int main() {
	    int n = 3;
	    vector<int> a;
	    for (int i = 0; i < n; i++) {
	        a.push_back(i + 1);
	    }
	    // 1 2 3
	    auto res = accumulate(a.begin(), a.end(), 1, [](int i, int j) { return pow(i, j); });
	    // i = i^1 = 1^1 = 1
	    // i = i^2 = 1^2 = 1
	    // i = i^3 = 1^3 = 1
	    cout << res << " ";
	    
	    auto res = accumulate(a.begin(),a.end(),1,[](int i,int j){return pow(j,i);});
	    // i = 1^i = 1^1 = 1
	    // i = 2^i = 2^1 = 2
	    // i = 3^i = 3^2 = 9
		cout << res << " ";
	    
	    sort(a.begin(), a.end(), [](int a, int b) { return a > b; });
	    // 3 2 1
	    auto res2 = accumulate(a.begin(), a.end(), 1, [](int i, int j) { return pow(i, j); });
	    // i = i^3 = 1^3 = 1
	    // i = i^2 = 1^2 = 1
	    // i = i^1 = 1^1 = 1
	    cout << res2;
	}
	```

	- 这里，`i` 是累积到目前为止的结果（初始值为 1），`j` 是当前元素的值。lambda 表达式使用 `pow(i, j)` 计算 `i` 的 `j` 次幂，这个结果将被用作下一步的累积值。

		因此，对于这个特定的 `accumulate` 调用：

		* 第一个参数 `i` 表示到目前为止的累积结果。
		* 第二个参数 `j` 表示当前遍历到的元素值。

## 课堂2中有一个地方

```C++
map<string, set<int>> students;

// 在我们试图寻找到。对应的set的时候出现了问题
for(auto c : students.at(name)) {
    sum += c;
    cnt++;
    cout << c << " ";
}
```

#### 错误示例 1

```cpp
for(auto c : students[name]) {
    // ...
}
```

错误原因：`students` 是一个对 `const map<string, set<int>>` 的引用，这意味着你不能通过这个引用修改 `map` 或其内部的元素。在 `for` 循环中使用 `students[name]` 实际上会尝试在 `map` 中查找键 `name`，如果它不存在，则会插入一个新的键值对（默认构造的 `set<int>`）。然而，由于 `students` 是 `const` 的，这种修改（即使它实际上是因为查找不存在的键而发生的隐式插入）也是不允许的。

#### 错误示例 2

```cpp
for(auto it = students[name].begin()...; // ...
```

错误原因：和错误示例 1 类似，这里也是尝试通过 `students[name]` 访问 `map` 中的 `set`，这同样会导致尝试修改 `const` 对象，因为当 `name` 不存在于 `map` 中时，`students[name]` 会隐式地插入一个新的 `set`。

#### 正确示例 1

```cpp
for(auto c : students.find(name)->second) {
    // ...
}
```

正确原因：`students.find(name)` 返回一个迭代器，指向键为 `name` 的元素（如果存在的话），或者指向 `map` 的 `end()`。由于它不会尝试修改 `map`，所以这在 `const` 上下文中是合法的。`->second` 用于访问找到的 `map` 元素的 `set` 成员。

#### 正确示例 2

```cpp
for(auto c : students.at(name)) {
    // ...
}
```

正确原因：`students.at(name)` 也会返回与键 `name` 关联的 `set`，但它会在找不到键时抛出一个异常（而不是像 `operator[]` 那样隐式地插入一个元素）。由于它不修改 `map`，所以在 `const` 上下文中也是安全的。但是，使用 `at` 时需要确保键确实存在，否则程序会因为未捕获的异常而终止。

#### 总结

在 `const` 上下文中处理容器时，你必须确保不执行任何可能修改容器的操作。这包括避免使用 `operator[]` 访问 `map` 的元素，因为它可能会隐式地插入新元素。相反，应该使用 `find` 或 `at`（但要注意处理可能的异常）。



## vector（序列式容器）常用函数

C++中的`std::vector`是一个动态数组，提供了一系列用于管理其存储的元素的函数。以下是一些`std::vector`的常用函数及其返回值：

#### 容量相关

- **empty()**：检查容器是否为空。返回`bool`。
- **size()**：返回容器中的元素数。返回`size_type`。
- **max_size()**：返回容器可能包含的最大元素数。返回`size_type`。
- **capacity()**：返回在不重新分配的情况下容器可以容纳的元素数量。返回`size_type`。
- **resize(n)**：调整容器的大小为`n`个元素。无返回值。
- **reserve(n)**：请求改变容器的容量至少为`n`个元素。无返回值。
- **shrink_to_fit()**：请求移除未使用的容量。无返回值。

#### 修改器

- **clear()**：移除所有元素。无返回值。

- **insert(position, value)**：在指定位置之前插入元素。==返回指向新插入的元素的迭代器。==

- **erase(position)**：移除指定位置的元素。==返回指向被移除元素之后元素的迭代器==。

	- 注意：erase会自动指向删除元素的下一个，所以这里注意代码规范

	- ```C++
		vector<int> v = {1, 2, 3, 4, 5};
		// correct 
		for (auto i = v.begin(); i != v.end(); ) {
		    if(*i == 5) {
		        v.erase(i);
		        cout << *i << endl;
		    } else {
		        i++;
		    }
		}
		
		// error
		for (auto i = v.begin(); i != v.end(); i++) {
		    if(*i == 5) {
		        i = v.erase(i);
		        cout << *i << endl;
		    }
		}
		// erase 之后 i 指向 v.end()了，然后又++，导致指针丢失，所以一直循环
		```

	- 

- **push_back(value)**：在容器末尾添加一个新元素。无返回值。

- **pop_back()**：移除容器末尾的元素。无返回值。

- **swap(vector)**：与另一个同类型的`vector`交换内容。无返回值。

#### 元素访问

- **operator[] (n)**：访问指定位置`n`的元素。返回引用。
- **at(n)**：访问指定位置`n`的元素，带边界检查。返回引用。
- **front()**：访问第一个元素。返回引用。
- **back()**：访问最后一个元素。返回引用。
- **data()**：返回指向容器中第一个元素的指针。返回`T*`。



## map（关联式容器）常用函数

`std::map`是C++标准模板库（STL）中的一个关联容器，它存储键值对，并且基于键来自动排序。每个键在`std::map`中是唯一的。以下是`std::map`的一些常用成员函数及其返回值：

#### 访问元素

- `at(const Key& key)`：返回给定键对应的值的引用，如果键不存在则抛出`std::out_of_range`异常。返回类型为`mapped_type&`。
- `operator[](const Key& key)`：访问给定键对应的值，如果键不存在，则插入一个新的键值对，其中值进行默认初始化。返回类型为`mapped_type&`。

#### 容量和大小

- `empty()`：检查容器是否为空。返回`true`如果容器为空，否则返回`false`。
- `size()`：返回容器中键值对的数量。返回类型为`size_type`。
- `max_size()`：返回容器可能包含的最大键值对数量。返回类型为`size_type`。

#### 修改器

- `clear()`：移除容器中的所有键值对。
- `insert(const value_type& value)`：插入一个键值对，如果键已存在，则不进行任何操作。返回一个`pair<iterator,bool>`，其中`iterator`指向插入的元素或已存在的元素，`bool`表示是否插入成功。
- `erase(const Key& key)`：移除指定键的键值对。返回移除的元素数量（0或1）。
- `swap(map& other)`：与另一个`map`交换内容。

#### 查找

- `find(const Key& key)`：查找给定键的元素。==如果找到，则返回一个指向该元素的迭代器==；否则，返回`end()`。
- `count(const Key& key)`：返回具有给定键的元素数量（由于`map`中的键是唯一的，因此返回值为0或1）。

#### 迭代器

- `begin()` / `cbegin()`：返回指向容器中第一个元素的迭代器。
- `end()` / `cend()`：返回指向容器末尾的迭代器。

#### 观察者

- `key_comp()`：返回用于键比较的函数对象。
- `value_comp()`：返回用于值比较的函数对象。







# 第十七周

- 以下哪个选项描述的是C++中异常处理的正确用法？

	A.在`try`块中使用`throw`语句抛出一个整数类型的异常

	B.在`catch`块中捕获一个整数类型的异常，并将其赋值给一个字符串变量

	C.在`catch`块中捕获一个整数类型的异常，并将其赋值给一个整数变量

	D.在`catch`块中捕获一个整数类型的异常，并将其赋值给一个指针变量

	------

	Standard Answer: C

	解释：

	**A**：这个选项是正确的行为，但它不是关于如何**捕获**异常的描述，而是关于如何**抛出**异常，属于异常检测。因此，它不是针对问题“描述C++中异常处理的正确用法”的最佳答案。

- 如何抛出一个标准库中的异常对象？

	A.throw new std::exception("error");

	B.throw std::exception("error");

	C.throw "error";

	D.throw std::runtime_error("error");

	------

	Standard Answer: D
	注意：exception没有含参数的构造函数

- 在一个try-catch块中，try抛出异常，如果catch块没有匹配到任何异常，程序将会怎样？

	A.程序正常继续执行

	B.程序崩溃

	C.抛出未捕获的异常

	D.返回默认值

	------

	Standard Answer: C

	解释：会输出

	```cmd
	terminate called after throwing an instance of 'std::exception'
	  what():  std::exception
	```

- 在异常处理中，`finally` 块用于：

	A.C++ 没有 `finally` 块

	B.抛出异常

	C.捕获异常

	D.定义异常

	------

	Standard Answer: A

	finally是Js里的

- `throw` 关键字后面可以跟随：

	A.任何类型的值

	B.只有整数

	C.只有字符串

	D.只有自定义异常类型

	------

	Standard Answer: A



# 第十八周

- 在C++中，异常机制被用来解决哪种类型的程序错误？

	A.语法错误

	B.逻辑错误

	C.运行时错误

	------

	Standard Answer: C

- 下列关于异常，叙述错误的是（）

	A.编译错误属于异常，可以抛出

	B.运行错误属于异常

	C.硬件故障也可当异常抛出

	D.只要是人认为的异常都可被抛出

	------

	Standard Answer: A

	解释：

	* **A. 编译错误属于异常，可以抛出**：这个叙述是错误的。编译错误是在编译时发生的错误，它们是由编译器检测到的，通常是因为代码不符合语言的语法规则、类型不匹配、缺少必要的定义等原因。编译错误必须在编译阶段被修正，程序才能成功编译成可执行文件。编译错误不能被抛出或捕获，因为它们在程序运行之前就必须被解决。
	* **B. 运行错误属于异常**：这个叙述是正确的。运行时错误是程序执行过程中发生的错误，如除以零、访问无效的内存地址、文件不存在等。这些错误可以通过异常处理机制被抛出和捕获，以便程序可以优雅地处理错误情况。
	* **C. 硬件故障也可当异常抛出**：在某种程度上，这个叙述可以被认为是正确的。虽然硬件故障本身不是通过C++标准异常机制直接抛出的，但是硬件故障（如磁盘读写错误、网络连接中断等）可以通过操作系统或硬件抽象层检测到，并最终通过软件异常或错误码的形式暴露给应用程序。应用程序可以捕获这些软件异常或检查错误码来响应硬件故障。
	* **D. 只要是人认为的异常都可被抛出**：这个叙述是正确的，但需要一定的上下文理解。在C++中，几乎任何类型的对象都可以作为异常被抛出，这意味着程序员可以根据需要定义和抛出自定义的异常类型。因此，从这个角度来看，只要是开发者认为需要特殊处理的情况，都可以通过抛出异常来处理。

- 当程序遇到一个==没有== `noexcept` 修饰符的函数，会假设这个函数可能抛出异常，导致额外的代码执行，使用 `noexcept` 可以优化程序性能。
	该说法是否正确？

	A.正确

	B.错误

	------

	Standard Answer: A

	注意是没有

- 【多选】下列关于异常传播的说法正确的是（）

	A.当在try块内部发生异常时，程序会立即退出当前的try块，并开始搜索匹配的catch块来处理该异常。

	B.如果在try块中没有找到匹配的catch块，异常会传播到调用栈的上一层，即调用该try块的函数或方法中

	C.过程会继续进行，直到找到匹配的catch块或者异常传播到程序的顶层（通常是main函数外部），此时程序会调用std::terminate并终止执行。

	------

	Standard Answer: A, B, C

- 下列哪项最能描述C++中的异常？

	A.一种错误的检测机制

	B.一种错误的处理方法

	C.一种处理程序中意外情况的方法

	D.一种调试工具

	------

	Standard Answer: C

- 在以下代码中，哪一行是重新抛出异常的正确方法？
	try {
	throw std::runtime_error("error");
	} catch (std::runtime_error& e) {
	// 哪行是重新抛出异常？
	}

	A.throw e;

	B.throw std::runtime_error(e);

	C.throw;

	D.rethrow;

	------

	Standard Answer: C

- 下列关于自定义异常的描述哪个是正确的？

	A.自定义异常必须继承自 `std::exception`

	B.自定义异常必须包含一个 `what()` 方法

	C.自定义异常不能包含成员变量

	D.自定义异常类可以不继承任何标准异常类

	------

	Standard Answer: D

- 在对象的构造函数中抛出异常时，以下哪项描述是正确的？

	A.对象构造完成后抛出异常

	B.对象不会被创建，析构函数不会被调用

	C.对象会被部分创建，析构函数会被调用以清理已分配的资源

	D.构造函数不能抛出异常

	------

	Standard Answer: B

# 文件读写

- 流

	- **流**是一种对**连接**的抽象
	- **流入的量**等于**流出的量**

- 缓存区

	- **缓冲区**的作用？
	- 从命令行向程序输入数据时，实际上是输入到缓冲区里
	- 一旦按Enter回车键，缓冲区里的数据才流入程序
	- 在按回车键之前，我们可以修改缓冲区（即当前行）的数据
	- 但一旦按回车键后，我们就不能修改当前行数据了
	- 程序输出时，同样是输出到缓冲区里

- C++的文件读写方法

	- **ofstream**: 写操作（输出）的文件类 (由**ostream**继承而来)

	- **ifstream**: 读操作（输入）的文件类(由**istream**继承而来)

	- **fstream**: 可同时读写操作的文件类 (由**iostream**继承而来)

	- 用法和cin、cout完全一样！

	- ```C++
		/*样例*/
		#include <fstream>
		#include <iostream>
		
		using namespace std;
		
		// 实现功能：将source.txt中的内容去掉空格后写入result.txt
		
		int main() {
		    ifstream infile("source.txt");
		    // jkadshf ah fa dfhas dfahsdf ashdf a sdf ads
		    ofstream outfile("result.txt");
		    while (!infile.eof()) {  // eof()函数用于判断是否到达文件末尾
		        char tmp;
		        infile >> tmp;  // 从文件中读取一个字符
		        if (tmp != ' ') {
		            outfile << tmp;  // 将读取的字符写入文件
		        }
		    }
		    infile.close();
		    outfile.close();
		    // jkadshfahfadfhasdfahsdfashdfasdfsdfads
		    return 0;
		}
		```

	- **ios::out**  文件以输出(写)方式打开

	- **ios::in**   文件以输入(读)方式打开

	- **ios::ate**  初始位置：文件尾

	- **ios::app**  所有输出附加在文件末尾

	- **ios::trunc**  如果文件已存在则先删除该文件

	- **ios::binary**  二进制方式

	- 可以用 | 来放入多个参数

