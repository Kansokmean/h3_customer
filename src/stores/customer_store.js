import {defineStore} from 'pinia'
import axios from 'axios'

export const useCustomerStore = defineStore('customer_store', {
    state: () => ({
        frm: {
            fname: '',
            lname: '',
            gender: '',
            branch: '',
            email: '',
        },
        crop: {
            img: '',
            blob: null,
            avatar: '/src/assets/no_photo.jpg'
        },
        lang: '',
        vv: null,
        selectedId: 0,
        customers: [

        ],
        mdl_crop: null,
        mdl_delete: null,
        
    }),
    actions: {
        onLoadCustomer() {
            axios.get('/api/customers/index.php')
        .then((res) => {
            this.customers = res.data.data;
            console.log(res.data.data);
        });
        },
    }
})