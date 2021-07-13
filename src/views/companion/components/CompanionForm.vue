<template>
  <div class="companion-form">
    <b-modal v-model="open" size="md" hide-footer centered :title="isEditing ? $t('message.editCompanion') : $t('message.createNewCompanion')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group :label="$t('message.fullName')">
            <b-form-input v-model="data.name" :placeholder="$t('message.fullName')" />
          </b-form-group>
          <b-form-group :label="$t('message.avatar')">
            <img v-if="data.avatar.base64URL" class="avatar-reader" :src="getAvatar">
            <b-form-file size="sm" @change="onChooseAvatar" />
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button class="mt-3 text-capitalize mx-2" size="sm" @click="closeDialog">
              {{ $t('message.cancel') }}
            </b-button>
            <b-btn
              type="submit"
              class="mt-3 text-capitalize mx-2 px-4"
              variant="danger"
              size="sm"
            >
              {{ $t('message.save') }}
            </b-btn>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      isEditing: false,
      data: {
        id: null,
        name: '',
        avatar: {
          objFile: null,
          base64URL: ''
        },
        _method: ''
      },
      errors: {}
    }
  },
  computed: {
    getAvatar() {
      return this.data.avatar.base64URL
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
      this.data.avatar = {
        objFile: null,
        base64URL: ''
      }
      this.data.name = ''
    },
    onChooseAvatar(e) {
      console.log('e', e.target.files)
      if (e.target.files && e.target.files.length) {
        const fileAvatar = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            // convert image file to base64 string
            const previewAvatar = reader.result
            this.data.avatar.base64URL = previewAvatar
            this.data.avatar.objFile = fileAvatar
          },
          false
        )

        if (fileAvatar) {
          reader.readAsDataURL(fileAvatar)
        }
      } else {
        this.data.avatar.base64URL = ''
      }
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateCompanion()
      } else {
        this.handleUpdateCompanion()
      }
    },
    handleCreateCompanion() {
      const formData = new FormData()
      formData.append('name', this.data.name)
      if (this.data.avatar.objFile) {
        formData.append('avatar', this.data.avatar.objFile)
      }
      this.$store.dispatch('companions/createCompanion', formData)
        .then(() => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.createdSuccessfully')
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    },
    editingCompanion(data) {
      this.isEditing = true
      this.data.id = data.id
      this.data.name = data.name
      this.data.avatar.base64URL = data.avatar
      this.data._method = 'PATCH'
    },
    handleUpdateCompanion() {
      const formData = new FormData()
      formData.append('name', this.data.name)
      formData.append('_method', this.data._method)
      if (this.data.avatar.objFile) {
        formData.append('avatar', this.data.avatar.objFile)
      }
      console.log('formData', formData)
      this.$store.dispatch('companions/updateCompanion', { data: formData, id: this.data.id })
        .then(() => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.updatedSuccessfully')
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    }
  }
}
</script>

<style scoped>
.avatar-reader {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
}
</style>
