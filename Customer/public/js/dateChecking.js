function getCurrentDay() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today
}


const btnFind = document.querySelector('.btn-find')
const inputCheckIn = document.querySelector('#checkin')
const inputCheckOut = document.querySelector('#checkout')
btnFind.disabled = true
inputCheckIn.setAttribute('min', getCurrentDay())

inputCheckIn.addEventListener('change', e => {
    inputCheckOut.value = ''
    inputCheckOut.setAttribute('min', e.target.value)
})

inputCheckOut.addEventListener('change', e => {
    btnFind.disabled = inputCheckIn.value >  e.target.value 
})
