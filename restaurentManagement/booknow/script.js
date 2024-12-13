const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
document.getElementById('date').min = today.toISOString().split('T')[0];
document.getElementById('date').max = maxDate.toISOString().split('T')[0];

const bookingForm = document.getElementById('bookingForm');
const confirmationMessage = document.getElementById('confirmation-message');
// const deleteSection = document.getElementById('delete-section');
const deleteBookingBtn = document.getElementById('deleteBookingBtn');

let currentBookingId = null; 

bookingForm.addEventListener('submit', async function (event) {
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
            currentBookingId = responseData.booking._id;

            alert("Booking Confirmed");
            
            // Show the delete section
            deleteBookingBtn.classList.toggle('hidden')

            // Success message and form handling
            const successMessage = `Your table for ${people} people on ${date} at ${time} has been booked!`;
            confirmationMessage.textContent = successMessage;
            confirmationMessage.classList.add('success');
            
            // Disable form inputs
            document.getElementById('people').disabled = true;
            document.getElementById('date').disabled = true;
            document.getElementById('time').disabled = true;
            document.getElementById('table_type').disabled = true;
            document.getElementById('booking_category').disabled = true;
        } else {
            alert(responseData.message || "Failed to get booking");
        }
    } catch (e) {
        console.error("Error unable to book", e);
        confirmationMessage.textContent = "Unable to book. Please try again.";
        confirmationMessage.classList.add('error');
    }
});

deleteBookingBtn.addEventListener('click', async function() {
    if (!currentBookingId) {
        alert('No booking to delete');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/rest/${currentBookingId}`, {
            method: 'DELETE'
        });

        const responseData = await response.json();

        if (responseData.ok) {
            alert('Booking deleted successfully');
            
            // Reset the form
            bookingForm.reset();
            
            // Re-enable form inputs
            const inputs = [
                'people', 'date', 'time', 'table_type', 'booking_category'
            ];
            
            inputs.forEach(id => {
                const input = document.getElementById(id);
                input.disabled = false;
            });

            // Hide delete section and show booking form
            deleteSection.style.display = 'none';

            // Clear confirmation message
            confirmationMessage.textContent = '';
            confirmationMessage.classList.remove('error', 'success');

            // Reset booking ID
            currentBookingId = null;
        } else {
            alert(responseData.message || 'Failed to delete booking');
        }
    } catch (e) {
        console.error('Error deleting booking', e);
        alert('Unable to delete booking. Please try again.');
    }
});
