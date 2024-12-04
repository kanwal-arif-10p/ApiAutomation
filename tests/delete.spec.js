const { test, expect } = require('@playwright/test');
const [ apiClass ] = require('../Module/apiClass');

test.describe('DELETE API Tests', () => {
  let bookingAPI;
  let bookingId;
  let token;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new apiClass(request);

    // Step 1: Authenticate and get a token
    const username = 'admin'; // Replace with actual credentials
    const password = 'password123'; // Replace with actual credentials
    token = await bookingAPI.authenticate(username, password);

    // Step 2: Create a booking to delete
    const payload = {
      firstname: 'Jane',
      lastname: 'Doe',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-12-10',
        checkout: '2024-12-15',
      },
      additionalneeds: 'Dinner',
    };
    const createResponse = await bookingAPI.createBooking(payload);
    const createData = await createResponse.json();
    
    console.log(createResponse)
    bookingId = createData.bookingid; // Capture the booking ID for deletion
  });

  test('Validate DELETE /booking/:id removes a booking', async () => {
    // Step 3: Send DELETE request to remove the booking
    const deleteResponse = await bookingAPI.deleteBooking(bookingId, token);

    // Step 4: Validate the DELETE response status
    expect(deleteResponse.status()).toBe(201); 
    // Step 5: Verify the booking no longer exists
    const getResponse = await bookingAPI.getBookings();
    const bookings = await getResponse.json();

    const isBookingDeleted = bookings.every((booking) => booking.bookingid !== bookingId);
    expect(isBookingDeleted).toBe(true);

    console.log('Booking Deleted')
  });
});
