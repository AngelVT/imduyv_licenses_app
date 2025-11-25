const userInfoPanel = document.createElement('span');
userInfoPanel.setAttribute("class", "bi-buildings-fill user-info");

userInfoPanel.innerHTML = `
<div class="border-round color-white" id="user_info_panel">
    <span id="user_name" class="bi-person-circle padding-horizontal-small"> Usuario</span>
</div>`;

document.body.appendChild(userInfoPanel);

const labelUser = document.getElementById('user_name');
const userInfoContainer = document.getElementById('user_info_panel');


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

        const urbanInvoiceForm = document.getElementById('invoice_form_urban');
        const landInvoiceForm = document.getElementById('invoice_form_land');

        if (mm) {
            if (user_group == 'all') {
                mm.classList.remove('dis-none');
            }
        }

        if (PAGE_GROUP !== 'System' && PAGE_GROUP !== 'Reset') {
            if (user_role == 'system') {
                const sysadmin = document.createElement('a');
                sysadmin.target = "_blank";
                sysadmin.id = "sys_link";
                sysadmin.href = "/app/sysadmin";
                sysadmin.innerHTML = `<span class="bi-cup-hot btn"> System administration</span>`;
                userInfoContainer.appendChild(sysadmin);
            }
        }

        if (PAGE_GROUP !== 'Administration' && PAGE_GROUP !== 'Reset') {
            if (user_role == 'admin' || user_role == 'system') {
                const administration = document.createElement('a');
                administration.target = "_blank";
                administration.id = "admin_link";
                administration.href = "/app/administration";
                administration.innerHTML = `<span class="bi-bank btn"> Administración</span>`;
                userInfoContainer.appendChild(administration);
            }
        }

        const logout = document.createElement('span');
        logout.id = "logout";
        logout.setAttribute("class", "bi-door-open btn");
        logout.innerText = " Cerrar sesión";
        userInfoContainer.appendChild(logout);

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