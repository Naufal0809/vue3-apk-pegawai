import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import SignupForm from '../components/SignupForm.vue';
import AgendaForm from '../components/AgendaForm.vue';
import InputAgendaForm from '../components/InputAgendaForm.vue';
import EditAgendaForm from '../components/EditAgendaForm.vue';
import DresscodeForm from '../components/DresscodeForm.vue';
import EditDresscodeForm from '../components/EditDresscodeForm.vue';
import TambahDresscodeForm from '../components/TambahDresscodeForm.vue';
import ListPenggunaForm from '../components/ListPenggunaForm.vue';
import TambahListPenggunaForm from '../components/TambahListPenggunaForm.vue';
import EditListPenggunaForm from '../components/EditListPenggunaForm.vue';
import DataPegawaiForm from '../components/DataPegawaiForm.vue';
import TambahDataPegawaiForm from '../components/TambahDataPegawaiForm.vue';
import EditDataPegawaiForm from '../components/EditDataPegawaiForm.vue';
import t from '../components/MultiSelect.vue';

const routes = [
  {
    path: '/multi-select',
    name: 'multi',
    component: t,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupForm,
  },
  {
    path: '/AgendaForm',
    name: 'AgendaForm',
    component: AgendaForm,
  },
  {
    path: '/InputAgendaForm',
    name: 'InputAgendaForm',
    component: InputAgendaForm,
  },
  {
    path: '/EditAgenda/:id',
    name: 'EditAgenda',
    component: EditAgendaForm,
  },
  {
    path: '/DresscodeForm',
    name: 'DresscodeForm',
    component: DresscodeForm,
  },
  {
    path: '/EditDresscode/:id',
    name: 'EditDresscodeForm',
    component: EditDresscodeForm,
  },
  {
    path: '/TambahDresscodeForm',
    name: 'TambahDresscodeForm',
    component: TambahDresscodeForm,
  },
  {
    path: '/ListPenggunaForm',
    name: 'ListPenggunaForm',
    component: ListPenggunaForm,
  },
  {
    path: '/TambahListPenggunaForm',
    name: 'TambahListPenggunaForm',
    component: TambahListPenggunaForm,
  },
  {
    path: '/EditListPenggunaForm/:id',
    name: 'EditListPenggunaForm',
    component: EditListPenggunaForm,
  },
  {
    path: '/DataPegawaiForm',
    name: 'DataPegawaiForm',
    component: DataPegawaiForm,
  },
  {
    path: '/TambahDataPegawaiForm',
    name: 'TambahDataPegawaiForm',
    component: TambahDataPegawaiForm,
  },
  {
    path: '/edit-data-pegawai-form/:id',
    name: 'EditDataPegawaiForm',
    component: EditDataPegawaiForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;