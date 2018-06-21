<script>
  export default {
    mounted: function (vm = this) {
      vm.verifyNewEmail();
    },
    methods: {
      verifyNewEmail: function (vm = this) {
        return vm.$store.dispatch('request', {
          url: 'verifyNewEmail',
          query: {
            user_id: vm.$route.params.user_id,
            new_email: vm.$route.params.new_email,
            recovery_key: vm.$route.params.recovery_key
          }
        }).then(function (data) {
          toastr.success('Email verified');
          return vm.$store.dispatch('clearAll').then(function (data) {
            router.replace('/login');
          });
        }).catch(function (error) {
          toastr.error('Failed to verify email');
          router.replace('/');
        });
      }
    }
  }
</script>