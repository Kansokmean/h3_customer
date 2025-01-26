
<template>
  <main>
    <div class="container py-4">
      <section class="donut mt-2">
        <div class="row">
          <div class="col-6">
            <div class="chart1 bg-white p-4 rounded-4">
              <div>
                <h5 class="fw-bold">Customer By Branch</h5>
                <p>Display number customer by branch.</p>
              </div>
              <DoughnutChart :chart-data="{
                labels: ['Male', 'Female'],
                datasets: state.Donut
              }" :options="{
                cutout: '50%',
                plugins: {
                  legend: {
                    display: true
                  }
                },
                tooltip: {
                  padding: '50'
                }
              }" :height="250" :width="250" />
            </div>
          </div>
          <div class="col-6">
            <div class="chart2 bg-white p-4 rounded-4">
              <h5 class="fw-bold">Total Customer</h5>
              <p>Display numbers of customer.</p>
              <DoughnutChart :chart-data="{
                labels: ['Male', 'Female'],
                datasets: state.Round
              }" :options="{
                cutout: '0%',
                plugins: {
                  legend: {
                    display: true,
                    pointStyle: 'circle'
                  }
                },
                tooltip: {
                  padding: '50'
                }
              }" :height="250" :width="250" />
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white mt-4 rounded-4 p-4">
        <div class="header-table d-flex justify-content-between">
          <div>
            <h5 class="fw-bold">Customer List</h5>
            <p>Display all customer's information.</p>
          </div>
          <div>
            <RouterLink to="/add"  class="btn btn-primary">Add Customer</RouterLink>
          </div>
        </div>
        <div>
          <table class="w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Gneder</th>
                <th>Branch</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="CustomerStore.customers.length">
              <tr v-for="customer in CustomerStore.customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.fname }} {{ customer.lname }}</td>
                <td>{{ customer.gender }}</td>
                <td>{{ customer.branch }}</td>
                <td>{{ customer.email }}</td>
                <td class="d-flex">
                                <div class="d-flex align-items-center justify-content-end gap-3">
                                    <RouterLink to="/add">
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
                <td colspan="3" class="text-center">No customers found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
  <ModalDelete/>
</template>

<script setup>

import {useCustomerStore} from '@/stores/customer_store.js';
const CustomerStore = useCustomerStore();


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { DoughnutChart } from 'vue-chart-3';
Chart.defaults.font.family = '"Bayon", serif';

import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import ModalDelete from '@/components/ModalDelete.vue';
const state = reactive({
  Donut:
    [
      {
        data: [17, 5],
        backgroundColor: [
          'Red',
          'Blue'
        ]
      }
    ],
    Round: 
    [
      {
        data: [17, 5],
        backgroundColor: [
          'gray',
          'Lightblue',
        ]
      }
    ]
  
})

const onclickDeleteCus = (id) =>{
  CustomerStore.selectedId = id;
  CustomerStore.mdl_delete.show();
}

</script>
