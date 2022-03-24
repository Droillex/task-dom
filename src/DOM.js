/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for(let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.insertAdjacentHTML('afterbegin', content);
        document.body.prepend(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function appendElement(element, currentLevel, childrenCount) {
        if (currentLevel > level) return undefined;
        for(let i = 0; i < childrenCount; i++) {
            const children = document.createElement('div');
            children.className = `item_${currentLevel}`;
            element.append(children);
            appendElement(children, currentLevel+1, childrenCount);
        }
    }
    const root = document.createElement('div');
    root.className = "item_1";
    appendElement(root, 2, childrenCount);
    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2,3);
    const items = [].slice.call(tree.getElementsByClassName('item_2'));
    items.forEach(elem => {
        const section = document.createElement('section');
        section.className = elem.className;
        section.insertAdjacentHTML('afterbegin', elem.innerHTML);
        elem.replaceWith(section);
    })
    return tree;
}
