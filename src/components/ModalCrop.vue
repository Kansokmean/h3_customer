<template>
    <div class="modal fade" id="mdl-crop" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crop Image</h5>
                    <button class="btn btn-close p-1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="height: 400px;">
                    <Cropper :src="CustomerStore.crop.img" :stencil-props="{ aspectRatio: 1 }" @change="onChangeCrop" />
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal"><i class="bi bi-arrow-left-circle"></i> Cancel</button>
                    <div>
                        <a role="button" class="choose-file btn btn-outline-primary me-3" @click="onChoseImg()">
                            <i class="bi bi-upload"></i>
                            Choose</a>
                        <input id="file-img" type="file" class="d-none" @change="onSelectedImg($event)">
                        <button class="btn btn-primary" type="button" @click="onCropped"><i class="bi bi-check-circle"></i> Crop image</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useCustomerStore } from '@/stores/customer_store';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

const CustomerStore = useCustomerStore();

let tempCanvas;

onMounted(() => {
    CustomerStore.mdl_crop = Modal.getOrCreateInstance(document.getElementById('mdl-crop'));
});

const onChangeCrop = ({ coordinates, canvas }) => {
    console.log('Coordinates:', coordinates);
    tempCanvas = canvas;
};

const onCropped = () => {
    if (tempCanvas) {
        tempCanvas.toBlob(
            (bin) => {
                console.log(bin)
                CustomerStore.crop.blob = bin;
                console.log(URL.createObjectURL(bin))
                CustomerStore.crop.avatar = URL.createObjectURL(bin);
                CustomerStore.mdl_crop.hide();
            },
            'image/png'
        );
    }
};
const onChoseImg = () => {
  document.getElementById('file-img').value = '';
  document.getElementById('file-img').click();
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
</script>
