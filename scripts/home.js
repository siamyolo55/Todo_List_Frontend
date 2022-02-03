// dependnecies


// globals / vars

let uniq = 0
let priorityAsc = true
let dateAsc = true
let dueArrowDir = false
let priorityArrowDir = false

// open Add Todo List Modal
let modal = document.getElementById('view')
let btn = document.getElementById('addTodo')
let span = document.getElementsByClassName('close')[0]

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// update modal
let updateModal = document.getElementById('update')
let updateSpan = document.getElementsByClassName('close')[1]

updateSpan.onclick = function () {
    updateModal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == updateModal) {
        updateModal.style.display = "none";
    }
}

// delete modal
let deleteModal = document.getElementById('delete')
let deleteSpan = document.getElementsByClassName('close')[2]

deleteSpan.onclick = function () {
    deleteModal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == deleteModal) {
        deleteModal.style.display = "none";
    }
}




// fire button to add todo
let addTodoToDb = document.getElementById('add')

// fire button to update todo
let updateTodoToDb = document.getElementById('add2')

//fire button to delete todo
let deleteTodo = document.getElementById('deletePermanent')

// load data from local storage

let userData = JSON.parse(localStorage.getItem('user-info'))
let todos = userData.todos

// arrow direction sortwise

/* let dueArrow = document.getElementById('dueArrow')
dueArrow.addEventListener('click',(e) => {
    e.preventDefault()
    
})

let priorityArrow = document.getElementById('priorityArrow')

priorityArrow.addEventListener('click',(e) => {
    e.preventDefault()
    
})
 */



// fucntions

async function fillTable(flag = false) {
    // POST REQUEST FOR TABLE CONTENT

    if (!flag) {
        let rlt = await axios.post('http://127.0.0.1:4000', {
            email: userData.email,
            password: userData.password
        })
        console.log('filling')
        // RECEIVED ALL DATA
        todos = rlt.data.userData.todos
    }

    if (todos == undefined)
        return

    // <button class="delete" type="click" id="d${i}" onclick="deleteEvent('${todos[i].uniq}');">Delete</button>
    // <button class="edit" type="click" id="u${i}" onclick="updateEvent('${todos[i].uniq}');">Update</button>

    let table = document.getElementById('todo')
    table.innerHTML = ""

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].check == true) continue
        let due = todos[i].date + ' ' + todos[i].time
        let priority
        if (todos[i].priority == 1) priority = 'Low'
        else if (todos[i].priority == 2) priority = 'Mid'
        else priority = 'High'
        let row = `<tr>
                        <td id="box"><input type="checkbox" id="c${i}" onclick="checkClick('${todos[i].uniq}',${i})" ${todos[i].check === true ? 'checked' : ''}></td>
                        <td style="width: 100px">${i + 1}</td>
                        <td style="width: 170px;margin-left: 40px">${todos[i].event}</td>
                        <td style="width: 250px">${due}</td>
                        <td>${priority}</td>
                        <td style="width: 50px; display:flex;justify-content:space-between;">    
                            <i class="fas fa-edit" onclick="updateEvent('${todos[i].uniq}');"></i> 
                            <i class="far fa-trash-alt" onclick="deleteEvent('${todos[i].uniq}');" ></i>
                        </td>
                    </tr>`
        table.innerHTML += row
    }
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].check == false) continue
        let due = todos[i].date + ' ' + todos[i].time
        let priority
        if (todos[i].priority == 1) priority = 'Low'
        else if (todos[i].priority == 2) priority = 'Mid'
        else priority = 'High'
        let row = `<tr>
                        <td><input type="checkbox" id="c${i}" onclick="checkClick('${todos[i].uniq}',${i})" ${todos[i].check === true ? 'checked' : ''}></td>
                        <td>${i + 1}</td>
                        <td>${todos[i].event}</td>
                        <td>${due}</td>
                        <td>${priority}</td>
                        <td style="width: 50px; display:flex;justify-content:space-between;">    
                            <i class="fas fa-edit" onclick="updateEvent('${todos[i].uniq}');"></i> 
                            <i class="far fa-trash-alt" onclick="deleteEvent('${todos[i].uniq}');" ></i>
                        </td>
                    </tr>`
        table.innerHTML += row
    }

}

async function checkClick(uni, i) {
    uniq = uni
    let result = await axios.put('http://127.0.0.1:4000/home', {
        email: userData.email,
        uniq: uniq,
        check: document.getElementById(`c${i}`).checked
    })
    if (result.status == 200)
        todos = result.data.todos
    await fillTable()
}

async function addTodo() {
    let name = document.getElementById('name').value
    let des = document.getElementById('des').value
    let priority = document.getElementById('priority').value
    let time = document.getElementById('time').value
    let date = document.getElementById('date').value
    let check = document.getElementById('check').checked

    //console.log(name,des,priority,time,check)

    // TO BE UNCOMMENTED LATER

    let result = await axios.post('http://127.0.0.1:4000/home', {
        email: userData.email,
        event: name,
        description: des,
        priority: priority,
        time: time,
        date: date,
        check: check
    })

    if (result.status == 200)
        todos = result.data.todos
}

async function updateEventDb(uni) {
    console.log(uni)
    let name = document.getElementById('name2').value
    let des = document.getElementById('des2').value
    let time = document.getElementById('time2').value
    let date = document.getElementById('date2').value
    let priority = document.getElementById('priority2').value
    let check = document.getElementById('check2').checked

    // TO BE UNCOMMENTED LATER

    let result = await axios.put('http://127.0.0.1:4000/home', {
        email: userData.email,
        event: name,
        description: des,
        time: time,
        date: date,
        priority: priority,
        uniq: uni,
        check: check
    })

    if (result.status == 200) {
        todos = result.data.todos
    }

    document.getElementById('update').style.display = "none"

    //await fillTable()
    //location.reload()
}

async function deleteEventDb(uni) {
    console.log(userData.email)
    console.log(uni)
    /*     let rlt = await axios.delete('http://127.0.0.1:4000/home',{
            email : userData.email,
            uniq : uni
        }) */
    let rlt = await axios.delete(`http://127.0.0.1:4000/home?email=${userData.email}&uniq=${uni}`)
    if (rlt.status == 200) {
        console.log('weeeee')
        todos = rlt.data.todos
    }
}

async function sortTable(n) {
    if (n == 0) {
        let len = todos.length
        // trying bubble sort for start
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                let firstDate = new Date()
                let date = todos[j].date.split('-')
                //console.log(date)
                firstDate.setFullYear(Number(date[0]), Number(date[1]), Number(date[2]))
                let secondDate = new Date()
                let date2 = todos[j + 1].date.split('-')
                //console.log(date2)
                secondDate.setFullYear(Number(date2[0]), Number(date2[1]), Number(date2[2]))
                if (firstDate > secondDate) {
                    let temp = todos[j]
                    todos[j] = todos[j + 1]
                    todos[j + 1] = temp
                }
                else if (firstDate == secondDate) {
                    let firstTime = new Date()
                    let time = todos[j].time.split(':')
                    firstTime.setHours(Number(time[0]), Number(time[1]), 0)
                    let secondTime = new Date()
                    let time2 = todos[j + 1].time.split(':')
                    secondTime.setHours(Number(time2[0]), Number(time2[1]), 0)
                    if (firstTime > secondTime) {
                        let temp = todos[j]
                        todos[j] = todos[j + 1]
                        todos[j + 1] = temp
                    }
                }
            }
        }
        if (!dateAsc)
            todos.reverse()
        dateAsc = !dateAsc
        if(!dueArrowDir){
            dueArrow.innerHTML = `Due <i class="fas fa-arrow-up"></i>`
            dueArrowDir = true
        }
        else{
            dueArrow.innerHTML = `Due <i class="fas fa-arrow-down"></i>`
            dueArrowDir = false
        }
        let flag = true
        await fillTable(flag)
        return
    }
    else if (n == 1) {
        let len = todos.length
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (todos[j].priority > todos[j + 1].priority) {
                    let temp = todos[j]
                    todos[j] = todos[j + 1]
                    todos[j + 1] = temp
                }
            }
        }
        if (!priorityAsc)
            todos.reverse()
        priorityAsc = !priorityAsc
        if(!priorityArrowDir){
            priorityArrow.innerHTML = `Priority <i class="fas fa-arrow-up"></i>`
            priorityArrowDir  = true
        }
        else{
            priorityArrow.innerHTML = `Priority <i class="fas fa-arrow-down"></i>`
            priorityArrowDir  = false
        }
        let flag = true
        await fillTable(flag)
        return
    }
}



function searchBar() {
    let input = document.getElementById('search')
    let filter = input.value.toUpperCase()
    let tbody = document.getElementById('todo')
    let trs = tbody.getElementsByTagName('tr')
    for (let i = 0; i < trs.length; i++) {
        let event = trs[i].getElementsByTagName('td')[2]
        let value = event.textContent || event.innerText
        if (value.toUpperCase().indexOf(filter) > -1) {
            trs[i].style.display = ""
        }
        else trs[i].style.display = "none"
    }
}

function updateEvent(uni) {
    //console.log('runnig')
    uniq = uni
    //e.preventDefault()
    document.getElementById('update').style.display = "block"
    //add.style.display = "none"
}

function deleteEvent(uni) {
    //console.log('runnig')
    uniq = uni
    //e.preventDefault()
    document.getElementById('delete').style.display = "block"
    //add.style.display = "none"
}

function logout() {
    localStorage.clear()
}


fillTable()

// event listeners

addTodoToDb.addEventListener('click', async (e) => {
    e.preventDefault()
    await addTodo()
    await fillTable()
    document.getElementById('view').style.display = "none"
})

updateTodoToDb.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('reacdhed')
    await updateEventDb(uniq)
    await fillTable()
    console.log('not reac')
})

deleteTodo.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('deleting')
    await deleteEventDb(uniq)
    await fillTable()
    console.log('done')
    deleteModal.style.display = "none"
})