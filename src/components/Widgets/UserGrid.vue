<template>
  <div class="clients-list-wrap">
    <div class="row">
      <div v-for="user in users" :key="user.id" class="mb-30 col-12 col-sm-6 col-md-4 col-lg-3">
        <app-card customClasses="mb-0 client-item">
          <div class="text-center position-relative">
            <div class="thumb-wrap mb-3 ">
              <img :src="user.avatar" class="rounded-lg" width="80" height="80">
            </div>
            <div class="mb-20 user-info">
              <h4 class="mb-0">{{ user.name }}</h4>
              <span class="text-muted font-xs">{{ user.job_title ? user.job_title : 'No job title' }}</span>
            </div>
            <div class="address-block px-20">
              <span class="font-sm d-block mb-10"><i class="fa fa-user" />{{ user.username }}</span>
              <span class="font-sm d-block mb-10"><i class="fa fa-birthday-cake" />{{ user.birthday ? user.birthday : 'No birthday' }}</span>
              <span class="font-sm d-block mb-10"><i class="zmdi zmdi-phone" />{{ user.phone ? user.phone : 'No phone' }}</span>
              <span class="font-sm d-block mb-10"><i class="zmdi zmdi-email" />{{ user.email }}</span>
            </div>
            <div class="py-10 d-flex justify-content-center">
              <router-link :to="{name: 'profile', params: {id: user.id}}" tag="button" size="sm" class="btn mx-2 font-xs btn-primary btn-sm" variant="primary">
                <i class="zmdi zmdi-eye mx-10" />{{ $t('message.profile') }}
              </router-link>
            </div>
            <div class="action-btn-wrap">
              <b-button class="border-0" @click="onEdit(user)"><i
                class="material-icons"
              >edit</i></b-button>
              <b-button class="border-0" @click="onDelete(user)"><i
                class="material-icons"
              >delete</i></b-button>
            </div>
          </div>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true }
  },
  methods: {
    onEdit(user) {
      this.$emit('onEdit', user)
    },
    onDelete(user) {
      this.$emit('onDelete', user)
    }
  }
}
</script>

<style lang="scss" scoped>
.address-block {
  span {
    i {
      margin-right: 1rem;
    }
  }
}
</style>
