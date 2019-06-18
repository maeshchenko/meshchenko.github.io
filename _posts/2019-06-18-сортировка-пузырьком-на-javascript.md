```javascript
// bubble sorting
function bubbleSort(arr){
  let newArr = [...arr]; // Делаем копию входного массива

  function swap(arr, index1, index2){ // функция для смены значений двух элементов массива
    let tempElem = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tempElem;
  };

  for( let i = 0; i < newArr.length; i++ ){
    if (newArr[i] > newArr[i+1]){
      swap(newArr, i, i + 1);
      i = -1;
    }
  };

  return newArr;
};

let myArr = [3,5,1,2,6,8,2]; 
console.time("BubbleSort"); // Начинаем замер скорости
console.log(bubbleSort(myArr)); // [ 1, 2, 2, 3, 5, 6, 8 ]
console.timeEnd("BubbleSort"); // BubbleSort: 16.016ms
```
