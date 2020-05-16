---
layout: post
author: meshchenko
---
Решил начать изучать Jest, но при запуске самого простого теста возникла ошибка "ReferenceError: test is not defined":

`➜ intro-unit-testing jest
  FAIL  ./intro.test.js
   ● Test suite failed to run
 
     ReferenceError: test is not defined
 
        7 | // });
        8 | 
     >  9 | test('two plus two is four', () => {
          | ^
       10 |   expect(2 + 2).toBe(4);
       11 | });
       12 | 
 
       at Object.<anonymous> (01_intro/intro.test.js:9:1)
 
 Test Suites: 1 failed, 1 total
 Tests:       0 total
 Snapshots:   0 total
 Time:        0.86 s
 Ran all test suites.
 (node:22276) ExperimentalWarning: The fs.promises API is experimental
`

**Решением** стало обновление **node js** с версии v10.13.0 на lts  **v12.16.3** (я использую nvm для управления версиями ноды)
`nvm install --lts`

Результат:

`➜  intro-unit-testing jest
  PASS  ./index.test.js
   ✓ two plus two is four (2 ms)
 
 Test Suites: 1 passed, 1 total
 Tests:       1 passed, 1 total
 Snapshots:   0 total
 Time:        0.851 s
 Ran all test suites.
`
Всё заработало!
