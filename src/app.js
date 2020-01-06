const App = (() => {
    const emailList = document.querySelector('.emails');

    const state = {
        emails: [],
        searchFilter: false,
        enabledFilter: false
    };

    const renderEmailList = (mails) => {
        emailList.innerHTML = mails.reduce((html, email, index) => {
            return html + emailListValueTemplate(email, index);
        }, '');
    };

    const emailListValueTemplate = (email, index) => `
    <section class="email-row" data-index="${index}">
        <section class="email-checkbox">
            <input type="checkbox" class="enabled-checkbox" ${email.enabled ? 'checked' : ''} />
        </section>
        <section class="email-value">
            ${email.value}
        </section>
        <section class="email-delete">
            <button class="btn-delete-email">
                Delete
            </button>
        </section>
    </section>
    `;

    return {
        emailList: emailList,
        state: state,
        renderEmailList: renderEmailList
    };
})();

