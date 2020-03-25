let input = document.querySelector('.input');

let submit = document.querySelector('.submit_btn');

let form = document.querySelector('.form');

let ul = document.querySelector('.menu');

let orders = JSON.parse(localStorage.getItem('menus')) || [];



function handleInput(event) {
    
    event.preventDefault();
    
    if(input.value.trim()) {

        let orderObj = {
           item : input.value.trim(),
           isChecked : false 
        } 

       input.value = '';
       orders.push(orderObj);
       localStorage.setItem('menus',JSON.stringify(orders));
       createUI(orders);
    }

}


function handleCheck(event) {

    let id = event.target.parentNode.dataset.id;
    orders[id].isChecked = !orders[id].isChecked;
    localStorage.setItem('menus',JSON.stringify(orders));
    createUI(orders);

}


function createUI(arr = []) {
    ul.innerHTML = '';
    arr.forEach((el, index) => {

        let li = document.createElement('li');
        li.className = 'menu_item';
        li.setAttribute('data-id',index);

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = el.isChecked;
        checkBox.setAttribute('id',`check_box${index}`);

        let label = document.createElement('label');
        label.setAttribute('for', `check_box${index}`);


        let p = document.createElement('p');
        p.className = 'item_name';
        p.innerHTML = el.item;

        if(checkBox.checked) {
            label.innerHTML = `🐟`;
        } else {
            label.innerHTML = '🍽️';
        }

        
        li.append(checkBox,label,p);
        ul.append(li);

        label.addEventListener('click',handleCheck);

    })
}

form.addEventListener('submit',handleInput);