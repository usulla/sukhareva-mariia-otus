# Custom Elements Tree* Lit-Element

С помощью Custom Elements создать приложение для показа дерева с помощью компонентов my-tree и my-leaf. Компоненты должны получать данные о структуре поддерева от родительского элемента. Используйте Shadow DOM при отрисовке компонент. Можно также использовать для реализации Lit-Element, Lit-HTML или Polymer. 

Пример структуры

```json
{
  "id": 1,
  "items": [{
    "id": 2,
    "items": [{ "id": 3 }]
  }]
}
```

### Start a dev server

```
npm install -g polymer-cli
npm install
npm start  
```
