const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (parsedData.email) form.elements.email.value = parsedData.email;
    if (parsedData.message) form.elements.message.value = parsedData.message;
  } catch (e) {
    console.error('Invalid localStorage data', e);
  }
}

form.addEventListener('input', e => {
  if (e.target.name === 'email' || e.target.name === 'message') {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
