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
        totalCus: 0,
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
        onLoadCountData() {
            axios.get('/api/customers/getchartdata.php')
                .then((res) => {
                    console.log(res.data.data); 
                    this.countBranch[0] = res.data.data.total_kd;
                    this.countBranch[1] = res.data.data.total_pp;
                    this.countBranch[2] = res.data.data.total_pv;
                    this.countGender[0] = res.data.data.total_male;
                    this.countGender[1] = res.data.data.total_female;
                    this.totalCus = res.data.data.total;

                })
        }
        
        
    }
})