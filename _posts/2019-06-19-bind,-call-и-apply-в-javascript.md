**Call** и **Apply** - это почти одинаковые по своему смыслу метода. Они имеют одну цель - передать в нужную функцию другой this.  
Разница лишь в том, что в Call мы передаем дополнительные аргументы через запятую, а в Apply - массивом.  
Рассмотрим пример:
```javascript
let John = {
  name: 'John',
  age: 26,
  specialization: 'js',
  greeting: function(style, timeOfDay){
    if(style === 'official'){
      console.log(`Good ${timeOfDay}! My name is ${this.name}, I'm ${this.age} years old and I like ${this.specialization}`);
    }else if(style === 'regular'){
      console.log(`Watsup! My name is ${this.name}, I'm ${this.age} years old and I like ${this.specialization}. Have a nice ${timeOfDay}! `);
    }
  }
}
```
Тут мы создали объект с методом внутри. Давайте создадим второй похожий объект, но не будем внутри создавать метод, а позаимствуем на один раз у John.

```javascript
let Mike = {
  name: 'Mike',
  age: 28,
  specialization: 'php'
};

John.call(Mike,'official','day'). // Good day! My name is Mike, I'm 28 years old and I like php
//или John.call(Mike, ['official','day']). // Это тут работать не будет, но суть должна быть видна
```
Вот и всё что касается call и apply.  
**bind** нужен для каррирования, или создания полуфабрикатов из функций. В него задается контекст и аргументы (не обязательно все), а он в ответ выдает функцию, которую можно вызывать, используя оставшиеся аргументы.  
```javascript
let mikeOfficial = John.bind(Mike,'official');
mikeOfficial('day'); // Good day! My name is Mike, I'm 28 years old and I like php
```
Получилось намного удобнее и нагляднее для конечного пользователя.
Вот и всё. Call, Apply и Bind - совсем не трудно!
