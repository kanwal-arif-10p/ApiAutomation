const { test, expect } = require('@playwright/test');
const [ apiClass ] = require('../Module/apiClass');

test.describe('PUT API Tests', () => {
  let bookingAPI;
  let bookingId;
  let token;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new apiClass(request);

// Step 1: Authenticate and get a token
    const username = 'admin'; // Replace with correct credentials
    const password = 'password123'; // Replace with correct credentials
    token = await bookingAPI.authenticate(username, password);

    console.log(token)

    // Step 2: Create a booking
    const payload = {
      firstname: 'Jane',
      lastname: 'Doe',
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-12-15',
        checkout: '2024-12-20',
      },
      additionalneeds: 'Breakfast',
    };
    const createResponse = await bookingAPI.createBooking(payload);
    const createData = await createResponse.json();

    console.log(createResponse)
    bookingId = createData.bookingid; // Capture the booking ID for update
  });

  test('Validate PUT /booking/:id updates a booking', async () => {
    // Step 3: Define the payload for updating the booking
    const updatePayload = {
      firstname: 'John',
      lastname: 'Smith',
      totalprice: 300,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-12-20',
        checkout: '2024-12-25',
      },
      additionalneeds: 'Dinner',
    };

    // Step 4: Send the PUT request to update the booking
    const response = await bookingAPI.updateBooking(bookingId, updatePayload, token);

    // Step 5: Validate the response
    expect(response.status()).toBe(200);

    
    const responseData = await response.json();

    //console.log(responseData)
    
    expect(responseData.firstname).toBe(updatePayload.firstname);
    expect(responseData.lastname).toBe(updatePayload.lastname);
    expect(responseData.totalprice).toBe(updatePayload.totalprice);
    expect(responseData.depositpaid).toBe(updatePayload.depositpaid);

    
    console.log('Booking Updated')
  });
});

