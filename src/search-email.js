const SearchEmailComponent = (() => {
    const searchEmailElem = document.querySelector('#search');
    const btnSearchEmailElem = document.querySelector('.btn-search');

    const showEnabledMailsCheckbox = document.querySelector('#show-enabled-mails');

    const searchFilter = (mails) => {
        mails = mails.filter(mail => mail.value.indexOf(searchEmailElem.value) > -1);
        return mails;
    };

    const showEnabledMailsFilter = (mails) => {
        mails = mails.filter(mail => mail.enabled);
        return mails;
    };

    const applyFilters = () => {
        let mails = App.state.emails;
        if (App.state.searchFilter) {
            mails = searchFilter(mails);
        }
        if (App.state.enabledFilter) {
            mails = showEnabledMailsFilter(mails);
        }
        App.renderEmailList(mails);
    };

    const searchEmail = (mails) => {
        const txtSearch = searchEmailElem.value;
        if (txtSearch.length > 0) {
            App.state.searchFilter = true;
        } else {
            App.state.searchFilter = false;
        }
        applyFilters();
    };

    const showEnabledMails = (event) => {
        if (showEnabledMailsCheckbox.checked) {
            App.state.enabledFilter = true;
        } else {
            App.state.enabledFilter = false;
        }
        applyFilters();
    };

    const handleCheckboxEvent = (event) => {
        const index = JSON.parse(event.target.closest('.email-row').dataset['index']);
        const email = App.state.emails.find((mail, emailIndex) => emailIndex === index);

        email.enabled = event.target.checked;
    };

    const handleEmailDeleteEvent = (event) => {
        const index = JSON.parse(event.target.closest('.email-row').dataset['index']);
        App.state.emails = App.state.emails.filter((mail, emailIndex) => emailIndex !== index);

        App.renderEmailList(App.state.emails);
    };

    const handleEmailListEvents = (event) => {
        if (event.target.matches('.enabled-checkbox')) {
            handleCheckboxEvent(event);
        } else if (event.target.matches('.btn-delete-email')) {
            handleEmailDeleteEvent(event);
        }
    };

    btnSearchEmailElem.addEventListener('click', searchEmail);
    showEnabledMailsCheckbox.addEventListener('change', showEnabledMails);
    App.emailList.addEventListener('click', handleEmailListEvents);
})();