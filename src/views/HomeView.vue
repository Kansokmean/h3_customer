<template>
  <main>
    <div class="container py-4">
      <section class="donut mt-2">
        <div class="row">
          <div class="col-lg-6">
            <div class="chart1 bg-white p-4 rounded-4">
              <div>
                <h5 class="fw-bold">Customer By Branch</h5>
                <p>Display number customer by branch.</p>
              </div>
              <div class="w-100 px-5">
                <DoughnutChart :chart-data="{
                  labels: [
                    `Branch Kandal ${state.Donut[0].data[0]} people`,
                    `Branch Phnom Penh ${state.Donut[0].data[1]} people`,
                    `Branch Prey Veng ${state.Donut[0].data[2]} people`
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
                        pointStyle: 'circle'
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.label; // Display the label only
                        }
                      }
                    }
                  }
                }" :height="250" :width="250" />

              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <div class="chart2 bg-white p-4 rounded-4">
              <h5 class="fw-bold">Total Customer</h5>
              <p>Display numbers of customer.</p>
              <div class="w-100 px-6">

                <DoughnutChart :chart-data="{
                  labels: [
                    `${ t('home.hero.male')} ${state.Round[0].data[0]} people`,
                    `Female ${state.Round[0].data[1]} people`
                  ],
                  datasets: state.Round
                }" :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '0%',
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return context.label; // Display only the label
                        }
                      }
                    }
                  }
                }" :height="250" :width="250" />

              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white mt-4 rounded-4 p-4">
        <div class="header-table d-flex justify-content-between">
          <div>
            <h5 class="fw-bold">Customer List <i class="bi bi-person-lines-fill"></i></h5>
            <p>Display all customer's information.</p>
          </div>
          <div>
            <RouterLink to="/add" @click="onAddCus()" class="btn btn-primary"><i class="bi bi-plus-circle"></i> Add
              customer</RouterLink>
          </div>
        </div>
        <div>
          <table class="w-100 table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Gneder</th>
                <th scope="col">Branch</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-if="CustomerStore.customers.length">
              <tr v-for="customer in CustomerStore.customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="w-10 me-2">
                      <img src="/src/assets/no_photo.jpg" class="w-100" alt="">
                    </div>
                    <p class="m-0">{{ customer.fname }} {{ customer.lname }}</p>
                  </div>
                </td>
                <td>{{ customer.gender }}</td>
                <td>{{ customer.branch }}</td>
                <td>{{ customer.email }}</td>
                <td class="d-flex align-items-center">
                  <div class="d-flex align-items-center justify-content-end gap-3">
                    <RouterLink to="/add" @click="onUpdate(customer)">
                      <i class="bi bi-pencil-square text-success fs-5"></i>
                    </RouterLink>
                    <a role="button" @click="onclickDeleteCus(customer.id)">
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

<script setup>

import { useCustomerStore } from '@/stores/customer_store.js';
const CustomerStore = useCustomerStore();
import { onMounted, reactive } from 'vue';

onMounted(() => {
  CustomerStore.onLoadCustomer();
})
import { useI18n } from 'vue-i18n';

const {t} = useI18n()

const { locale } = useI18n();

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { DoughnutChart } from 'vue-chart-3';
Chart.defaults.font.family = '"Bayon", serif';

import { RouterLink } from 'vue-router';
import ModalDelete from '@/components/ModalDelete.vue';
const state = reactive({
  Donut:
    [
      {
        data: [10, 20, 30],
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
        data: [1, 3],
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
}
const onclickDeleteCus = (id) => {
  CustomerStore.selectedId = id;
  CustomerStore.mdl_delete.show();
}
const onAddCus = () => {
  CustomerStore.selectedId = 0;
  CustomerStore.frm.fname = '';
  CustomerStore.frm.lname = '';
  CustomerStore.frm.gender = '';
  CustomerStore.frm.branch = '';
  CustomerStore.frm.email = '';
}


</script>
