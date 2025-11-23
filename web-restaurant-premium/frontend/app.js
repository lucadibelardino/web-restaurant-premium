// Initialize Supabase client
const supabaseUrl = 'https://qtihbjttkyvqzocjgxqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWhianR0a3l2cXpvY2pneHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTc3OTEsImV4cCI6MjA3OTI5Mzc5MX0.D4V8TICLLUwneIOyCM8yHacZZkKf_8Mamb6Q0eH1X94';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('reservationForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        user_email: document.getElementById('email').value,
        reservation_date: document.getElementById('date').value,
        reservation_time: document.getElementById('time').value,
        service_type: document.getElementById('service').value,
        notes: document.getElementById('notes').value,
        status: 'pending'
    };

    console.log('Submitting reservation:', formData);

    if (supabaseUrl === 'YOUR_SUPABASE_URL') {
        alert('Please configure Supabase credentials in app.js');
        return;
    }

    const { data, error } = await supabase
        .from('reservations')
        .insert([formData]);

    if (error) {
        console.error('Error:', error);
        alert('Error creating reservation: ' + error.message + '\nDetails: ' + JSON.stringify(error.details || error));
    } else {
        console.log('Success:', data);
        alert('Reservation created successfully!');
        form.reset();
    }
});
