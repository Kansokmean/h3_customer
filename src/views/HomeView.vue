<template>
  <main>
    <div class="container py-4">
      <section class="donut mt-2">
        <div class="row">
          <div class="col-lg-6">
            <div class="chart1 bg-white p-4 rounded-4">
              <div>
                <h5 class="fw-bold"><i class="bi bi-box"></i> {{ t('home.cusbybranch') }}</h5>
                <p>{{ t('home.displayNumberCusByBranch') }}</p>
              </div>
              <hr class="bdt bg-black">
              <div class="w-100 px-5 py-3">
                <DoughnutChart :chart-data="{
                  labels: [
                    `${t('home.branch')} ${t('home.kandal')} ${state.Donut[0].data[0]} ${t('home.people')}`,
                    `${t('home.branch')} ${t('home.phnompenh')} ${state.Donut[0].data[1]} ${t('home.people')}`,
                    `${t('home.branch')} ${t('home.preyveng')} ${state.Donut[0].data[2]} ${t('home.people')}`
                  ],
                  datasets: state.Donut
                }" :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '65%',
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                          family: 'Kantumruy',
                          weight: '100'
                        },
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.label; 
                        }
                      }
                    }
                  }
                }" :height="250" :width="250" />

              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <div class="chart2 bg-white p-4 rounded-4 position-relative">
              <h5 class="fw-bold"><i class="bi bi-gender-ambiguous"></i> {{ t('home.totalcus') }}</h5>
              <p>{{ t('home.displayNumbersOfCus') }}</p>
              <hr class="bdt bg-black">
              <div class="w-100 px-6 py-3">

                <PieChart :chart-data="{
                  labels: [
                    `${t('home.male')} ${state.Round[0].data[0]} ${t('home.people')}`,
                    `${t('home.female')} ${state.Round[0].data[1]} ${t('home.people')}`,
                  ],
                  datasets: state.Round
                }" :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                          family: 'Kantumruy',
                          weight: '100'
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.label;
                        }
                      }
                    }
                  }
                }" :height="250" :width="250" />
                  <div class="position-absolute totalcus" :class="t('home.total')== `Total`? 'me-4':''">
                    <hr width="150px" class="bdt bg-black">
                    <p class="total-label small" >{{t('home.total')}} {{ CustomerStore.totalCus }} {{t('home.people')}}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section class="bg-white mt-4 rounded-4 p-4">
        <div class="header-table d-flex justify-content-between">
          <div>
            <h5 class="fw-bold">{{ t('home.cusList') }} <i class="bi bi-person-lines-fill"></i></h5>
            <p>{{ t('home.displayAllCus') }}</p>
          </div>
          <div>
            <RouterLink to="/add" @click="onAddCus()" class="btn btn-primary"><i class="bi bi-plus-circle"></i> {{ t('home.addCus') }}</RouterLink>
          </div>
        </div>
        <div>
          <table class="w-100 table bdt mt-2">
            <thead >
              <tr>
                <th class="py-3" scope="col">{{ t('home.id') }}</th>
                <th class="py-3" scope="col">{{ t('home.customer') }}</th>
                <th class="py-3" scope="col">{{ t('home.gender') }}</th>
                <th class="py-3" scope="col">{{ t('home.branch') }}</th>
                <th class="py-3" scope="col">{{ t('home.email') }}</th>
                <th class="py-3" scope="col">{{ t('home.action') }}</th>
              </tr>
            </thead>
            <tbody v-if="CustomerStore.customers.length">
              <tr v-for="customer in CustomerStore.customers" :key="customer.id">
                <td class="pt-3">{{ customer.id < 10 ? '00' : customer.id < 100 ? '0' : '' }}{{ customer.id }}</td>
                <td class="pt-2">
                  <div class="d-flex align-items-center">
                    <div class="w-10 me-2">
                      <img
                        :src="customer.photo ? `http://apicustomer.com:88/${customer.photo}` : '/src/assets/no_photo.jpg'"
                        style="object-fit: cover;" class="rounded-circle w-100" alt="">
                    </div>
                    <p class="m-0">{{ customer.fname }} {{ customer.lname }}</p>
                  </div>
                </td>
                <td class="pt-3">{{ customer.gender == 1 ? t('home.male') : t('home.female') }}</td>
                <td class="pt-3">{{ customer.branch == 1 ? t('home.kandal') : customer.branch == 2 ?
                  t('home.phnompenh') : t('home.preyveng') }}</td>
                <td class="pt-3">{{ customer.email }}</td>
                <td class="d-flex align-items-center">
                  <div class="d-flex align-items-center justify-content-end gap-3 pt-2">
                    <RouterLink to="/add" @click="onUpdate(customer)">
                      <i class="bi bi-pencil-square text-success fs-5"></i>
                    </RouterLink>
                    <a role="button" @click="onclickDeleteCus(customer)">
                      <i class="bi bi-trash text-danger fs-5"></i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">No customers found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
  <ModalDelete />
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy:wght@100;400&display=swap');
</style>
<script setup>

import { useCustomerStore } from '@/stores/customer_store.js';
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const CustomerStore = useCustomerStore();
const { t } = useI18n()

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { DoughnutChart, PieChart } from 'vue-chart-3';
Chart.defaults.font.family = '"Bayon", serif';

import { RouterLink } from 'vue-router';
import ModalDelete from '@/components/ModalDelete.vue';
onMounted(() => {
  CustomerStore.onLoadCustomer();
  CustomerStore.onLoadCountData();
});
const state = reactive({
  Donut:
    [
      {
        data: CustomerStore.countBranch,
        backgroundColor: [
          '##1F2937',
          '#84E1BC',
          '#76A9FA'
        ]
      }
    ],
  Round:
    [
      {
        data: CustomerStore.countGender,
        backgroundColor: [
          'gray',
          'Lightblue',
        ]
      }
    ]

})

const onUpdate = (CusObj) => {
  CustomerStore.selectedId = CusObj.id;
  CustomerStore.frm.fname = CusObj.fname;
  CustomerStore.frm.lname = CusObj.lname;
  CustomerStore.frm.gender = CusObj.gender;
  CustomerStore.frm.branch = CusObj.branch;
  CustomerStore.frm.email = CusObj.email;
  CustomerStore.crop.avatar = CusObj.photo ? `http://apicustomer.com:88/${CusObj.photo}` : '/src/assets/no_photo.jpg'
}
const onclickDeleteCus = (cus) => {
  CustomerStore.selectedId = cus.id;
  CustomerStore.frm.lname = cus.lname;
  CustomerStore.mdl_delete.show();
}
const onAddCus = () => {
  CustomerStore.selectedId = 0;
  CustomerStore.frm.fname = '';
  CustomerStore.frm.lname = '';
  CustomerStore.frm.gender = '';
  CustomerStore.frm.branch = '';
  CustomerStore.frm.email = '';
  CustomerStore.crop.avatar = '/src/assets/no_photo.jpg';
}


</script>
