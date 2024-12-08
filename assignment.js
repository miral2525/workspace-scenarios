// Select elements
const userTableBody = document.getElementById('user-table-body');
const roleTableBody = document.getElementById('role-table-body');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('modal-form');
const modalSaveBtn = document.getElementById('modal-save-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');

let currentEditingRow = null; // Tracks the row being edited

// Function to open the modal
function openModal(title, formContent) {
    modalTitle.textContent = title;
    modalForm.innerHTML = formContent;
    modal.classList.remove('hidden');
    modal.classList.add('visible');
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
    currentEditingRow = null;
}

// Function to handle the Update button click
function handleUpdateClick(event) {
    const row = event.target.closest('tr');
    currentEditingRow = row;
    const name = row.cells[0].textContent;
    const email = row.cells[1]?.textContent || '';
    const role = row.cells[2].textContent;

    const formContent = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${name}" required />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${email}" required />
        <label for="role">Role:</label>
        <input type="text" id="role" name="role" value="${role}" required />
    `;

    openModal('Update User', formContent);
}

// Function to handle the Delete button click
function handleDeleteClick(event) {
    const row = event.target.closest('tr');
    const name = row.cells[0].textContent;

    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
        row.remove();
        alert(`${name} has been deleted.`);
    }
}

// Function to save changes from the modal
function saveModalChanges() {
    if (currentEditingRow) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        currentEditingRow.cells[0].textContent = name;
        currentEditingRow.cells[1].textContent = email;
        currentEditingRow.cells[2].textContent = role;

        alert('Changes saved successfully!');
    }
    closeModal();
}

// Add event listeners to buttons
function addEventListeners() {
    const updateButtons = document.querySelectorAll('.update-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    updateButtons.forEach(button => {
        button.addEventListener('click', handleUpdateClick);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeleteClick);
    });

    modalSaveBtn.addEventListener('click', saveModalChanges);
    modalCancelBtn.addEventListener('click', closeModal);
}

// Initialize event listeners
addEventListeners();
