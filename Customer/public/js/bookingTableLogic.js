function generateFormInput(roomId) {
    return `
            <div class="col-6 col-md-4 col-lg-3 mt-4" id=form-input-${roomId}>
                <label for="people-${roomId}" class="form-label">Number of people for room ${roomId}</label>
                <input type="number" min="1" max="10" class="form-control" id="people-${roomId}" name="people" value="1" required>
                <input type="hidden" name="roomID" value="${roomId}">
                <div class="invalid-feedback">
                    Number of people must be between 1 and 10.
                </div>
            </div>
    `
}



function checkValid(bookingForm) {
    const btnSubmit = document.querySelector('.book-room-btn')
    btnSubmit.disabled = bookingForm.querySelectorAll('input[type="number"]').length <= 0
        
}     
const bookingForm = document.querySelector('.booking-form')
const row = bookingForm.querySelector('.row')

Array.prototype.forEach.call(table.getElementsByTagName('td'), function(cell) {
    if (!cell.classList.contains('disabled')) {

        cell.addEventListener('click', function() {
            const id = cell.getAttribute('data-id')
            if (!cell.classList.contains('active')) {
                const formInput = bookingForm.querySelector('#form-input-' + id)
                formInput.remove()
            } else {
                row.innerHTML = row.innerHTML + generateFormInput(id)
            }
            checkValid(bookingForm)
        })
    } else {
        // disable the cell
        cell.style.backgroundColor = '#ddd'
    }
})


