<template>
    <div class="modal show fade" id="mdl-del" data-bs-backdrop="static" tabindex="-1">
       <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content modal-del m-auto p-3 rounded-14 border-0">
               <div class="modal-body">
                   <div class="d-flex align-items-center flex-column">
                       <div class="box-del-icon mb-2">
                           <i class="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                       </div>
                       <h5>{{ t('modal.delete.deleteCus') }}</h5>
                   </div>
                   <div class="text-center m-auto subtext w-75 mt-3">
                       <span class="text-danger fw-bold">{{ t('modal.delete.areyousure') }}</span> <span class="fw-bold">{{ CustomerStore.frm.lname }}?</span><br>
                       <span>&nbsp;{{ t('modal.delete.desc') }}</span>
                   </div>
               </div>
               <div class="modal-footer d-flex justify-content-center border-0">
                   <button type="button" class="btn btn-outline-danger btn-mdl text-cancel fs-14 px-4" data-bs-dismiss="modal">{{ t('modal.delete.cancel') }}</button>
                   <button type="button" class="btn btn-danger btn-mdl fs-14 px-4" @click="onclickDelete()">{{ t('modal.delete.confirm') }}</button>
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
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const CustomerStore = useCustomerStore();

onMounted(() => {
    CustomerStore.mdl_delete = Modal.getOrCreateInstance(document.getElementById('mdl-del'));
});

const onclickDelete = () => {
    axios.get(`/api/customers/destroy.php?id=${CustomerStore.selectedId}`)
        .then(res => {
            CustomerStore.onLoadCustomer()
            CustomerStore.onLoadCountData()
            CustomerStore.mdl_delete.hide()
        })
        CustomerStore.frm.lname = '';
};
</script>
