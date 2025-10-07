// Simple toast notifications
export const toast = {
  success: (title, options = {}) => {
    console.log(`✅ ${title}`, options.description || '');
    showToast(title, 'success');
  },
  error: (title, options = {}) => {
    console.log(`❌ ${title}`, options.description || '');
    showToast(title, 'error');
  }
};

function showToast(message, type) {
  const toastEl = document.createElement('div');
  toastEl.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
    type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
  }`;
  toastEl.textContent = message;
  
  document.body.appendChild(toastEl);
  
  setTimeout(() => {
    toastEl.remove();
  }, 3000);
}
