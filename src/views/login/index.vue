<template>
  <div class="session-wrapper overlay">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7 col-sm-10 col-xs-12">
          <div class="logo-wrap text-center mb-50">
            <img src="/static/img/logo.png" alt="site-logo" width="300" height="92">
          </div>
          <div class="session-block d-block">
            <div class="text-center mb-30">
              <div class="mb-20">
                <img class="img-fluid rounded-circle" width="60" height="60" src="/static/img/user-1.jpg">
              </div>
              <h3 class="mb-20">
                {{ $t('message.login') }}
              </h3>
              <span class="fs-12 d-block w-75 mx-auto">
                {{ $t('message.enterUsernameAndPasswordToAccessControlPanelOfAdminify') }}
              </span>
            </div>
            <div class="form-wrapper">
              <b-form @submit.prevent="handleLogin">
                <b-form-group :label="$t('message.email')" label-for="email">
                  <b-form-input id="email" v-model="credentials.email" class="mb-3" :class="{'is-invalid': errors.email }" :placeholder="$t('message.enterYourEmail')" />
                  <template v-if="errors.email">
                    <b-form-invalid-feedback v-for="(error, i) in errors.email" :key="i">{{ errors.email[i] }}</b-form-invalid-feedback>
                  </template>
                </b-form-group>
                <b-form-group id="password" :label="$t('message.password')" label-for="password">
                  <b-form-input id="password" v-model="credentials.password" type="password" class="mb-3" :class="{'is-invalid': errors.password }" :placeholder="$t('message.enterYourPassword')" />
                  <template v-if="errors.password">
                    <b-form-invalid-feedback v-for="(error, i) in errors.password" :key="i">{{ errors.password[i] }}</b-form-invalid-feedback>
                  </template>
                </b-form-group>
                <div class="d-flex justify-content-between align-items-center mb-15">
                  <b-form-group id="exampleGroup4" class="mb-0">
                    <b-form-checkbox v-model="credentials.remember_me">
                      {{ $t('message.rememberMe') }}
                    </b-form-checkbox>
                  </b-form-group>
                  <a href="javascript:;" class="text-danger text-center fs-12 d-block">
                    {{ $t('message.forgotPassword') }}
                  </a>
                </div>
                <b-button type="submit" variant="primary" class="session-btn mb-15">
                  <b-spinner small type="grow" />
                  {{ $t('message.login') }}
                </b-button>
              </b-form>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center social-block">
          <div class="social-wrap">
            <h3 class="text-white mb-30">
              Or Login With
            </h3>
            <ul class="social-btn-wrap p-0 m-0 list-unstyled">
              <li class="list-item mb-20">
                <a target="_blank" @click="handleLoginWithGoogle">
                  <span class="social-icon google">
                    <i class="zmdi zmdi-google-plus" />
                  </span>
                  <span class="fs-12 text-white">Login using Google+</span>
                </a>
              </li>
              <li class="list-item mb-20">
                <b-button variant="danger">
                  Signin With Auth0
                </b-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        remember_me: false
      },
      errors: {}
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('auth/login', this.credentials)
        .then(async response => {
          this.$router.push({ path: 'dashboard' })
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: response.message
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    },
    handleLoginWithGoogle() {
      this.$gAuth.signIn().then(response => {
        console.log('google', response)
        this.$store.dispatch('auth/loginWithGoogle', response.uc.access_token)
          .then(async response => {
            await this.$router.push({ path: 'dashboard' })
            this.$notify({
              group: 'notify',
              type: 'success',
              duration: 5000,
              title: response.message
            })
          })
      })
    }
  }
}
</script>
