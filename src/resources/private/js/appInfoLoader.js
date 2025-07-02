const labelUser = document.getElementById('user_name');

async function getUserData() {
    try {
        const cookieRaw = getCookie('session_info');

        if (typeof cookieRaw === 'undefined') {
            console.warn('Session info failure');
            labelUser.innerHTML = ' Generic User';
            return;
        }

        const cookie = JSON.parse(decodeURIComponent(cookieRaw));

        const { name, user, user_group, user_role } = cookie;

        labelUser.innerHTML = ` ${name} (${user})`;
        const mm = document.getElementById('mm');
        const administration = document.getElementById('admin_link');
        const sysadmin = document.getElementById('sys_link');
        const urbanInvoiceForm = document.getElementById('invoice_form_urban');
        const landInvoiceForm = document.getElementById('invoice_form_land');

        if (mm) {
            if (user_group == 'all') {
                mm.classList.remove('dis-none');
            }
        }

        if (administration) {
            if (user_role == 'admin' || user_role == 'system') {
                administration.classList.remove('dis-none');
            }
        }

        if (sysadmin) {
            if (user_role == 'system') {
                sysadmin.classList.remove('dis-none');
            }
        }

        if (urbanInvoiceForm && landInvoiceForm) {
            if (user_group == 'urban') {
                landInvoiceForm.classList.add('dis-none');
                const URBAN_EXIST = await checkInvoices('/api/urban/check', urbanInvoiceForm);

                if (URBAN_EXIST) {
                    invoicePanel.classList.add('dis-none');
                    invoiceBtn.classList.add('dis-none');
                    municipalBtn.click();
                }
            }

            if (user_group == 'land_use') {
                urbanInvoiceForm.classList.add('dis-none');
                const LAND_EXIST = await checkInvoices('/api/landUse/check', landInvoiceForm);

                if (LAND_EXIST) {
                    invoicePanel.classList.add('dis-none');
                    invoiceBtn.classList.add('dis-none');
                    municipalBtn.click();
                }
            }

            if (user_group == 'all') {
                const LAND_EXIST = await checkInvoices('/api/landUse/check', landInvoiceForm);
                const URBAN_EXIST = await checkInvoices('/api/urban/check', urbanInvoiceForm);

                if (LAND_EXIST && URBAN_EXIST) {
                    invoicePanel.classList.add('dis-none');
                    invoiceBtn.classList.add('dis-none');
                    municipalBtn.click();
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function checkInvoices(url, target) {
    try {
        const res = await fetch(url, { method: 'GET', });

        const response = await res.json();

        if (res.ok) {
            if (response.existing)
                target.classList.add('dis-none');
            return response.existing
        }

        return false
    } catch (error) {
        console.log(error);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

getUserData();