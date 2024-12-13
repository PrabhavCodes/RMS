const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

document.getElementById('date').min = today.toISOString().split('T')[0];
document.getElementById('date').max = maxDate.toISOString().split('T')[0];

const form = document.getElementById('bookingForm');
const bookingForm = document.getElementById('bookingForm');
const confirmationMessage = document.getElementById('confirmation-message');

bookingForm.addEventListener('submit', async function (event) {
    // Get all form elements
    event.preventDefault();
    const people = document.getElementById('people').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tableType = document.getElementById('table_type').value;
    const bookingCategory = document.getElementById('booking_category').value;

    // Reset previous messages
    confirmationMessage.textContent = '';
    confirmationMessage.classList.remove('error', 'success');

   

    try {
        const response = await fetch("http://localhost:3000/api/rest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                people: people,
                date: date,
                time: time,
                table_type: tableType,
                booking_category: bookingCategory
            })
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.ok) {
            alert("Booking Confirmed");
            form.reset();
            window.location.href = "../landing/landing.html";
        } else {
            alert(`${responseData.message}` || "failed to get booking");
        }
    } catch (e) {
        console.log("Error unable to book");
    }

    // If all validations pass
    const successMessage = `Your table for ${people.value} people on ${date.value} at ${time.value} has been booked!`;
    confirmationMessage.textContent = successMessage;
    confirmationMessage.classList.add('success');

    // Disable form inputs
    people.disabled = true;
    date.disabled = true;
    time.disabled = true;
    tableType.disabled = true;
    bookingCategory.disabled = true;

    // Change button to "Delete Booking"
    bookingForm.textContent = 'Delete Booking';
    bookingForm.classList.add('cancel');

    // Remove previous click event and add new one for deleting booking
    bookingForm.removeEventListener('click', arguments.callee);
    bookingForm.addEventListener('click', deleteBooking);
});

function deleteBooking() {
    // Reset form and re-enable inputs
    form.reset();

    const people = document.getElementById('people');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const tableType = document.getElementById('table_type');
    const bookingCategory = document.getElementById('booking_category');

    people.disabled = false;
    date.disabled = false;
    time.disabled = false;
    tableType.disabled = false;
    bookingCategory.disabled = false;

    confirmationMessage.textContent = '';
    confirmationMessage.classList.remove('error', 'success');

    bookingForm.textContent = 'Book Table';
    bookingForm.classList.remove('cancel');

    bookingForm.removeEventListener('click', deleteBooking);
    bookingForm.addEventListener('click', arguments.callee);
}