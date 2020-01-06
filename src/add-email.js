const AddEmailComponent = (() => {
    const txtEmailElem = document.querySelector('.txt-email');
    const btnAddEmailElem = document.querySelector('.btn-add-email');

    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const validateUniqueMail = (email) => {
        const duplicateMail = App.state.emails.find(mail => mail.value === email);
        return !duplicateMail;
    };

    const addEmail = () => {
        const txtEmail = txtEmailElem.value;

        if (!emailPattern.test(txtEmail)) {
            alert('Please enter a proper mail ID');
            txtEmailElem.value = '';
            return;
        }

        if (!validateUniqueMail(txtEmailElem.value)) {
            alert('Please enter a unique mail ID');
            txtEmailElem.value = '';
            return;
        }

        App.state.emails.push({
            value: txtEmail,
            enabled: true
        });
        txtEmailElem.value = '';

        App.renderEmailList(App.state.emails);
    };

    btnAddEmailElem.addEventListener('click', addEmail);
})();