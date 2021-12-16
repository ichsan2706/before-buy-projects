<template>
<section>
    <form enctype="multipart/form-data" @submit.prevent="edit">
        <div class="row">
            <div class="col-md-3">
                <label>Username</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" v-model="username">
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label>Email</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" v-model="email">
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label>Avatar</label>
            </div>
            <div class="col-md-5">
                <!-- <label for="inputImage" class="form-label">Image File</label> -->
                <input type="file" class="form-control" id="inputImage" @change="fileImage">
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-5 mt-2 p-2">
                <button type="submit" class="btn btn-primary">Submit</button>
                <router-link to="/profile" class="btn btn-danger">Cancel</router-link>
            </div>
        </div>
    </form>
</section>
</template>

<script>
export default {
    name: 'EditProfile',
    data() {
        return {
            username: this.$store.state.profile.username,
            avatar: '',
            email: this.$store.state.profile.email
        }
    },
    methods: {
        fileImage(file) {
            this.avatar = file.target.files[0]
        },
        edit() {
            const username = this.username
            const avatar = this.avatar
            const email = this.email
            let newData = new FormData()
            newData.append('username', username)
            newData.append('avatar', avatar)
            newData.append('email', email)
            this.$store.dispatch('edit', newData)
        }
    },
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