/*************** 
CUSTOM SELECT
****************/
let selectElement = document.querySelectorAll('.custom-select');
let arr_selects = Array.from(selectElement);
arr_selects.forEach(function(item, i, arr) {
    const btn = item.querySelector('button');
    const options = item.querySelector('.cs-options');

    const toggleMenu = function() {
        // открываем/закрываем окно навигации, добаляя/удаляя активный класс
        options.classList.toggle('opened');
    }

    btn.addEventListener('click', () => { // при клике на кнопку
        toggleMenu();
    });
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        const current_sel = target == item || item.contains(target);
        const sel_is_opened = options.classList.contains('opened');
        if (!current_sel && sel_is_opened) {
            toggleMenu();
        }
    });

    let chboxChecked = "";
    let arrayChecked = []; //massive for checked variants

    if(item.classList.contains('single')) {
        let div_radio = item.querySelectorAll('.radio');
        let arr_div_radio = Array.from(div_radio);
        arr_div_radio.forEach(function(item, i, arr) {
            item.addEventListener('click', (event) => {
                toggleNextlevel(item.nextElementSibling);
            });
        });

        let inp_radio = item.querySelectorAll('input[type="radio"]');
        let arr_radio = Array.from(inp_radio);
        arr_radio.forEach(function(item, i, arr) {
            item.addEventListener('change', (event) => {
                singleChboxChange(item);
            });
            item.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    } else {
        let div_chbox = item.querySelectorAll('.checkbox');
        let arr_div_chbox = Array.from(div_chbox);
        arr_div_chbox.forEach(function(item, i, arr) {
            item.addEventListener('click', (event) => {
                toggleNextlevel(item.nextElementSibling);
            });
        });

        let inp_chbox = item.querySelectorAll('input[type="checkbox"]');
        let arr_chbox = Array.from(inp_chbox);
        arr_chbox.forEach(function(item, i, arr) {
            item.addEventListener('change', (event) => {
                chboxChange(item);
            });
            item.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    }

    /* custom select */
    function singleChboxChange(el){
        chboxChecked = el.value;
        el.closest('.custom-select').querySelector('button').innerHTML = chboxChecked;
    }
    function chboxChange(el){
        if(el.checked){
            arrayChecked.push(el.value);
        } else {
            arrayChecked.splice(arrayChecked.indexOf(el.value), 1);
        }
        
        if(arrayChecked.length == 1){
            el.closest('.custom-select').querySelector('button').innerHTML = arrayChecked;
        } else if(arrayChecked.length > 1){
            el.closest('.custom-select').querySelector('button').innerHTML = 'Выбрано: ' + arrayChecked.length;
        } else {
            el.closest('.custom-select').querySelector('button').innerHTML = 'Не выбрано';
        }
    }
});

/* show/hide sublevel elements */
function toggleNextlevel(elem){
    if(elem == null){
        return;
    } else if(elem.classList.contains('sublevel')){
        let arr = Array.from(elem.children);
        arr.forEach(function(item, i, arr) {
            toggle(item);
        });
    } else {return;}
}
/* show/hide element */
function toggle(el){
    el.style.display = (el.style.display == 'block') ? 'none' : 'block'
}



/************  
SEARCH / FILTER 
*************/
let searchEl = document.querySelectorAll('.search-in-list');
let arr_search = Array.from(searchEl);
arr_search.forEach(function(item, i, arr) {
    item.addEventListener('keyup', (event) => {
        listSearch(item);
    });
});
function listSearch(elem) {
    let phrase = elem.value.trim();
    let arr = elem.closest('.search-list').querySelectorAll('.search-item');
    let regPhrase = new RegExp(phrase, 'i');

    console.log('phrase = '+phrase);

    if(phrase.length == 0){
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('overlap');
            arr[i].classList.remove('diff');
        }
    } else {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            flag = regPhrase.test(arr[i].innerHTML);
            if (flag) {
                arr[i].classList.add('overlap');
            } else {
                arr[i].classList.add('diff');
            }
            // if (flag) break;
        }
    }
}


/**********
items list
***********/
let parent_elems = Array.from(document.querySelectorAll('.parent'));
parent_elems.forEach(function(item, i, arr) {
    const btn = item.querySelector('button.btn-show');
    btn.addEventListener('click', () => { // при клике на кнопку
        let nextElem = item.nextElementSibling;
        if(btn.dataset.state == "hidden" && nextElem.classList.contains('children')) {
            nextElem.style.display = "block";
            btn.dataset.state = "showed";
        } else if(btn.dataset.state == "showed" && nextElem.classList.contains('children')) {
            nextElem.style.display = "none";
            btn.dataset.state = "hidden";
        } else {return;}
    });
});


/***************************** 
highlighting editable element - выделение редактируемого элемента
******************************/
let nameItem = Array.from(document.querySelectorAll('.to-highlight'));
nameItem.forEach(function(item, i, arr) {
    item.addEventListener('click', () => {
        edit(item.closest('.item-tb')); //при клике на элемент с классом '.to-highlight' запускаем функцию
    }); 
});
/* функция добавляет класс 'editing' редактируемому элементу */
function edit(elem) {
    let editableElems = Array.from(document.querySelectorAll('.item-row .item-tb'));
    editableElems.forEach(function(item, i, arr) {
        item.classList.remove('editing'); //перебираем все элементы и удаляем класс, т.к можно редактировать только 1 элемент
    });
    elem.classList.add('editing'); //присваиваем класс редактируемому элементу
}


/* modal window for images */
function modalImgOpen(elem) {
    let modal = document.getElementById('modalImg');
    modal.style.display = 'block';
    let attr_src = elem.getAttribute('src');
    modal.querySelector('.img').innerHTML = '<img src="' + attr_src + '" alt="">';
}
function modalImgClose() {
    let modal = document.getElementById('modalImg');
    modal.querySelector('.img').innerHTML = "";
    modal.style.display = 'none';
}


/* adding new inputs */
function addInput(elem) {
    let cloneInput = elem.previousElementSibling.cloneNode(true);
    elem.after(cloneInput);
}


// ************************ Drag and drop file upload ***************** //
let dropAreas = Array.from(document.querySelectorAll('.drop-area'));
dropAreas.forEach(function(item, i, arr) {
    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        item.addEventListener(eventName, preventDefaults, false)   
        document.body.addEventListener(eventName, preventDefaults, false)
    })
    
    // Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
        item.addEventListener(eventName, highlight, false)
    })
    
    ;['dragleave', 'drop'].forEach(eventName => {
        item.addEventListener(eventName, unhighlight, false)
    })
    
    // Handle dropped files
    item.addEventListener('drop', handleDrop, false)
    
    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
    function highlight(e) {
        item.classList.add('highlight')
    }
    
    function unhighlight(e) {
        item.classList.remove('highlight')
    }
    
    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        let inp = item.querySelector('input[type="file"]');
        console.log(files);
        inp.files = files;
    
    }
});


/* password button state change */
let passBtn = Array.from(document.querySelectorAll('.pass_btn'));
passBtn.forEach(function(item, i, arr) {
    item.addEventListener('click', () => {
        let state = item.getAttribute('data-state');
        if(state == 'invisible'){
            item.previousElementSibling.type = 'text';
            item.dataset.state = 'visible';
        } else {
            item.previousElementSibling.type = 'password';
            item.dataset.state = 'invisible';
        }
    }); 
});
// $(function () {
//     $(".pass_btn").click(function(){
//       let state = $(this).attr('data-state');
//       if(state == 'invisible'){
//         $(this).prev("input").attr('type', 'text');
//         $(this).attr('data-state', 'visible');
//       } else {
//         $(this).prev("input").attr('type', 'password');
//         $(this).attr('data-state', 'invisible');
//       }
//     });
//   });