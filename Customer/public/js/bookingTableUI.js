const table = document.querySelector('.booking-table')

    function colorChanger(cell){
        if(!cell.disabled) {
            cell.classList.toggle('active')
            if(cell.classList.contains('active')) {
                cell.style.backgroundColor = '#cb8670' 
                cell.style.color = '#FFF'  
            } else {
                cell.style.backgroundColor = "#FFF"
                cell.style.color = "#cb8670"
            }  
        }
    }


function setOnClickListener() {
    const table = document.querySelector('.booking-table')
    Array.prototype.forEach.call(table.getElementsByTagName('td'), function(cell) {
        if(!cell.classList.contains('disabled')) {
            cell.addEventListener('click', function() {
                colorChanger(this)
            })
        } else {
            // disable the cell
            cell.style.backgroundColor = '#ddd'
        }
    })
}

setOnClickListener()