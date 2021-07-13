<template>
  <div class="editConfirmationDialog">
    <b-modal v-model="open" size="lg" hide-footer centered :title="isEditing ? $t('message.editCustomer') : $t('message.createNewCustomer')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <div class="container">
            <div class="row">
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <b-form-group :label="$t('message.parentCompany')">
                  <treeselect
                    v-model="data.parent_id"
                    :multiple="false"
                    :options="customers.data"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.customerName')">
                  <b-form-input v-model="data.name" :placeholder="$t('message.customerName')" />
                </b-form-group>
                <b-form-group :label="$t('message.customerKanaName')">
                  <b-form-input v-model="data.kana_name" :placeholder="$t('message.customerKanaName')" />
                </b-form-group>
                <b-form-group :label="$t('message.businessName')">
                  <b-form-input v-model="data.business_name" :placeholder="$t('message.businessName')" />
                </b-form-group>
                <b-form-group :label="$t('message.shortName')">
                  <b-form-input v-model="data.short_name" :placeholder="$t('message.shortName')" />
                </b-form-group>
                <b-form-group :label="$t('message.customerImage')">
                  <img v-if="data.image.base64URL" class="image-reader" :src="getImage">
                  <b-form-file size="sm" @change="onChooseImage" />
                </b-form-group>
                <b-form-group :label="$t('message.founding')">
                  <v-date-picker v-model="data.founding" :locale="$i18n.locale">
                    <template v-slot="{ inputValue, inputEvents }">
                      <b-form-input
                        :value="inputValue"
                        :placeholder="$t('message.founding')"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                </b-form-group>
                <b-form-group :label="$t('message.buildingName')">
                  <b-form-input v-model="data.building_name" :placeholder="$t('message.buildingName')" />
                </b-form-group>
              </div>
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <b-form-group :label="$t('message.street')">
                  <b-form-input v-model="data.street" :placeholder="$t('message.street')" />
                </b-form-group>
                <b-form-group :label="$t('message.district')">
                  <b-form-input v-model="data.district" :placeholder="$t('message.district')" />
                </b-form-group>
                <b-form-group :label="$t('message.province')">
                  <b-form-input v-model="data.province" :placeholder="$t('message.province')" />
                </b-form-group>
                <b-form-group :label="$t('message.postCode')">
                  <b-form-input v-model="data.post_code" :placeholder="$t('message.postCode')" />
                </b-form-group>
                <b-form-group :label="$t('message.phone')">
                  <b-form-input v-model="data.phone" :placeholder="$t('message.phone')" />
                </b-form-group>
                <b-form-group :label="$t('message.fax')">
                  <b-form-input v-model="data.fax" :placeholder="$t('message.fax')" />
                </b-form-group>
                <b-form-group :label="$t('message.email')">
                  <b-form-input v-model="data.email" :placeholder="$t('message.email')" />
                </b-form-group>
                <b-form-group :label="$t('message.website')">
                  <b-form-input v-model="data.website" :placeholder="$t('message.website')" />
                </b-form-group>
              </div>
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <b-form-group :label="$t('message.representative')">
                  <b-form-input v-model="data.representative" :placeholder="$t('message.representative')" />
                </b-form-group>
                <b-form-group :label="$t('message.charterCapital')">
                  <b-form-input v-model="data.charter_capital" :placeholder="$t('message.charterCapital')" />
                </b-form-group>
                <b-form-group :label="$t('message.numberOfEmployees')">
                  <b-form-input v-model="data.number_of_employees" :placeholder="$t('message.numberOfEmployees')" />
                </b-form-group>
                <b-form-group :label="$t('message.remark')">
                  <b-form-textarea
                    id="textarea"
                    v-model="data.remark"
                    rows="5"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.filed')">
                  <b-form-checkbox-group
                    id="checkbox-group"
                    v-model="data.field_ids"
                  >
                    <b-form-checkbox
                      v-for="field in fields"
                      :key="field.id"
                      name="checkbox-1"
                      :value="field.id"
                    >
                      {{ field.name }}
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </div>
            </div>
          </div>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      open: false,
      isEditing: false,
      data: {
        id: null,
        parent_id: null,
        name: '',
        kana_name: '',
        business_name: '',
        short_name: '',
        representative: '',
        building_name: '',
        street: '',
        district: '',
        province: '',
        post_code: '',
        phone: '',
        fax: '',
        email: '',
        website: '',
        charter_capital: '',
        founding: '',
        number_of_employees: '',
        revenue: '',
        remark: '',
        image: {
          objFile: null,
          base64URL: ''
        },
        field_ids: [],
        _method: ''
      },
      errors: {},
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customers/customersForSelectBox',
      fields: 'fields/fields',
      customer: 'customers/customer'
    }),
    getImage() {
      return this.data.image.base64URL
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    },
    onChooseImage(e) {
      if (e.target.files && e.target.files.length) {
        const fileImage = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            // convert image file to base64 string
            const previewImage = reader.result
            this.data.image.base64URL = previewImage
            this.data.image.objFile = fileImage
          },
          false
        )

        if (fileImage) {
          reader.readAsDataURL(fileImage)
        }
      } else {
        this.data.image.base64URL = ''
      }
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateCustomer()
      } else {
        this.handleUpdateCustomer()
      }
    },
    handleCreateCustomer() {
      const formData = new FormData()
      const founding = this.data.founding ? this.$dayjs(this.data.founding).format('YYYY-MM-DD') : ''

      Object.keys(this.data).forEach(element => {
        if (element !== 'image' && element !== 'founding' && this.data[element] !== null) {
          formData.append(element, this.data[element])
        }
      })

      formData.append('founding', founding)

      this.data.field_ids.forEach(field_id => {
        formData.append('field_ids[]', field_id)
      })

      if (this.data.image.objFile) {
        formData.append('image', this.data.image.objFile)
      }

      this.$store.dispatch('customers/createCustomer', formData)
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
    editingCustomer(customer) {
      this.isEditing = true
      this.data.id = customer.id
      Object.keys(this.data).forEach(key => {
        if (key !== 'image') {
          this.data[key] = this.customer[key]
        }
      })
      this.data.image.base64URL = this.customer.image
      this.data._method = 'PATCH'

      const field_ids = []
      this.customer.fields.forEach(field => {
        field_ids.push(field.id)
      })
      this.data.field_ids = field_ids
    },
    handleUpdateCustomer() {
      const formData = new FormData()
      const founding = this.data.founding ? this.$dayjs(this.data.founding).format('YYYY-MM-DD') : ''

      Object.keys(this.data).forEach(element => {
        if (element !== 'image' && element !== 'founding' && this.data[element] !== null) {
          console.log(element, this.data[element])
          formData.append(element, this.data[element])
        }
      })
      formData.append('founding', founding)

      this.data.field_ids.forEach(field_id => {
        formData.append('field_ids[]', field_id)
      })

      if (this.data.image.objFile) {
        formData.append('image', this.data.image.objFile)
      }
      this.$store.dispatch('customers/updateCustomer', { data: formData, id: this.data.id })
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
.image-reader {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  object-fit: cover;
  object-position: center;
  margin-bottom: 5px;
}
</style>
