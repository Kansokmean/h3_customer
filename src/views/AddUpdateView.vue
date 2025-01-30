<template>
  <div class="container mt-4 pb-5">
    <div class="row">
      <div class="col-lg-5 m-auto p-4 bg-white rounded-2 shadow mb-2">
        <h5 class="fw-bold">{{ CustomerStore.selectedId ? t('form.update') : t('form.add') }}{{t('form.customer')}}</h5>
        <p>{{ t('form.decForm') }}</p>
        <hr>
        <div class="row">
          <div class="col-4">
            <div class="profile-box rounded-circle">
              <img :src="CustomerStore.crop.avatar" class="w-100 rounded-circle" alt="">
            </div>
          </div>
          <div class="col-8 pt-4 ">
            <h5 class="fw-semibold">{{t('form.cusPhoto')}}</h5>
            <p class="small">{{t('form.pleaseChoosefile')}}</p>
            <div>
              <a role="button" class="choose-file btn text-info me-3" @click="onChoseImg()"><i class="bi bi-upload"></i>
                {{ t('form.choose') }}</a>
              <input id="file-img" type="file" class="d-none" @change="onSelectedImg($event)">
              <button type="button" @click="clearPf()" class="btn text-danger"><i class="bi bi-trash"></i>
                {{ t('form.delete') }}</button>
            </div>
          </div>
          <div class="col-12">
            <form action="">
              <div class="row mt-3">
                <div class="col-6">
                  <label for="fname" class="mb-1">{{ t('form.fname') }}<span class="text-danger">*</span></label>
                  <input id="fname" type="text" class="form-control"
                    :class="{ 'is-invalid': CustomerStore.vv.fname.$error }" v-model="CustomerStore.frm.fname"
                    :placeholder="t('form.enterfname')">
                  <div class="invalid-feedback" v-if="CustomerStore.vv.fname.$error">
                    {{ CustomerStore.vv.fname.$errors[0].$message }}
                  </div>
                </div>

                <div class="col-6">
                  <label for="lname" class="mb-1">{{ t('form.lname') }}<span class="text-danger">*</span></label>
                  <input id="lname" type="text" class="form-control" v-model="CustomerStore.frm.lname"
                  :placeholder="t('form.enterlname')" :class="{ 'is-invalid': CustomerStore.vv.lname.$error }" />
                  <div v-if="CustomerStore.vv.lname.$error" class="invalid-feedback">
                    {{ CustomerStore.vv.lname.$errors[0]?.$message }}
                  </div>
                </div>

                <div class="col-6 mt-3">
                  <label for="gender" class="mb-1">{{ t('form.gender') }}<span class="text-danger">*</span></label>
                  <select v-model="CustomerStore.frm.gender" class="form-select" id="gender"
                    :class="{ 'is-invalid': CustomerStore.vv.gender.$error }">
                    <option disabled value="">{{ t('form.chooseGender') }}</option>
                    <option value="1">{{ t('home.male') }}</option>
                    <option value="2">{{ t('home.female') }}</option>
                  </select>
                  <div v-if="CustomerStore.vv.gender.$error" class="invalid-feedback">
                    {{ CustomerStore.vv.gender.$errors[0]?.$message }}
                  </div>
                </div>

                <div class="col-6 mt-3">
                  <label for="branch" class="mb-1">{{ t('form.gender') }}<span class="text-danger">*</span></label>
                  <select v-model="CustomerStore.frm.branch" class="form-select" id="branch"
                    :class="{ 'is-invalid': CustomerStore.vv.branch.$error }">
                    <option disabled value="">{{ t('form.chooseBranch') }}</option>
                    <option value="1">{{ t('home.kandal') }}</option>
                    <option value="2">{{ t('home.phnompenh') }}</option>
                    <option value="3">{{ t('home.preyveng') }}</option>
                  </select>
                  <div v-if="CustomerStore.vv.branch.$error" class="invalid-feedback">
                    {{ CustomerStore.vv.branch.$errors[0]?.$message }}
                  </div>
                </div>

                <div class="col-12 mt-3">
                  <label for="email" class="mb-1">{{ t('form.email') }}<span class="text-danger">*</span></label>
                  <input v-model="CustomerStore.frm.email" type="text" class="form-control" id="email"
                  :placeholder="t('form.enterEmail')" :class="{ 'is-invalid': CustomerStore.vv.email.$error }" />
                  <div v-if="CustomerStore.vv.email.$error" class="invalid-feedback">
                    {{ CustomerStore.vv.email.$errors[0].$message }}
                  </div>
                </div>

              </div>
              <div class="d-flex justify-content-between mt-4">
                <div>
                  <RouterLink to="/" class="btn btn-outline-primary"><i class="bi bi-arrow-left-circle"></i> {{ t('form.back') }}
                  </RouterLink>
                  <button type="button" class="btn btn-outline-danger ms-2"
                    :class="CustomerStore.selectedId ? 'd-none' : ''" @click="onClear()"><i class="bi bi-x-circle"></i>
                    {{ t('form.clear') }}</button>
                </div>
                <button class="btn btn-primary" type="button" @click="onSaveCus()"><i class="bi " :class="CustomerStore.selectedId ? 'bi-check-circle': 'bi-plus-circle' "></i>
                  {{ CustomerStore.selectedId ? t('form.update') : t('form.add') }}{{t('form.customer')}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalCrop />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { onMounted, computed } from 'vue';
import { required, email, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useCustomerStore } from '@/stores/customer_store';
import ModalCrop from '@/components/ModalCrop.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const CustomerStore = useCustomerStore();

const rules = computed(() => ({
  fname: {
    required: helpers.withMessage('Please enter first name.', required)
  },
  lname: {
    required: helpers.withMessage('Please enter last name.', required),
  },
  gender: {
    required: helpers.withMessage('Please enter gender.', required)
  }
  ,
  branch: {
    required: helpers.withMessage('Please enter branch.', required)
  }
  ,
  email: {
    required: helpers.withMessage('Please enter email.', required),
    email: helpers.withMessage('Invalid email.', email)
  }
}))
CustomerStore.vv = useVuelidate(rules, CustomerStore.frm);
const onChoseImg = () => {
  const fileInput = document.getElementById('file-img') as HTMLInputElement;
  fileInput.value = '';
  fileInput.click();
}
const onSelectedImg = (e) => {
  if (e.currentTarget.files.length == 0) {
    return;
  }
  const file = e.currentTarget.files[0];
  CustomerStore.crop.img = URL.createObjectURL(file);
  CustomerStore.mdl_crop.show();
  console.log(file);

}
const clearPf = () => {
  CustomerStore.crop.avatar = '/src/assets/no_photo.jpg';
  CustomerStore.crop.blob = 'null'
  if (CustomerStore.selectedId != 0) {
    axios.get(`/api/customers/deletephoto.php?id=${CustomerStore.selectedId}`)
      .then(res => {
        CustomerStore.onLoadCustomer()
      })
  }
}
const onSaveCus = () => {
  CustomerStore.vv.$validate();
  if (CustomerStore.vv.$error) {
    return;
  }
  let formData = new FormData();

  formData.append('fname', CustomerStore.frm.fname);
  formData.append('lname', CustomerStore.frm.lname);
  formData.append('gender', CustomerStore.frm.gender);
  formData.append('branch', CustomerStore.frm.branch);
  formData.append('email', CustomerStore.frm.email);
  if (CustomerStore.crop.blob) {
    formData.append('photo', CustomerStore.crop.blob);
  }

  if (CustomerStore.selectedId == 0) {
    axios.post('/api/customers/store.php', formData)
      .then(res => {
        console.log(res.data);
        
        if (!res.data.result) {
          Swal.fire({
            icon: 'warning',
            title: 'Something wrong!',
            text: res.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {

          CustomerStore.onLoadCustomer();
          CustomerStore.crop.blob = null;
          CustomerStore.frm.fname = '';
          CustomerStore.frm.lname = '';
          CustomerStore.frm.gender = '';
          CustomerStore.frm.branch = '';
          CustomerStore.frm.email = '';
          if (CustomerStore.vv) {
            CustomerStore.vv.$reset()
          }
          CustomerStore.crop.avatar = '/src/assets/no_photo.jpg';
          Swal.fire({
            title: res.data.message,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: `<i class="bi bi-arrow-left-circle"></i> Back to home`,
            cancelButtonText: "Stay here",
            customClass: {
              confirmButton: "custom-confirm-button",
              cancelButton: "custom-cancel-button",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/');
            }
          });
        }
      });
  } else {
    axios.post(`/api/customers/update.php?id=${CustomerStore.selectedId}`, formData)
      .then((res) => {
        console.log(res.data);
        if (!res.data.result) {
          Swal.fire({
            icon: 'warning',
            title: 'Something wrong!',
            text: res.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {
          CustomerStore.onLoadCustomer();
          CustomerStore.crop.blob = null;
          Swal.fire({
            title: "Updated successfully!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `<i class="bi bi-arrow-left-circle"></i> Back to home`,
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/');
            }
          });

        }
      });
  }
};


const onClear = () => {
  CustomerStore.frm.fname = '';
  CustomerStore.frm.lname = '';
  CustomerStore.frm.gender = '';
  CustomerStore.frm.branch = '';
  CustomerStore.frm.email = '';
  CustomerStore.crop.avatar = '/src/assets/no_photo.jpg';
  CustomerStore.crop.blob = 'null'
  if (CustomerStore.vv) {
    CustomerStore.vv.$reset()
  }
}

</script>