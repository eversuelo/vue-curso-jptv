<script setup>

import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '../stores/auth';
import { loginSchema } from "../validation/loginSchema";
const { handleSubmit, isSubmitting } = useForm({ validationSchema: loginSchema });

const auth = useAuthStore();
const email = useField('email');
const password = useField('password');
const submit = handleSubmit((values) => {
    auth.login(values);
});
</script>
<template>
    <v-card flat max-width="600" class="mx-auto">
        <v-card-title class="text-center text-h4 font-weight-bold" tag="h3">
            Iniciar Session
        </v-card-title>
        <v-card-subtitle class="py-2 text-center text-h5 text-wrap">
            Inicia session para poder administrar tus propiedades
        </v-card-subtitle>


        <v-alert v-if="auth.hasError" color="error" icon="$error"  :title="auth.errorMSG"></v-alert>
        <v-form>
            <v-card-text>
                <v-text-field label="Email" type="email" v-model="email.value.value" bg-color="blue-grey-lighten-5"
                    :error-messages="email.errorMessage.value" class="mb-5"></v-text-field>
                <v-text-field label="Password" type="password" v-model="password.value.value" bg-color="blue-grey-lighten-5"
                    :error-messages="password.errorMessage.value" class="mb-5"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="submit">
                    Iniciar Session
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>