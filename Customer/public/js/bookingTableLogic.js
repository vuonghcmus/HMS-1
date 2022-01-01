function generateFormInput(roomId) {
    return `
        <div class="row mb-3" id=form-input-${roomId}>
            <div class="col-4 mt-3">
                <label for="people-${roomId}" class="form-label">Number of people</label>
                <input type="number" min="1" max="10" class="form-control" id="people-${roomId}" name="people" value="1" required>
                <input type="hidden" name="roomID" value="${roomId}">
                <div class="invalid-feedback">
                    Number of people must be between 1 and 10.
                </div>
            </div>
            <div class="col-4 mt-3">
                <label for="checkin-${roomId}" class="form-label">Check In</label>
                
                <input type="date" class="form-control" id="checkin-${roomId}" name="checkin" required>
                <div class="invalid-feedback">
                    Check in date must not be empty.
                </div>
            </div>
            <div class="col-4 mt-3">
                <label for="checkout-${roomId}" class="form-label">Check Out</label>
                <input type="date" class="form-control" id="checkout-${roomId}" name="checkout" required>
                <div class="invalid-feedback">
                    Check in date must not be empty.
                </div>
            </div>
            
        </div>
    `
}

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


function checkValid(bookingForm) {
    const btnSubmit = document.querySelector('.book-room-btn')
    console.log(btnSubmit)
    btnSubmit.disabled = bookingForm.getElementsByTagName('input').length <= 0
}

Array.prototype.forEach.call(table.getElementsByTagName('td'), function(cell) {

    if (!cell.classList.contains('disabled')) {
        const bookingForm = document.querySelector('.booking-form')

        cell.addEventListener('click', function() {
            const id = cell.getAttribute('data-id')
            if (!cell.classList.contains('active')) {
                const formInput = bookingForm.querySelector('#form-input-' + id)
                formInput.remove()
            } else {
                bookingForm.innerHTML = generateFormInput(id) + bookingForm.innerHTML
                const today = getCurrentDay()
                document.querySelectorAll('input[type="date"]').forEach(input => {
                    input.setAttribute("min", today);
                })
            }
            checkValid(bookingForm)
        })
    } else {
        // disable the cell
        cell.style.backgroundColor = '#ddd'
    }
})