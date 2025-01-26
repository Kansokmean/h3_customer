import {defineStore} from 'pinia'
// import axios from 'axios'

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
            {id: 1, fname: 'kan', lname: 'sokmean', gender: 'Male', branch: 'battambang', email: 'kansokmean@gmail.com'},
            {id: 2, fname: 'kan', lname: 'sokmean', gender: 'female', branch: 'battambang', email: 'kansokmean@gmail.com'},
            {id: 3, fname: 'kan', lname: 'sokmean', gender: 'Male', branch: 'battambang', email: 'kansokmean@gmail.com'},
        ],
        mdl_crop: null,
        mdl_delete: null,
        
    }),
    actions: {
        // onLoadStudent() {
        //     axios.get('/api/students/index.php')
        //         .then((res) => {
        //             this.students = res.data.data
        //         })
        // }
    }
})