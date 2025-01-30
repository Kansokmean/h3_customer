import { defineStore } from 'pinia'
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
        customers: [],
        countBranch: [],
        countGender: [],
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
        onLoadBranch() {
            axios.get('/api/customers/getchartdata.php')
                .then((res) => {
                    console.log(res.data.data.branch); // Expected: [1, 2, 1]
                    this.countBranch = [];
                    this.countBranch = Object.values(res.data.data.branch);
                    console.log(this.countBranch); 
                    this.countGender = Object.values(res.data.data.gender);
                    console.log(this.countGender); 

                })
        }
        
        
    }
})