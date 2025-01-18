const handleCompleteTask = async (telegramId: string) => {
  try {
    const response = await fetch('/api/update-points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegramId }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Error:', data.error);
      alert(data.error);
    } else {
      console.log('Success:', data.points);
      alert(`Points updated successfully! New points: ${data.points}`);
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('An error occurred.');
  }
};
