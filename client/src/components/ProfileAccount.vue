<template>
<section>
    <div class="row">
        <div class="col-md-3">
            <label>User Id</label>
        </div>
        <div class="col-md-6">
            <p>{{profile.id}}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <label>Email</label>
        </div>
        <div class="col-md-6">
            <p>{{profile.email}}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <label>Name</label>
        </div>
        <div class="col-md-6">
            <p>{{profile.username}}</p>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'Account',
    computed: {
        profile() {
            return this.$store.state.profile
        }
    },
    created() {
        this.$store.dispatch('profile')
    }
}
</script>

<style>

</style>