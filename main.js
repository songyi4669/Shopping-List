const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

function onAdd() {
    //1.사용자가 입력한 텍스트를 받아옴.
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    //2. 새로운 아이템을 만듬(텍스트 + 삭제 버튼)
    const item = createItem(text);
    //3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);
    //4.새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({ block: 'center' });
    //5. 인풋을 초기화 한다.
    input.value = '';
    input.focus();

}

let id = 0; //글로벌 숫자보다는 UUID로 사용하는것이 좋음
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item_row');
    itemRow.setAttribute('data-id', id);
    itemRow.innerHTML = `
                <div class="item">
                    <span class="item_name">${text}</span>
                    <button class="item_delete">
                    <i class="fas fa-trash-alt" data-id=${id}></i>
                    </button>
                </div>
                <div class="item_divider"></div>`;
    id++;
    return itemRow;
}

//클릭을 하면 onAdd함수를 호출
addBtn.addEventListener('click', () => {
    onAdd();
});

//Enter 키를 사용해도 onAdd를 호출
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});
