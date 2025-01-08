const labelUser = document.getElementById('user_name');

async function getUserData() {
    try {
        const res = await fetch(`/api/users/info`, { method: 'GET',});
        
        const response = await res.json();

        if (res.ok) {
            labelUser.innerHTML = ` ${response.name}`;
            const mm = document.getElementById('mm');
            const administration = document.getElementById('admin_link');
            const sysadmin = document.getElementById('sys_link');
            const urbanInvoiceForm = document.getElementById('invoice_form_urban');
            const landInvoiceForm = document.getElementById('invoice_form_land');

            if(mm){
                if (response.group == 'all') {
                    mm.classList.remove('dis-none');
                }
            }

            if (administration) {
                if (response.role == 'admin' || response.role == 'system') {
                    administration.classList.remove('dis-none');
                }
            }

            if (sysadmin) {
                if (response.role == 'system') {
                    sysadmin.classList.remove('dis-none');
                }
            }

            if (urbanInvoiceForm && landInvoiceForm) {
                if (response.group == 'urban') {
                    landInvoiceForm.classList.add('dis-none');
                    const URBAN_EXIST= await checkInvoices('/api/urban/check', urbanInvoiceForm);

                    if (URBAN_EXIST) {
                        invoicePanel.classList.add('dis-none');
                        invoiceBtn.classList.add('dis-none');
                        municipalBtn.click();
                    }
                }

                if (response.group == 'land_use') {
                    urbanInvoiceForm.classList.add('dis-none');
                    const LAND_EXIST= await checkInvoices('/api/landUse/check', landInvoiceForm);

                    if (LAND_EXIST) {
                        invoicePanel.classList.add('dis-none');
                        invoiceBtn.classList.add('dis-none');
                        municipalBtn.click();
                    }
                }

                if (response.group == 'all') {
                    const LAND_EXIST = await checkInvoices('/api/landUse/check', landInvoiceForm);
                    const URBAN_EXIST = await checkInvoices('/api/urban/check', urbanInvoiceForm);

                    if (LAND_EXIST && URBAN_EXIST) {
                        invoicePanel.classList.add('dis-none');
                        invoiceBtn.classList.add('dis-none');
                        municipalBtn.click();
                    }
                }
            }

            return;
        }
        
        labelUser.innerHTML = ' Generic User';
        console.log(response.msg);
    } catch (error) {
        console.log(error);
    }
}

getUserData();

async function checkInvoices(url, target) {
    try {
        const res = await fetch(url, { method: 'GET',});

        const response = await res.json();

        if(res.ok) {
            if (response.existing)
                target.classList.add('dis-none');
            return response.existing
        }

        return false
    } catch (error) {
        console.log(error);
    }
}