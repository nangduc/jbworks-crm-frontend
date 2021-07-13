<template>
  <div class="idb-full-block border-top pt-20">
    <div class="d-flex mb-3">
      <h4 class="mr-4 mb-0 text-uppercase">{{ $t('message.comment') }}</h4>
      <a href="javascript:;" class="font-xs text-muted"><i class="zmdi zmdi-comment font-sm text-success mr-1" />{{ comments.data ? comments.data.length : 0 }} Comments</a>
    </div>
    <div v-for="comment in comments.data" :key="comment.id" class="media p-20">
      <div class="img-wrap">
        <img :src="comment.user.avatar" width="40" height="40" alt="author" class="rounded-circle">
      </div>
      <div class="media-body ml-2 d-flex">
        <div class="mr-4">
          <h5 class="mb-0">{{ comment.user.name }}</h5>
          <span class="font-xs text-muted">{{ $dayjs(comment.created_at).locale($i18n.locale).format('lll') }}</span>
        </div>
        <p class="mb-0">{{ comment.message }}</p>
      </div>
      <div class="dropdown-container" tabindex="-1">
        <div class="three-dots" />
        <div class="dropdown">
          <a href="#" @click="editingComment(comment)"><div>{{ $t('message.edit') }}</div></a>
          <a href="#" @click="deleteComment(comment)"><div>{{ $t('message.delete') }}</div></a>
        </div>
      </div>
    </div>
    <!-- <b-form> -->
    <b-form-group id="comment">
      <b-form-input
        v-model="data.message"
        type="text"
        placeholder="Comment and press enter to post"
        class="mb-30"
        @keyup.enter="save"
      />
    </b-form-group>
    <!-- </b-form> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    report: { type: Object, default: () => {} }
  },
  data() {
    return {
      isEditing: false,
      data: {
        id: null,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      comments: 'comments/commentsOfReport',
      comment: 'comments/comment',
      userInfo: 'auth/userInfo'
    })
  },
  methods: {
    save() {
      if (!this.isEditing) {
        this.saveComment()
      } else {
        this.updateComment()
      }
    },
    saveComment() {
      const data = {
        ...this.data,
        report_id: +this.report.id,
        user_id: +this.userInfo.id
      }
      this.$store.dispatch('comments/saveComment', data)
        .then(() => {
          this.data.message = ''
        }).catch(error => {
          console.log(error)
        })
    },
    editingComment(comment) {
      this.isEditing = true
      this.data.id = comment.id
      this.data.message = comment.message
    },
    updateComment() {
      const data = {
        ...this.data,
        report_id: +this.report.id
      }
      this.$store.dispatch('comments/updateComment', data)
        .then(() => {
          this.data.id = null
          this.data.message = ''
        }).catch(error => {
          console.log(error)
        })
    },
    deleteComment(comment) {
      this.$store.dispatch('comments/deleteComment', { id: comment.id, reportId: this.report.id })
    }
  }
}
</script>

<style scoped lang='scss'>
.three-dots:after {
  cursor: pointer;
  color: #464d69;
  content: '\2807';
  font-size: 20px;
  padding: 0 5px;
}

.dropdown {
  position: absolute;
  right: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  outline: none;
  opacity: 0;
  z-index: 99;
  max-height: 0;
  transition: opacity 0.1s, z-index 0.1s, max-height 5s;

  a {
    text-decoration: none;
    color: #464d69;
    display: block;
  }

  a div {
    padding: 0.25rem 1.5rem;
  }
}

.dropdown-container:focus {
  outline: none;
}

.dropdown-container:focus .dropdown {
  opacity: 1;
  z-index: 100;
  max-height: 100vh;
  transition: opacity 0.2s, z-index 0.2s, max-height 0.2s;
}

</style>
