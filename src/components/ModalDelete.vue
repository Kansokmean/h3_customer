<template>
    <div class="modal show fade" id="mdl-del" data-bs-backdrop="static" tabindex="-1">
       <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content modal-del m-auto p-3 rounded-14 border-0">
               <div class="modal-body">
                   <div class="d-flex align-items-center flex-column">
                       <div class="box-del-icon mb-2">
                           <i class="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                       </div>
                       <h5>លុបផលិតផល</h5>
                   </div>
                   <div class="text-center m-auto subtext w-75 mt-3">
                       <span class="text-danger fw-bold">រំលឹក!</span>
                       <span> ផលិតផលនិងត្រូវលុបចេញជារៀងរហូត។ តើអ្នកពិតជាចង់លុបវាពិតឬទេ?</span>
                   </div>
               </div>
               <div class="modal-footer d-flex justify-content-center border-0">
                   <button type="button" class="btn btn-outline-danger btn-mdl text-cancel fs-14 px-4" data-bs-dismiss="modal">ទេ, រក្សាទុក</button>
                   <button type="button" class="btn btn-danger btn-mdl fs-14 px-4" @click="onclickDelete()">បាទ/ចាស, លុប</button>
               </div>
           </div>
       </div>
   </div>
</template>

<script setup>
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import axios from 'axios';
import { useCustomerStore } from '@/stores/customer_store';

const CustomerStore = useCustomerStore();

onMounted(() => {
    CustomerStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl-del'));
});

const onclickDelete = () => {
    axios.get(`/api/customers/destroy.php?id=${CustomerStore.selectedId}`)
        .then(res => {
            CustomerStore.onLoadCustomer()
            CustomerStore.mdl_delete.hide()
        })
};
</script>
